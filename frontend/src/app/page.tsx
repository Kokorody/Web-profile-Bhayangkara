'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X, Calendar, Clock, Users, Award, ChevronRight, Star } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { services } from '@/data/services';
import { news } from '@/data/news';
import { testimonials } from '@/data/testimonials';

const HospitalWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFasilitasOpen, setIsFasilitasOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Get current day and time for doctor availability
  const currentDay = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  
  // Get current time to check if doctor is currently available
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Check if doctor is currently available based on schedule
  const isCurrentlyAvailable = (doctor: any) => {
    const currentTime = getCurrentTime();
    const todaySchedule = doctor.detailedSchedule?.[currentDay];
    
    if (!todaySchedule) return false;
    
    const timeRanges = todaySchedule.split(', ');
    return timeRanges.some((range: string) => {
      const [start, end] = range.split(' - ');
      return currentTime >= start && currentTime <= end;
    });
  };
  const lastUpdate = useRef(0);
  const frameCount = useRef(0);
  const [particleStyles, setParticleStyles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
    id: string;
  }>>([]);

  // Memoized constants to prevent recalculation
  const heroImages = useMemo(() => [
    '/images/1.png',
    '/images/2.png',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg'
  ], []);

  const scrollThreshold = useMemo(() => 100, []);

  // Lazy loading for doctors - start with 6, load more progressively
  const [visibleDoctorCount, setVisibleDoctorCount] = useState(6);
  const [isLoadingMoreDoctors, setIsLoadingMoreDoctors] = useState(false);

  // Memoized filtered doctors with lazy loading
  const displayedDoctors = useMemo(() => {
    if (showAllDoctors) {
      return doctors.slice(0, visibleDoctorCount);
    }
    return doctors.slice(0, 6);
  }, [showAllDoctors, visibleDoctorCount]);

  // Function to load more doctors gradually
  const loadMoreDoctors = useCallback(() => {
    if (isLoadingMoreDoctors || visibleDoctorCount >= doctors.length) return;
    
    setIsLoadingMoreDoctors(true);
    
    // Simulate async loading for better UX
    setTimeout(() => {
      setVisibleDoctorCount(prev => Math.min(prev + 4, doctors.length));
      setIsLoadingMoreDoctors(false);
    }, 300);
  }, [isLoadingMoreDoctors, visibleDoctorCount]);

  // Memoized stats to prevent recalculation
  const hospitalStats = useMemo(() => ({
    totalDoctors: doctors.length,
    emergencyService: '24/7',
    accreditation: '100%'
  }), []);

  // Throttled scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const now = performance.now();
    
    // Throttle updates to max 60fps (16.67ms)
    if (now - lastUpdate.current < 16) {
      return;
    }
    lastUpdate.current = now;

    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
    
    // Only update if scroll difference is significant (reduces unnecessary updates)
    if (scrollDifference < 5) {
      lastScrollY.current = currentScrollY;
      return;
    }
    
    // Simplified logic: Always show header at top, hide when scrolling down significantly, show when scrolling up
    if (currentScrollY < scrollThreshold) {
      // Always show header at the top
      setIsHeaderVisible(true);
    } else {
      // Check scroll direction
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      if (isScrollingDown) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
        setIsMenuOpen(false);
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }
    }
    
    lastScrollY.current = currentScrollY;
  }, [scrollThreshold]);

  // Optimized scroll progress calculation
  const updateScrollProgress = useCallback(() => {
    const currentScrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? Math.min((currentScrollY / documentHeight) * 100, 100) : 0;
    setScrollProgress(progress);
  }, []);

  // Throttled scroll progress with useCallback
  const throttledScrollProgress = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [updateScrollProgress]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particle styles on client-side only
    const styles = Array.from({ length: 12 }, (_, index) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      id: `particle-${index}`
    }));
    setParticleStyles(styles);
    
    // Auto-slide effect
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 30000);

    // Combined optimized scroll handler
    const combinedScrollHandler = () => {
      handleScroll();
      // Update progress less frequently (every 10th call)
      frameCount.current++;
      if (frameCount.current % 10 === 0) {
        throttledScrollProgress();
      }
    };

    window.addEventListener('scroll', combinedScrollHandler, { passive: true });

    // Optimized mobile touch handling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartY - touchY;
      
      // Only trigger on significant swipe and reduce frequency
      if (Math.abs(touchDiff) > 50 && window.scrollY > 100) {
        if (touchDiff < -50) {
          // Swiping down (pull to show header)
          setIsHeaderVisible(true);
        }
      }
    };

    // Keyboard navigation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsHeaderVisible(true);
      }
    };

    // Add touch listeners with reduced frequency
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyPress, { passive: true });

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener('scroll', combinedScrollHandler);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [heroImages.length, handleScroll, throttledScrollProgress]);

  // Scroll reveal animation hook - only run on client side
  useLayoutEffect(() => {
    if (!isMounted) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const delay = target.dataset.delay || '0';
          target.style.transitionDelay = `${delay}ms`;
          target.style.opacity = '1';
          target.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elements = document.querySelectorAll('[data-animate="true"]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isMounted]);

  // Mock data




  return (
    <div className="min-h-screen bg-white">
      {/* Optimized Header with Dynamic Visibility - GPU Accelerated */}
      <header className={`bg-white/95 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-50 border-b border-gray-100/50 will-change-transform transition-transform duration-300 ease-out ${
        isHeaderVisible 
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`} style={{ 
        transform: `translateY(${isHeaderVisible ? '0' : '-100%'})`,
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}>
        {/* Simplified Top Bar */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">
                  rs.bhayangkara.palembang@gmail.com
                </span>
              </div>
              <div className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">
                  (0711) 414
                </span>
              </div>
            </div>
            
            {/* Emergency indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-300/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-red-100">24/7 Emergency</span>
            </div>
          </div>
        </div>

        {/* Simplified Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Simplified Logo Section */}
            <div className="group flex items-center cursor-pointer">
              <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <img
                  src="/images/header.png"
                  alt="RS Bhayangkara Logo"
                  className="h-16 w-auto"
                  loading="eager"
                />
              </div>
            </div>

            {/* Simplified Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {/* HOME with Dropdown */}
              <div className="relative group">
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg flex items-center gap-2"
                >
                  HOME
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <a
                      href="/tentang-kami"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">🏥</span>
                      <div>
                        <div className="font-semibold">Tentang Kami</div>
                        <div className="text-xs text-gray-500">Profile & Sejarah Rumah Sakit</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Other Navigation Items */}
              {/* DOKTER with Dropdown */}
              <div className="relative group">
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-2"
                >
                  DOKTER
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <Link
                      href="/dokter"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">👨‍⚕️</span>
                      <div>
                        <div className="font-semibold">Daftar Dokter</div>
                        <div className="text-xs text-gray-500">Lihat semua dokter & spesialisasi</div>
                      </div>
                    </Link>
                    <Link
                      href="/jadwal-dokter"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">📅</span>
                      <div>
                        <div className="font-semibold">Jadwal Dokter</div>
                        <div className="text-xs text-gray-500">Cek jadwal praktik dokter</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* INFORMASI with Dropdown */}
              <div className="relative group">
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-2"
                >
                  INFORMASI
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <Link
                      href="/berita"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">📰</span>
                      <div>
                        <div className="font-semibold">Berita & Informasi</div>
                        <div className="text-xs text-gray-500">Berita terkini dan informasi rumah sakit</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* PELAYANAN with Dropdown */}
              <div className="relative group">
                <button
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-2"
                >
                  PELAYANAN
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    {/* Fasilitas with Submenu */}
                    <div className="relative group/fasilitas">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200 cursor-pointer">
                        <span className="text-lg">🏢</span>
                        <div className="flex-1">
                          <div className="font-semibold">Fasilitas</div>
                          <div className="text-xs text-gray-500">Fasilitas rumah sakit lengkap</div>
                        </div>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover/fasilitas:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
                      {/* Fasilitas Submenu */}
                      <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/fasilitas:opacity-100 group-hover/fasilitas:visible transition-all duration-300 z-50">
                        <div className="p-3 space-y-1">
                          <Link
                            href="/fasilitas-kamar"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-lg">🛏️</span>
                            <div>
                              <div className="font-semibold">Fasilitas Kamar</div>
                              <div className="text-xs text-gray-500">Kamar rawat inap & ICU</div>
                            </div>
                          </Link>
                          <Link
                            href="/fasilitas-peralatan-medis"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-lg">🔬</span>
                            <div>
                              <div className="font-semibold">Fasilitas Peralatan Medis</div>
                              <div className="text-xs text-gray-500">Peralatan medis modern</div>
                            </div>
                          </Link>
                          <Link
                            href="/fasilitas-rumah-sakit"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-lg">🏥</span>
                            <div>
                              <div className="font-semibold">Fasilitas Rumah Sakit</div>
                              <div className="text-xs text-gray-500">Fasilitas umum & pendukung</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/pelayanan-poli"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">🏥</span>
                      <div>
                        <div className="font-semibold">Pelayanan Poli</div>
                        <div className="text-xs text-gray-500">Layanan poliklinik spesialis</div>
                      </div>
                    </Link>
                    <Link
                      href="/rawat-inap"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">🛏️</span>
                      <div>
                        <div className="font-semibold">Rawat Inap</div>
                        <div className="text-xs text-gray-500">Pelayanan rawat inap 24 jam</div>
                      </div>
                    </Link>
                    <Link
                      href="/penunjang-medis"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">🩹</span>
                      <div>
                        <div className="font-semibold">Penunjang Medis</div>
                        <div className="text-xs text-gray-500">Laboratorium & radiologi</div>
                      </div>
                    </Link>
                    <Link
                      href="/perawatan-umum"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">👩‍⚕️</span>
                      <div>
                        <div className="font-semibold">Perawatan Umum</div>
                        <div className="text-xs text-gray-500">Perawatan medis umum</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other Navigation Items */}
              {['E-LIBRARY', 'SOP RS'].map((item) => (
                <button
                  key={item}
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50"
                >
                  {item}
                </button>
              ))}
              
              {/* CTA Button */}
              <button className="ml-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-red-600 hover:to-orange-600 transition-colors duration-200 shadow-lg">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  DARURAT
                </span>
              </button>
            </nav>

            {/* Simplified Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 border border-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 relative">
                <div className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></div>
                <div className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-600 transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-600 transition-transform duration-200 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Simplified Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="bg-white border-t border-gray-100">
            <nav className="container mx-auto px-4 py-6 space-y-2">
              <button
                className="block w-full text-left px-6 py-4 rounded-xl font-semibold transition-colors duration-200 bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg"
              >
                HOME
              </button>
              
              {/* DOKTER Section */}
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  DOKTER
                </div>
                <div className="space-y-1">
                  <Link
                    href="/dokter"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">👨‍⚕️</span>
                    <div>
                      <div className="font-semibold">Daftar Dokter</div>
                      <div className="text-xs text-gray-500">Lihat semua dokter & spesialisasi</div>
                    </div>
                  </Link>
                  <Link
                    href="/jadwal-dokter"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">📅</span>
                    <div>
                      <div className="font-semibold">Jadwal Dokter</div>
                      <div className="text-xs text-gray-500">Cek jadwal praktik dokter</div>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* INFORMASI Section */}
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  INFORMASI
                </div>
                <div className="space-y-1">
                  <Link
                    href="/berita"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">📰</span>
                    <div>
                      <div className="font-semibold">Berita & Informasi</div>
                      <div className="text-xs text-gray-500">Berita terkini dan informasi rumah sakit</div>
                    </div>
                  </Link>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">📋</span>
                    <div>
                      <div className="font-semibold">Pengumuman</div>
                      <div className="text-xs text-gray-500">Pengumuman resmi rumah sakit</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">📅</span>
                    <div>
                      <div className="font-semibold">Agenda Kegiatan</div>
                      <div className="text-xs text-gray-500">Jadwal kegiatan dan acara</div>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* PELAYANAN Section */}
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  PELAYANAN
                </div>
                <div className="space-y-1">
                  {/* Fasilitas with Expandable Submenu */}
                  <div>
                    <button
                      onClick={() => setIsFasilitasOpen(!isFasilitasOpen)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                    >
                      <span className="text-lg">🏢</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">Fasilitas</div>
                        <div className="text-xs text-gray-500">Fasilitas rumah sakit lengkap</div>
                      </div>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isFasilitasOpen ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Fasilitas Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isFasilitasOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="ml-8 mt-1 space-y-1">
                        <Link
                          href="/fasilitas-kamar"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                        >
                          <span className="text-base">🛏️</span>
                          <div>
                            <div className="font-medium text-sm">Fasilitas Kamar</div>
                            <div className="text-xs text-gray-500">Kamar rawat inap & ICU</div>
                          </div>
                        </Link>
                        <Link
                          href="/fasilitas-peralatan-medis"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                        >
                          <span className="text-base">🔬</span>
                          <div>
                            <div className="font-medium text-sm">Fasilitas Peralatan Medis</div>
                            <div className="text-xs text-gray-500">Peralatan medis modern</div>
                          </div>
                        </Link>
                        <Link
                          href="/fasilitas-rumah-sakit"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                        >
                          <span className="text-base">🏥</span>
                          <div>
                            <div className="font-medium text-sm">Fasilitas Rumah Sakit</div>
                            <div className="text-xs text-gray-500">Fasilitas umum & pendukung</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🩺</span>
                    <div>
                      <div className="font-semibold">Sarana Medis</div>
                      <div className="text-xs text-gray-500">Peralatan medis modern</div>
                    </div>
                  </a>
                  <Link
                    href="/pelayanan-poli"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🏥</span>
                    <div>
                      <div className="font-semibold">Pelayanan Poli</div>
                      <div className="text-xs text-gray-500">Layanan poliklinik spesialis</div>
                    </div>
                  </Link>
                  <Link
                    href="/rawat-inap"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🛏️</span>
                    <div>
                      <div className="font-semibold">Rawat Inap</div>
                      <div className="text-xs text-gray-500">Pelayanan rawat inap 24 jam</div>
                    </div>
                  </Link>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🚶</span>
                    <div>
                      <div className="font-semibold">Rawat Jalan</div>
                      <div className="text-xs text-gray-500">Konsultasi & pemeriksaan rawat jalan</div>
                    </div>
                  </a>
                  <Link
                    href="/penunjang-medis"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🩹</span>
                    <div>
                      <div className="font-semibold">Penunjang Medis</div>
                      <div className="text-xs text-gray-500">Laboratorium & radiologi</div>
                    </div>
                  </Link>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">🦠</span>
                    <div>
                      <div className="font-semibold">Ruang Isolasi Covid</div>
                      <div className="text-xs text-gray-500">Isolasi & perawatan Covid-19</div>
                    </div>
                  </a>
                  <Link
                    href="/perawatan-umum"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                  >
                    <span className="text-lg">👩‍⚕️</span>
                    <div>
                      <div className="font-semibold">Perawatan Umum</div>
                      <div className="text-xs text-gray-500">Perawatan medis umum</div>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Other Navigation Items */}
              {['E-LIBRARY', 'SOP RS'].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left px-6 py-4 rounded-xl font-semibold transition-colors duration-200 text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                >
                  {item}
                </button>
              ))}
              
              {/* Mobile Emergency Button */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-colors duration-200 shadow-lg">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span>LAYANAN DARURAT 24/7</span>
                    <Phone className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Interactive Hero Section */}
      <section className="relative text-white min-h-screen overflow-hidden bg-black pt-32 md:pt-36">
        {/* Temporary Debug Info - Remove after testing */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-36 left-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs">
            <div>Header Visible: {isHeaderVisible ? 'YES' : 'NO'}</div>
            <div>Scroll Progress: {scrollProgress.toFixed(1)}%</div>
            <div>Last Scroll Y: {lastScrollY.current}</div>
            <div>Current Scroll: {typeof window !== 'undefined' ? window.scrollY : 0}</div>
          </div>
        )}
        
        {/* Optimized Scroll Progress Indicator */}
        {scrollProgress > 5 && (
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/10 z-40">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-200 ease-out will-change-transform"
              style={{ 
                transform: `scaleX(${scrollProgress / 100})`,
                transformOrigin: 'left center'
              }}
            />
          </div>
        )}
        {/* Animated Background with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div
            className="fixed inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(/images/herobg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              zIndex: -1,
              willChange: 'transform',
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          />
          {/* Static gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-blue-900/70 to-teal-800/80"></div>
          
          {/* Floating particles animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {isMounted && particleStyles.map((style) => (
              <div
                key={style.id}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                style={style}
              />
            ))}
          </div>
          
          {/* Interactive morphing shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-blue-500/10 rounded-full blur-3xl animate-morph opacity-60"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-teal-500/10 rounded-full blur-2xl animate-morph-reverse opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20 flex items-center py-8 lg:py-12 min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-6 lg:gap-8">

            {/* Enhanced Interactive Text Section */}
            <div data-animate="true" className="opacity-0 translate-y-8 transition-all duration-700 ease-out flex-1 lg:max-w-2xl space-y-4">
              {/* Interactive Trust Badge with hover effects */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-5 py-3 mb-4 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:animate-bounce"></div>
                <span className="text-sm font-semibold text-white group-hover:text-green-200 transition-colors">Terakreditasi Paripurna • Melayani 24/7</span>
              </div>

              {/* Animated Main Heading with typewriter effect */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="block text-white animate-fade-in-up">Kesehatan</span>
                <span className="block bg-gradient-to-r from-yellow-300 via-blue-200 to-teal-300 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up animation-delay-300">
                  Terdepan
                </span>
                <span className="block text-white text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 animate-fade-in-up animation-delay-600">
                  untuk Keluarga Anda
                </span>
              </h1>

              {/* Enhanced Description with stagger animation */}
              <div className="space-y-3 mb-4 animate-fade-in-up animation-delay-900">
                <p className="text-base md:text-lg text-white leading-relaxed">
                  <span className="font-bold text-yellow-300 hover:text-yellow-200 transition-colors cursor-pointer">RS Bhayangkara Mohammad Hasan Palembang</span> -
                  Rumah sakit terpercaya dengan teknologi medis terkini dan tim dokter spesialis berpengalaman.
                </p>
                
                {/* Interactive Key Features with hover animations */}
                <div className="flex flex-wrap gap-2 text-white">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-ping"></div>
                    <span className="text-xs font-semibold group-hover:text-blue-200 transition-colors">Dokter Spesialis</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping"></div>
                    <span className="text-xs font-semibold group-hover:text-green-200 transition-colors">BPJS & Umum</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:animate-ping"></div>
                    <span className="text-xs font-semibold group-hover:text-yellow-200 transition-colors">Teknologi Modern</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Interactive CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up animation-delay-1200">
                <button className="group relative bg-white text-teal-600 px-6 py-3 rounded-full font-bold text-base hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Konsultasi Sekarang
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700"></div>
                </button>
                
                <Link 
                  href="/jadwal-dokter"
                  className="group relative bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-bold text-base hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V3m6 4v10.5a2.5 2.5 0 01-2.5 2.5h-3a2.5 2.5 0 01-2.5-2.5V7" />
                    </svg>
                    Lihat Jadwal
                  </span>
                </Link>
                
                <button className="group relative bg-white/15 backdrop-blur-sm border-2 border-white/50 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-white/25 hover:border-white/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Hubungi Kami
                  </span>
                </button>
              </div>

              {/* Interactive Animated Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t-2 border-white/40 animate-fade-in-up animation-delay-1500">
                <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors animate-counter" data-target="24">24/7</div>
                  <div className="text-xs text-white/90 font-medium group-hover:text-white transition-colors">Layanan Darurat</div>
                </div>
                <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors animate-counter" data-target="100">100+</div>
                  <div className="text-xs text-white/90 font-medium group-hover:text-white transition-colors">Tenaga Medis</div>
                </div>
                <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-1 group-hover:text-yellow-200 transition-colors">★★★★★</div>
                  <div className="text-xs text-white/90 font-medium group-hover:text-white transition-colors">Terakreditasi</div>
                </div>
              </div>
            </div>

            {/* Enhanced Interactive Image Slider Section */}
            <div data-animate="true" className="opacity-0 translate-x-8 transition-all duration-700 ease-out flex-1 flex justify-center lg:justify-end">
              {isMounted && (
                <div className="relative rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  {/* Glassmorphism container */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
                  
                  {heroImages.map((img, index) => (
                    <div
                      key={`slide-${index}`}
                      className={`transition-all duration-1000 ${
                        index === currentSlide ? 'opacity-100 relative z-20 scale-100' : 'opacity-0 absolute inset-0 z-10 scale-95'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Hospital slide ${index + 1}`}
                        className="w-auto h-auto max-w-full max-h-[60vh] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700"
                        loading={index === 0 ? "eager" : "lazy"}
                      />

                      {/* Enhanced Interactive Overlay */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-black text-sm font-bold z-30 hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg">
                        RS Bhayangkara
                      </div>
                    </div>
                  ))}

                  {/* Enhanced Navigation Dots with hover effects */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                    {heroImages.map((_, index) => (
                      <button
                        key={`dot-${index}`}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                          index === currentSlide
                            ? 'bg-white w-8 shadow-lg'
                            : 'bg-white/60 w-3 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Enhanced Interactive Arrows */}
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all duration-300 z-30 border border-white/20"
                    aria-label="Previous slide"
                  >
                    <svg className="w-6 h-6 hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all duration-300 z-30 border border-white/20"
                    aria-label="Next slide"
                  >
                    <svg className="w-6 h-6 hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Progress indicator */}
                  <div className="absolute top-4 right-4 z-30">
                    <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all duration-300">
                      <div className="text-white text-xs font-bold">{currentSlide + 1}/{heroImages.length}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce hover:animate-pulse cursor-pointer group">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse group-hover:bg-white"></div>
          </div>
          <div className="text-white/60 text-xs mt-2 text-center group-hover:text-white transition-colors duration-300">Scroll</div>
        </div>
        
        {/* Floating action buttons */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 space-y-4">
          <button className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group">
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.126-.9L3 20l1.9-4.874A9.863 9.863 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
            </svg>
          </button>
          <button className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group animate-pulse">
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </section>


      {/* Quick Info Cards */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* News Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-teal-600 to-teal-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] min-h-[280px] flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Berita Klinik</h3>
                </div>
                <p className="text-sm opacity-90 mb-6 flex-grow leading-relaxed">
                  Kunjungan Kerja Dinkes Kota Palembang dan dinkes Provinsi ke Rumah Sakit Bhayangkara
                </p>
                <div className="text-xs opacity-75 mb-4">28 Maret 2021 | 15:56:29</div>
                <button className="bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors duration-300 self-start">
                  Baca Selengkapnya
                </button>
              </div>
            </div>
            
            {/* Doctor Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] min-h-[280px] flex flex-col border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Dokter</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Dokter terbaik di Bhayangkara selalu memberikan profesionalisme, memberikan pelayanan medis yang berkualitas, serta penuh perhatian terhadap kesejahteraan.
                </p>
                <Link href="/dokter" className="mt-4 flex items-center text-teal-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Lihat Tim Dokter</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* 24 Hour Service Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] min-h-[280px] flex flex-col border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">Layanan 24 Jam</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Layanan 24 jam di Bhayangkara hadir untuk memberikan perawatan medis terbaik kapan saja, memastikan pasien mendapatkan bantuan secepat mungkin.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Hubungi Darurat</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Operating Hours Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] min-h-[280px] flex flex-col border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Jam Buka</h3>
                </div>
                <div className="text-gray-600 text-sm space-y-3 flex-grow">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Senin - Jumat</span>
                    <span className="text-blue-600 font-semibold">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Sabtu</span>
                    <span className="text-blue-600 font-semibold">9:30 - 17:30</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Minggu</span>
                    <span className="text-blue-600 font-semibold">9:30 - 15:00</span>
                  </div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                  <div className="flex items-center text-blue-600 text-xs font-medium">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    <span>Layanan Darurat 24/7 Tersedia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.1)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Centered Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold uppercase tracking-wide">
              Tentang Kami
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-4">
              Memberikan Pelayanan Kesehatan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Terbaik</span>{' '}
              Untuk Anda
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mt-4">
              RS Bhayangkara Mohammad Hasan Palembang telah melayani masyarakat dengan dedikasi tinggi dan komitmen untuk memberikan pelayanan kesehatan terbaik.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">

              {/* Main Description Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6m-6 4h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Tentang RS Bhayangkara Palembang</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Kami melayani dengan Ikhlas dan Profesional, selain memberikan pelayanan kesehatan kepada Anggota Polri, RS Bhayangkara Palembang juga melayani pasien umum BPJS. Didukung oleh tenaga kesehatan yang Profesional, Terlatih dan Berpengalaman.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        RS Bhayangkara Palembang salah satu Rumah Sakit yang memiliki pelayanan hemodialisa anak dan dewasa. Dukungan Peralatan canggih terkini dan terakreditasi seperti CT Scan, Ruang operasi dengan Sistem MOT (Modular Operating System), serta penunjang lainnya seperti Laboratium PCR yang tercanggih.
                      </p>
                    </div>
                  </div>
                  
                  <a 
                    href="/tentang-kami"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Selengkapnya
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Content - Image and Stats */}
            <div className="relative">
              {/* Background decorative circles */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full opacity-20 animate-pulse blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full opacity-20 animate-pulse delay-700 blur-2xl"></div>
              
              <div className="relative">
                {/* Main image */}
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <img
                    src="/images/about.jpg"
                    alt="Hospital Facility"
                    className="w-full h-80 object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                
                {/* Stats floating cards */}
                <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">24/7</div>
                        <div className="text-sm text-gray-600">Layanan Darurat</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">100+</div>
                        <div className="text-sm text-gray-600">Tenaga Medis</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards - Centered */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-20">
            {/* Vision Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Visi</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Terwujudnya Pelayanan Kesehatan Paripurna yang Prima dan Unggul di Bidang Kedokteran Kepolisian.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Misi</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Menyelenggarakan pelayanan kesehatan yang profesional, bermutu, akuntabel, dan humanis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mengembangkan kualitas SDM secara profesional</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Melengkapi sarana prasarana dan teknologi modern</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Membangun kemitraan lintas sektoral</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full inline-block shadow-sm border border-teal-100 mb-4">Pelayanan Kami</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Layanan Unggulan</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Kami mencakup berbagai layanan medis dengan standar profesional tertinggi</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div 
                key={service.title}
                data-animate="true"
                data-delay={(services.indexOf(service) * 200).toString()}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-4xl shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-teal-600 font-medium">
                    <span className="text-sm group-hover:mr-2 transition-all">Pelajari Lebih Lanjut</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 relative">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full inline-block shadow-sm border border-teal-100 mb-3">Tim Medis Profesional</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Dokter Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Ditangani oleh dokter spesialis yang berpengalaman dan profesional</p>
            <div className="absolute -top-8 -right-4 w-24 h-24 bg-teal-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          </div>
          
          {/* Doctors Grid with Animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {displayedDoctors.map((doctor, index) => {
              const isAvailable = isCurrentlyAvailable(doctor);
              
              return (
                <div 
                  key={doctor.id}
                  data-animate="true"
                  data-delay={(index * 150).toString()}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-out group relative"
                  style={{
                    animationDelay: showAllDoctors && index >= 6 ? `${(index - 6) * 150}ms` : undefined
                  }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform group-hover:-translate-y-1">
                    {/* Doctor Image/Avatar */}
                    <div className="aspect-[2/1] bg-gradient-to-br from-teal-400/80 to-blue-500/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                        <Users className="w-6 h-6 text-teal-600 transform group-hover:rotate-12 transition-transform duration-300" />
                        {/* Verification badge */}
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      {/* Dynamic Online status indicator */}
                      <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                        <div className={`w-1 h-1 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="text-xs font-medium text-gray-600">
                          {isAvailable ? 'Available' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Doctor Info */}
                    <div className="p-3 relative bg-gradient-to-b from-white to-gray-50/50">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-gray-800 text-sm leading-tight group-hover:text-teal-600 transition-colors line-clamp-2">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center gap-0.5 ml-2">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-md p-1.5 border border-teal-100">
                          <p className="text-teal-600 text-xs font-semibold mb-0.5">{doctor.specialization}</p>
                          <p className="text-gray-600 text-xs">{doctor.role}</p>
                        </div>
                        
                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-100 rounded-full flex items-center justify-center">
                              <Clock className="w-1.5 h-1.5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Pengalaman</p>
                              <p className="text-xs font-semibold text-gray-700">{doctor.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-1.5 h-1.5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Jadwal</p>
                              <p className="text-xs font-semibold text-gray-700 line-clamp-1">{doctor.schedule}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-2">
                        <Link
                          href={`/dokter/profile/${doctor.id}`}
                          className="group relative w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-1.5 px-2 rounded-md text-xs font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg overflow-hidden block text-center"
                        >
                          {/* Background shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                          
                          {/* Button content */}
                          <div className="relative flex items-center justify-center gap-1">
                            <Users className="w-2.5 h-2.5 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                            <span className="font-medium tracking-wide">Lihat Profile</span>
                            <ChevronRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          
                          {/* Pulse effect on hover */}
                          <div className="absolute inset-0 rounded-md border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Show More/Less Button */}
          {doctors.length > 6 && (
            <div className="text-center space-y-4 mt-12">
              {!showAllDoctors && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => {
                      setShowAllDoctors(true);
                      setVisibleDoctorCount(12); // Start with 12 when showing all
                    }}
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <span className="text-lg">
                        Lihat Lebih Banyak Dokter ({doctors.length})
                      </span>
                      <div className="transform transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute right-0 w-12 h-full bg-white/10 skew-x-[20deg] -translate-x-20 group-hover:translate-x-32 transition-transform duration-500"></div>
                  </button>
                  
                  <Link
                    href="/jadwal-dokter"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V3m6 4v10.5a2.5 2.5 0 01-2.5 2.5h-3a2.5 2.5 0 01-2.5-2.5V7" />
                      </svg>
                      <span className="text-lg">
                        Lihat Jadwal Dokter
                      </span>
                    </div>
                    <div className="absolute right-0 w-12 h-full bg-white/10 skew-x-[20deg] -translate-x-20 group-hover:translate-x-32 transition-transform duration-500"></div>
                  </Link>
                </div>
              )}
              
              {showAllDoctors && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {/* Load More Button */}
                  {visibleDoctorCount < doctors.length && (
                    <button
                      onClick={loadMoreDoctors}
                      disabled={isLoadingMoreDoctors}
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center gap-3">
                        {isLoadingMoreDoctors ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span className="text-lg">Loading...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">
                              Muat Lebih Banyak ({doctors.length - visibleDoctorCount} tersisa)
                            </span>
                            <div className="transform transition-transform duration-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="absolute right-0 w-12 h-full bg-white/10 skew-x-[20deg] -translate-x-20 group-hover:translate-x-32 transition-transform duration-500"></div>
                    </button>
                  )}
                  
                  {/* Show Less Button */}
                  <button
                    onClick={() => {
                      setShowAllDoctors(false);
                      setVisibleDoctorCount(6);
                    }}
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                      <span className="text-lg">
                        Tampilkan Lebih Sedikit
                      </span>
                      <div className="transform transition-transform duration-300 rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute right-0 w-12 h-full bg-white/10 skew-x-[20deg] -translate-x-20 group-hover:translate-x-32 transition-transform duration-500"></div>
                  </button>
                </div>
              )}
              
              {/* Statistics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-teal-600 mb-1">{doctors.length}+</div>
                  <div className="text-sm text-gray-600">Dokter Spesialis</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Layanan Darurat</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Profesional</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full inline-block shadow-sm border border-teal-100 mb-4">Berita Terkini</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Berita & Informasi</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Temukan informasi terbaru seputar layanan dan kegiatan RS Bhayangkara</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(0, 3).map((article) => (
              <div 
                key={article.id}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                <Link href={`/berita/${article.id}`} className="block">
                  <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-teal-600 font-medium">{article.date}</div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border bg-white/90 backdrop-blur-sm text-gray-800 border-gray-200`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
                      <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-teal-600 transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.readTime} min baca</span>
                        </div>
                        <div className="text-teal-600 text-sm font-medium flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
                          Baca Selengkapnya
                          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* View All News Button */}
          <div className="text-center mt-12">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              Lihat Semua Berita
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full inline-block shadow-sm border border-teal-100 mb-4">Suara Mereka</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimoni Pengunjung</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Apa kata mereka tentang pelayanan RS Bhayangkara</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={`testimonial-${testimonial.name}-${testimonial.role}`}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                  <div className="mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={`star-${testimonial.name}-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="relative">
                    <div className="absolute -top-4 -left-2 text-teal-200 opacity-40 transform scale-150">
                      "
                    </div>
                    <p className="text-gray-600 relative z-10 mb-6 leading-relaxed">
                      {testimonial.message}
                    </p>
                  </blockquote>
                  <div className="flex items-center mt-6 pt-6 border-t border-gray-100">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400/80 to-blue-500/80 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-gray-900 font-semibold group-hover:text-teal-600 transition-colors">{testimonial.name}</h4>
                      <p className="text-teal-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1440 94" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#FFFFFFFF" d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Logo and Social Links */}
          <div className="text-center mb-16">
            <div className="bg-white/90 p-4 rounded-xl inline-block mb-6">
              <img src="/images/header.png" alt="RS Bhayangkara Logo" className="h-16 w-auto" />
            </div>
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <img 
                  src="/images/PRESISI.png" 
                  alt="RS Bhayangkara" 
                  className="h-50 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Hubungi Kami</span>
                  <div className="absolute right-0 w-12 h-full bg-white/10 skew-x-[20deg] -translate-x-20 group-hover:translate-x-32 transition-transform duration-500"></div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Menu Utama</h3>
              <ul className="space-y-2">
                {['Home', 'Dokter', 'Visi dan Misi', 'E-Library', 'Pelayanan', 'SOP RS'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                      <ChevronRight className="w-4 h-4 mr-2 text-teal-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Kontak Kami</h3>
              <div className="space-y-4">
                <a href="mailto:rs.bhayangkara.palembang@gmail.com" className="flex items-start group">
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-gray-600">
                    <Mail className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-300">rs.bhayangkara.palembang@gmail.com</p>
                  </div>
                </a>
                <a href="tel:(0711)414" className="flex items-start group">
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-gray-600">
                    <Phone className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-300">(0711) 414</p>
                  </div>
                </a>
                <a
                  href="https://maps.app.goo.gl/KAVjdZuMNDDQW7Su9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-gray-600">
                    <MapPin className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Alamat</p>
                    <p className="text-sm font-medium text-gray-300">
                      Jl. Jend. Sudirman No.km 4, RW.5, Ario Kemuning, Kec. Kemuning, Kota Palembang, Sumatera Selatan 30128
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Jam Operasional</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center mr-3 border border-gray-600">
                    <Clock className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Senin - Jumat</span>
                      <span className="font-medium text-gray-300">8:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Sabtu</span>
                      <span className="font-medium text-gray-300">9:30 - 17:30</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Minggu</span>
                      <span className="font-medium text-gray-300">9:30 - 15:00</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Layanan Darurat 24/7
                      </h4>
                      <p className="text-sm opacity-90 mb-3">Kami siap melayani keadaan darurat 24 jam sehari, 7 hari seminggu</p>
                      
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                        <Phone className="w-4 h-4 text-white animate-pulse" />
                        <div className="text-sm font-semibold">(0711) 414855 - 410023</div>
                      </div>
                    </div>
                    
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src="/images/ninu.png"
                        alt="Ambulance"
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm">
                RS Bhayangkara
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-12 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-25 blur-lg group-hover:opacity-75 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <img src="/images/bpjs-kesehatan.png" alt="BPJS Kesehatan" className="h-12 w-auto filter brightness-95 hover:brightness-100 transition-all" loading="lazy" />
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-25 blur-lg group-hover:opacity-75 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <img src="/images/Kars-Bintang5.png" alt="KARS Bintang 5" className="h-12 w-auto filter brightness-95 hover:brightness-100 transition-all" loading="lazy" />
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-25 blur-lg group-hover:opacity-75 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <img src="/images/Kementrian-kesehatan.png" alt="Kementerian Kesehatan" className="h-12 w-auto filter brightness-95 hover:brightness-100 transition-all" loading="lazy" />
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl opacity-25 blur-lg group-hover:opacity-75 transition-all duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <img src="/images/Logo-Blue-Promise.png" alt="Blue Promise" className="h-12 w-auto filter brightness-95 hover:brightness-100 transition-all" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Logo */}
          <div className="flex justify-center mt-12 mb-16">
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl opacity-25 blur-xl group-hover:opacity-75 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <img 
                  src="/images/logo-rs-1.png" 
                  alt="RS Bhayangkara Logo" 
                  className="h-20 w-auto filter brightness-95 hover:brightness-100 transition-all"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Rumah Sakit Bhayangkara Mohammad Hasan Palembang. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Optimized Scroll to Top Button */}
      {!isHeaderVisible && scrollProgress > 15 && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsHeaderVisible(true); // Force header to show
          }}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 will-change-transform hover:scale-105"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

      {/* Emergency Header Toggle Button - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setIsHeaderVisible(!isHeaderVisible)}
          className="fixed bottom-6 left-6 z-40 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg text-xs"
          aria-label="Toggle header"
        >
          {isHeaderVisible ? 'Hide' : 'Show'} Header
        </button>
      )}
    </div>
  );
};

export default HospitalWebsite;