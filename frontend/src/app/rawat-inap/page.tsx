'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Bed, 
  Users, 
  Heart, 
  Shield, 
  Activity,
  Baby,
  Stethoscope,
  Droplets,
  UserCheck,
  Zap,
  Award,
  CheckCircle,
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Eye,
  MessageCircle
} from 'lucide-react';

const RawatInapPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isStickySearchVisible, setIsStickySearchVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Filters and UI state
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('relevance');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (direction !== (isHeaderVisible ? "up" : "down")) {
        setIsHeaderVisible(direction === "up" || scrollY < 10);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;

      // Check if we should hide search bar based on scroll position
      const facilitiesSection = document.querySelector('[data-facilities-section]');
      const hideSearchSection = document.querySelector('[data-hide-search]');
      
      if (facilitiesSection && hideSearchSection) {
        const facilitiesRect = facilitiesSection.getBoundingClientRect();
        const hideSearchRect = hideSearchSection.getBoundingClientRect();
        
        // Show search when facilities section is visible
        const facilitiesVisible = facilitiesRect.top < window.innerHeight && facilitiesRect.bottom > 0;
        
        // Hide search when we reach the "Mengapa Memilih Kami" section
        const shouldHideSearch = hideSearchRect.top <= window.innerHeight * 0.3;
        
        if (shouldHideSearch) {
          setIsStickySearchVisible(false);
        } else if (facilitiesVisible) {
          setIsStickySearchVisible(true);
        }
      }
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [isHeaderVisible]);

  // Intersection Observer for animations and sticky search visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = Number(entry.target.getAttribute('data-card-index'));
            if (!isNaN(cardIndex)) {
              setVisibleCards(prev => [...prev, cardIndex]);
            }
            if (entry.target.getAttribute('data-stats') === 'true') {
              setIsStatsVisible(true);
            }
            // Hide sticky search when "Mengapa Memilih Kami" section is visible
            if (entry.target.getAttribute('data-hide-search') === 'true') {
              setIsStickySearchVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Separate observer for facilities section to control search visibility
    const facilitiesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.getAttribute('data-facilities-section') === 'true') {
            // Only show search when facilities section is visible AND we haven't reached the hide-search section
            const hideSearchElement = document.querySelector('[data-hide-search]');
            const hideSearchRect = hideSearchElement?.getBoundingClientRect();
            const shouldHide = hideSearchRect && hideSearchRect.top < window.innerHeight;
            
            if (entry.isIntersecting && !shouldHide) {
              setIsStickySearchVisible(true);
            } else {
              setIsStickySearchVisible(false);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    // Observer specifically for the hide-search section to ensure it stays hidden
    const hideSearchObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.getAttribute('data-hide-search') === 'true') {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              // Hide search when the hide-search section is visible or has been scrolled past
              setIsStickySearchVisible(false);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 50% 0px' }
    );

    const cardElements = document.querySelectorAll('[data-card-index]');
    const statsElement = document.querySelector('[data-stats]');
    const hideSearchElement = document.querySelector('[data-hide-search]');
    const facilitiesSection = document.querySelector('[data-facilities-section]');
    
    cardElements.forEach(el => observer.observe(el));
    if (statsElement) observer.observe(statsElement);
    if (hideSearchElement) hideSearchObserver.observe(hideSearchElement);
    if (facilitiesSection) facilitiesObserver.observe(facilitiesSection);

    return () => {
      observer.disconnect();
      facilitiesObserver.disconnect();
      hideSearchObserver.disconnect();
    };
  }, []); // Empty dependency since we're querying DOM elements

  // Debounce search query for performance
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Helper function to get background color based on facility color
  const getBackgroundColor = (color: string) => {
    if (color.includes('blue')) return '#f0f9ff';
    if (color.includes('teal')) return '#f0fdfa';
    if (color.includes('pink')) return '#fdf2f8';
    if (color.includes('amber')) return '#fffbeb';
    if (color.includes('red')) return '#fef2f2';
    if (color.includes('purple')) return '#faf5ff';
    if (color.includes('green')) return '#f0fdf4';
    if (color.includes('cyan')) return '#ecfeff';
    return '#f9fafb';
  };

  const inpatientFacilities = [
    {
      id: 1,
      name: "Instalasi Rawat Inap Suparto",
      beds: 5,
      icon: <Shield className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      description: "Unit perawatan khusus dengan fasilitas premium",
      features: ["Kamar VIP", "Perawatan Intensif", "Monitoring 24/7"],
      category: "Premium",
    },
    {
      id: 2,
      name: "Instalasi Rawat Inap Umum",
      beds: 30,
      icon: <Bed className="w-8 h-8" />,
      color: "from-teal-500 to-cyan-600",
      description: "Pelayanan rawat inap untuk perawatan medis umum",
      features: ["Kamar Standar", "Perawat Terlatih", "Fasilitas Lengkap"],
      category: "Umum",
    },
    {
      id: 3,
      name: "Instalasi Rawat Inap Anak",
      beds: 8,
      icon: <Baby className="w-8 h-8" />,
      color: "from-pink-500 to-rose-600",
      description: "Perawatan khusus untuk pasien pediatric",
      features: ["Dokter Spesialis Anak", "Ruang Bermain", "Family Room"],
      category: "Anak",
    },
    {
      id: 4,
      name: "Instalasi Rawat Inap Cendana",
      beds: 27,
      icon: <Users className="w-8 h-8" />,
      color: "from-amber-500 to-orange-600",
      description: "Unit perawatan dengan suasana nyaman dan tenang",
      features: ["Desain Modern", "AC Central", "TV Cable"],
      category: "Umum",
    },
    {
      id: 5,
      name: "Instalasi Rawat Inap JN 1",
      beds: 26,
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-500 to-pink-600",
      description: "Perawatan jantung dan sistem cardiovascular",
      features: ["Monitor Jantung", "Tim Kardiologi", "Perawatan Khusus"],
      category: "Jantung",
    },
    {
      id: 6,
      name: "Instalasi Rawat Inap JN 2",
      beds: 20,
      icon: <Activity className="w-8 h-8" />,
      color: "from-purple-500 to-violet-600",
      description: "Lanjutan perawatan sistem cardiovascular",
      features: ["Rehabilitasi Jantung", "Monitoring Lanjutan", "Terapi Fisik"],
      category: "Jantung",
    },
    {
      id: 7,
      name: "Instalasi Rawat Inap Kebidanan",
      beds: 44,
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      description: "Perawatan ibu hamil, melahirkan, dan nifas",
      features: ["Ruang Bersalin", "Perawatan Neonatal", "Konsultasi Laktasi"],
      category: "Kebidanan",
    },
    {
      id: 8,
      name: "Instalasi Rawat Inap Hemodialisis",
      beds: 10,
      icon: <Droplets className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
      description: "Perawatan cuci darah dengan teknologi modern",
      features: ["Mesin HD Terbaru", "Dokter Nefrologi", "Perawatan Steril"],
      category: "Hemodialisis",
    },
    {
      id: 9,
      name: "Instalasi Rawat Inap Operasi (OK)",
      beds: 2,
      icon: <Stethoscope className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-600",
      description: "Unit perawatan pasca operasi",
      features: ["Recovery Room", "Monitoring Ketat", "Tim Anestesi"],
      category: "Operasi",
    },
    {
      id: 10,
      name: "Unit Perawatan Intensif (ICU)",
      beds: 3,
      icon: <Zap className="w-8 h-8" />,
      color: "from-red-600 to-red-700",
      description: "Perawatan intensif untuk kondisi kritis",
      features: ["Ventilator", "Monitor Canggih", "Tim ICU 24/7"],
      category: "Intensif",
    },
  ];

  const categories = React.useMemo(() => {
    return ['Semua', ...Array.from(new Set(inpatientFacilities.map((f) => f.category)))];
  }, []);

  const totalBeds = inpatientFacilities.reduce((sum, facility) => sum + facility.beds, 0);

  const filteredFacilities = React.useMemo(() => {
    let list = inpatientFacilities.filter((f) => {
      const matchesCategory = activeCategory === 'Semua' || f.category === activeCategory;
      if (!debouncedQuery) return matchesCategory;
      const hay = (f.name + ' ' + f.description + ' ' + f.features.join(' ')).toLowerCase();
      return matchesCategory && hay.includes(debouncedQuery);
    });

    if (sortBy === 'beds_desc') list = list.sort((a, b) => b.beds - a.beds);
    if (sortBy === 'beds_asc') list = list.sort((a, b) => a.beds - b.beds);
    if (sortBy === 'az') list = list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [inpatientFacilities, activeCategory, debouncedQuery, sortBy]);

  const faqs = [
    {
      q: 'Bagaimana prosedur pendaftaran rawat inap?',
      a: 'Datang ke loket pendaftaran dengan identitas diri, kartu BPJS/asuransi (jika ada), dan surat rujukan. Tim kami akan memandu proses seleksi kamar dan administrasi.',
    },
    {
      q: 'Apakah ada jam besuk pasien?',
      a: 'Jam kunjungan: Senin-Jumat 11.00-13.00 dan 17.00-19.00; Sabtu-Minggu 10.00-12.00 dan 17.00-19.00. Harap jaga ketenangan dan kebersihan.',
    },
    {
      q: 'Apa saja yang perlu dibawa saat rawat inap?',
      a: 'Bawa dokumen identitas, kartu asuransi, obat rutin (jika ada), dan kebutuhan pribadi seperti pakaian dan alat mandi.',
    },
    {
      q: 'Apakah layanan darurat tersedia 24/7?',
      a: 'Ya. Silakan hubungi (0711) 414855 - 410023 untuk bantuan darurat kapan pun.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-white/95 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-50 border-b border-gray-100/50 will-change-transform transition-transform duration-300 ease-out ${
        isHeaderVisible 
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`}>
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">rs.bhayangkara.palembang@gmail.com</span>
              </div>
              <div className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">(0711) 414</span>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-300/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-red-100">24/7 Emergency</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="group flex items-center cursor-pointer"
            >
              <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <img
                  src="/images/header.png"
                  alt="RS Bhayangkara Logo"
                  className="h-16 w-auto"
                  loading="eager"
                />
              </div>
            </button>

            {/* Navigation - Show on both mobile and desktop */}
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Beranda
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => window.location.href = '/pelayanan'}
                className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Pelayanan
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-teal-600 font-semibold">Rawat Inap</span>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
      </header>

      {/* Hero Section */}
      <section className="relative pt-45 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-300/10 via-blue-300/10 to-indigo-300/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Heart className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <div className="absolute top-48 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="absolute bottom-32 left-32 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
            <div className="w-14 h-14 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Shield className="w-7 h-7 text-teal-400" />
            </div>
          </div>
          <div className="absolute bottom-48 right-16 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
            <div className="w-8 h-8 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Stethoscope className="w-4 h-4 text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-xl border border-white/40 mb-8 hover:scale-105 transition-all duration-300 group">
              <div className="relative">
                <Bed className="w-6 h-6 text-teal-600 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-teal-600 font-bold text-sm tracking-wide">LAYANAN UNGGULAN 24/7</span>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Enhanced Title with Gradient Text */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                Instalasi
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Rawat Inap
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
              Fasilitas rawat inap terdepan dengan teknologi modern, tenaga medis berpengalaman, dan pelayanan 24 jam untuk kesembuhan optimal Anda.
            </p>

            {/* Enhanced Quick Stats with Animations */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-12"
              data-stats="true"
              ref={statsRef}
            >
              <div className={`group bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0s', transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0s' }}>
                <div className="relative">
                  <div className="text-4xl font-black text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {inpatientFacilities.length}
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Unit Instalasi</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className={`group bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.2s', transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s' }}>
                <div className="relative">
                  <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {totalBeds}
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Total Tempat Tidur</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className={`group bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.4s', transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s' }}>
                <div className="relative">
                  <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase tracking-wider">Pelayanan Siaga</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => document.getElementById('fasilitas')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Lihat Fasilitas</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-500"></div>
              </button>
              
              <button 
                onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-teal-400 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative flex items-center gap-3">
                  <Phone className="w-6 h-6 text-teal-600 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Hubungi Sekarang</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search and Filter Section */}
      {isStickySearchVisible && (
        <section className={`py-4 md:py-8 bg-white sticky z-30 shadow-lg border-b border-gray-100 transition-all duration-300 ${
          isHeaderVisible ? 'top-20' : 'top-0'
        }`}>
        <div className="container mx-auto px-4">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-3 md:gap-4 items-center mb-3 md:mb-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Cari unit rawat inap..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-sm md:text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sort and Category Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex bg-gray-100 rounded-lg md:rounded-xl p-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 md:px-3 py-1 rounded-md md:rounded-lg text-xs md:text-sm font-medium bg-white text-gray-900 border-0 focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="relevance">Relevan</option>
                  <option value="az">A-Z</option>
                  <option value="beds_desc">Tempat Tidur Terbanyak</option>
                  <option value="beds_asc">Tempat Tidur Tersedikit</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
            <span>
              Menampilkan {filteredFacilities.length} dari {inpatientFacilities.length} unit
            </span>
          </div>
        </div>
      </section>
      )}

      {/* Main Content */}
      <section id="fasilitas" className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50" data-facilities-section="true">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span className="text-teal-700 font-bold text-sm tracking-wide">FASILITAS TERDEPAN</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Fasilitas Rawat Inap
                <span className="block text-teal-600">Berkelas Dunia</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pilihan unit dengan spesialisasi berbeda untuk kebutuhan medis Anda dengan standar internasional
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-black text-teal-600">{filteredFacilities.length}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unit Tersedia</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bed className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {filteredFacilities.length === 0 ? (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Tidak ada unit yang ditemukan</h3>
              <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau filter kategori Anda</p>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('Semua');
                }}
                className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 md:gap-10">
              {filteredFacilities.map((facility, index) => (
                <article
                  key={facility.id}
                  data-card-index={index}
                  className={`group relative bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100 overflow-hidden transform hover:-translate-y-2 ${
                    visibleCards.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    backgroundImage: `linear-gradient(135deg, white 0%, ${getBackgroundColor(facility.color)} 100%)`
                  }}
                  onMouseEnter={() => setHoveredCard(facility.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} opacity-0 group-hover:opacity-10 transition-all duration-700`}></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
                    <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${facility.color} shadow-lg`}>
                      {facility.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-4 md:p-8 pt-8 md:pt-12">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div className={`relative p-3 md:p-4 rounded-2xl bg-gradient-to-br ${facility.color} text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {facility.icon}
                        {hoveredCard === facility.id && (
                          <div className="absolute -inset-2 bg-white/20 rounded-2xl animate-ping"></div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl md:text-3xl font-black text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                          {facility.beds}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 font-semibold uppercase tracking-wider">
                          Tempat Tidur
                        </div>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 md:mb-6 hidden md:block">
                      {facility.description}
                    </p>

                    {/* Features with Enhanced Design */}
                    <div className="space-y-3 mb-6 md:mb-8">
                      {facility.features.map((feature, idx) => (
                        <div 
                          key={feature} 
                          className={`flex items-center gap-3 group/feature ${
                            idx >= 2 ? 'hidden md:flex' : ''
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="relative">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-teal-500 group-hover/feature:scale-110 transition-transform duration-300" />
                            {hoveredCard === facility.id && (
                              <div className="absolute inset-0 bg-teal-500/30 rounded-full animate-ping"></div>
                            )}
                          </div>
                          <span className="text-xs md:text-sm text-gray-700 font-medium group-hover/feature:text-gray-900 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced CTA Button */}
                    <div className="space-y-3">
                      <a 
                        href="#kontak" 
                        className={`group/btn relative w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r ${facility.color} text-white rounded-2xl font-bold text-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <Phone className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:rotate-12 transition-transform duration-300 relative z-10" />
                        <span className="relative z-10">Hubungi Sekarang</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                        <div className="absolute bottom-0 left-0 h-1 bg-white/40 w-0 group-hover/btn:w-full transition-all duration-500"></div>
                      </a>
                      
                      {/* View Details Button - Hidden on mobile for space */}
                      <button 
                        className="hidden md:flex w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-all duration-300 items-center justify-center gap-2 group/detail"
                        onClick={() => {
                          // You can add a modal or expand functionality here
                          alert(`Detail lengkap untuk ${facility.name} akan segera tersedia`);
                        }}
                      >
                        <Eye className="w-4 h-4 group-hover/detail:scale-110 transition-transform duration-300" />
                        <span>Lihat Detail</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`h-2 bg-gradient-to-r ${facility.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </article>
              ))}
            </div>
          )}

          {/* Enhanced Statistics Section */}
          <div className="mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white relative overflow-hidden" data-hide-search="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Mengapa Memilih Kami?</h3>
                <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
                  Komitmen kami adalah memberikan pelayanan kesehatan terbaik dengan fasilitas modern dan tim profesional
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-teal-400 mb-1 md:mb-2">Terakreditasi</div>
                  <div className="text-xs md:text-sm text-gray-300">Standar Internasional</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-blue-400 mb-1 md:mb-2">50+ Dokter</div>
                  <div className="text-xs md:text-sm text-gray-300">Tim Medis Berpengalaman</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-indigo-400 mb-1 md:mb-2">24/7</div>
                  <div className="text-xs md:text-sm text-gray-300">Layanan Darurat</div>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-lg md:text-2xl font-bold text-purple-400 mb-1 md:mb-2">1000+</div>
                  <div className="text-xs md:text-sm text-gray-300">Pasien Puas per Bulan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Admission Process */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mt-20 md:mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full mb-6">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-bold text-sm tracking-wide">PANDUAN PENDAFTARAN</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Alur Pendaftaran
                <span className="block text-blue-600">Rawat Inap</span>
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Proses mudah dan cepat untuk mendapatkan pelayanan rawat inap terbaik
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Pendaftaran</h4>
                <p className="text-sm text-gray-700 leading-relaxed">Daftar di loket dengan identitas diri, kartu BPJS/asuransi, dan surat rujukan dokter.</p>
              </div>
              
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Evaluasi Dokter</h4>
                <p className="text-sm text-gray-700 leading-relaxed">Penilaian kondisi pasien dan penentuan kebutuhan perawatan yang sesuai.</p>
              </div>
              
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bed className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Pilih Kamar</h4>
                <p className="text-sm text-gray-700 leading-relaxed">Pemilihan tipe kamar rawat inap sesuai ketersediaan dan preferensi Anda.</p>
              </div>
              
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Masuk Perawatan</h4>
                <p className="text-sm text-gray-700 leading-relaxed">Proses administrasi akhir dan pasien siap mendapatkan perawatan medis.</p>
              </div>
            </div>
            
            {/* Process Flow Arrow */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 pointer-events-none">
              <div className="flex justify-between px-16">
                <ArrowRight className="w-8 h-8 text-gray-300" />
                <ArrowRight className="w-8 h-8 text-gray-300" />
                <ArrowRight className="w-8 h-8 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mt-20 md:mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full mb-6">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-bold text-sm tracking-wide">FAQ</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Pertanyaan yang
                <span className="block text-purple-600">Sering Diajukan</span>
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum seputar layanan rawat inap kami
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between px-6 md:px-8 py-6 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300"
                      aria-expanded={open}
                    >
                      <span className="text-left font-bold text-gray-900 text-lg group-hover:text-teal-700 transition-colors duration-300">
                        {item.q}
                      </span>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center transition-all duration-300 ${open ? 'rotate-180 scale-110' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-white" />
                      </div>
                    </button>
                    {open && (
                      <div className="px-6 md:px-8 pb-6 bg-gradient-to-r from-gray-50 to-white">
                        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <p className="text-gray-700 text-base leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div id="kontak" className="mt-20 md:mt-24 relative">
            <div className="bg-gradient-to-br from-teal-500 via-blue-600 to-indigo-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-8">
                  <div className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl group hover:scale-110 transition-transform duration-300">
                    <Award className="w-16 h-16 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                  Butuh Informasi
                  <span className="block">Lebih Lanjut?</span>
                </h3>
                <p className="text-lg md:text-xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
                  Tim customer service profesional kami siap membantu 24/7 untuk pendaftaran, jadwal kunjungan, dan semua kebutuhan layanan rawat inap Anda.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="tel:(0711)414" className="group px-10 py-5 bg-white text-teal-600 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    <div className="relative">
                      <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                    <span>(0711) 414</span>
                  </a>
                  
                  <a href="mailto:rs.bhayangkara.palembang@gmail.com" className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black text-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 flex items-center justify-center gap-4 hover:border-white/50">
                    <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Email Kami</span>
                  </a>
                </div>
              </div>
            </div>
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
              <button type="button" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </button>
              <button type="button" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </button>
              <button type="button" className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
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
                    <button type="button" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group w-full text-left">
                      <ArrowRight className="w-4 h-4 mr-2 text-teal-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item}
                    </button>
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
                        <span>Layanan Darurat 24/7</span>
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
    </div>
  );
};

export default RawatInapPage;