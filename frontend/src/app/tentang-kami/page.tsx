'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        startTime ??= currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const TentangKamiPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Header visibility control with throttling for performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const controlNavbar = () => {
      // Clear previous timeout to throttle the function
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => { 
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY;
          const scrollThreshold = 100; // Minimum scroll distance to trigger hide/show
          
          // Show header when at top of page
          if (currentScrollY < 100) {
            setIsHeaderVisible(true);
          }
          // Hide header when scrolling down (after threshold)
          else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            setIsHeaderVisible(false);
          }
          // Show header when scrolling up
          else if (currentScrollY < lastScrollY) {
            setIsHeaderVisible(true);
          }
          
          setLastScrollY(currentScrollY);
        }
      }, 10); // 10ms throttle for smooth performance
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar, { passive: true });
      return () => {
        window.removeEventListener('scroll', controlNavbar);
        clearTimeout(timeoutId);
      };
    }
  }, [lastScrollY]);

  // Intersection Observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Timeline data
  const timelineData = [
    {
      year: '1960',
      title: 'Pendirian Awal',
      description: 'Balai pengobatan berdiri dengan tenaga medis seorang dokter sipil yang bekerja secara sukarela pada Polri yaitu dr. Ghan Tiju Ham.',
      icon: '🏥'
    },
    {
      year: '1963',
      title: 'Menjadi Poliklinik',
      description: 'Balai Pengobatan Tri Sakti diubah menjadi Poliklinik Dinas Kesehatan Daerah Kepolisian (Dinkesdak) VI.',
      icon: '🏢'
    },
    {
      year: '1972',
      title: 'Era Mayor Pol',
      description: 'Menjadi Seksi Kesehatan Jasmani dibawah Polda Sumatera Selatan tahun 1972, Mayor. Pol. Dr. K.S Pam Budi diganti oleh Mayor. Pol.',
      icon: '👨‍⚕️'
    },
    {
      year: '1975',
      title: 'Pengembangan Fasilitas',
      description: 'Diskesdak VI pindah ke Jalan Jenderal Sudirman Km 4,5 Palembang dengan fasilitas yang lebih lengkap.',
      icon: '🏗️'
    },
    {
      year: '1989',
      title: 'Rumah Sakit Polri',
      description: 'Diresmikan nama Rumah Sakit Polri, kemudian pada tahun 2000 berubah menjadi Rumah Sakit Bhayangkara TK. IV Polda Sumatera.',
      icon: '🏥'
    },
    {
      year: '2001',
      title: 'RS Bhayangkara Modern',
      description: 'Rumah Sakit Bhayangkara TK. IV Polda Sumatera Selatan diresmikan menjadi Rumah Sakit Bhayangkara Polda Sumatera Selatan TK. III.',
      icon: '⭐'
    }
  ];

  // Values data
  const valuesData = [
    {
      title: 'Ramah',
      description: 'Memberikan pelayanan dengan sikap yang hangat dan bersahabat',
      icon: '😊',
      color: 'from-blue-500 to-teal-500'
    },
    {
      title: 'Amanah',
      description: 'Dapat dipercaya dalam menjalankan tugas dan tanggung jawab',
      icon: '🤝',
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'Cekatan',
      description: 'Sigap dan terampil dalam memberikan pelayanan kesehatan',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Empati',
      description: 'Memahami dan merasakan kondisi pasien dengan tulus',
      icon: '❤️',
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="bg-white/95 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-40 border-b border-gray-100/50"
        initial={{ y: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
        }}
      >
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0711-442233</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>rs.bhayangkara@polda-sumsel.go.id</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-300/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-red-100">24/7 Emergency</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center cursor-pointer">
              <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <img
                  src="/images/header.png"
                  alt="RS Bhayangkara Logo"
                  className="h-16 w-auto"
                  loading="eager"
                />
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium">
                Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-teal-600 font-semibold">Tentang Kami</span>
            </nav>

            <button
              className="md:hidden p-3 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 border border-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Header Peek Indicator - Shows when header is hidden */}
      <motion.div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: !isHeaderVisible && lastScrollY > 200 ? 0 : -50,
          opacity: !isHeaderVisible && lastScrollY > 200 ? 1 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: !isHeaderVisible ? 0.7 : 0
        }}
        whileHover={{ y: 10 }}
      >
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-b-xl shadow-lg cursor-pointer">
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-xs font-medium">Menu</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-blue-900 to-slate-900">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/images/herobg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: y1,
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`floating-element-${i}-stable`}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          style={{ opacity }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Tentang Kami
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Mengenal lebih dekat RS Bhayangkara Mohammad Hasan Palembang
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {['profile', 'sejarah', 'visi-misi', 'budaya'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 capitalize"
              >
                {section.replace('-', ' & ')}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-xs mt-2 text-center">Scroll</div>
        </motion.div>
      </section>

      {/* Navigation Sidebar */}
      <motion.div
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
        initial={{ x: 0, opacity: 1 }}
        animate={{ 
          x: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0.3
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ 
          x: 0, 
          opacity: 1,
          transition: { duration: 0.2 }
        }}
      >
        <nav className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4 space-y-4">
          {[
            { id: 'profile', label: 'Profile', icon: '🏥' },
            { id: 'sejarah', label: 'Sejarah', icon: '📚' },
            { id: 'visi-misi', label: 'Visi & Misi', icon: '🎯' },
            { id: 'budaya', label: 'Budaya & Motto', icon: '💎' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Navigation Peek Indicator - Shows when sidebar is hidden */}
      <motion.div
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
        initial={{ x: -50, opacity: 0 }}
        animate={{ 
          x: !isHeaderVisible ? 0 : -50,
          opacity: !isHeaderVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: !isHeaderVisible ? 0.5 : 0 // Slight delay when appearing
        }}
        whileHover={{ x: 10 }}
      >
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-3 rounded-r-xl shadow-lg cursor-pointer">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Section */}
      <section id="profile" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.1)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Profile Rumah Sakit
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              RS Bhayangkara Mohammad Hasan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rumah sakit yang melayani dengan ikhlas dan profesional, memberikan pelayanan kesehatan terbaik untuk anggota Polri dan masyarakat umum.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Komitmen Kami
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kami melayani dengan Ikhlas dan Profesional, selain memberikan pelayanan kesehatan kepada Anggota Polri, 
                  RS Bhayangkara Palembang juga melayani pasien umum BPJS. Didukung oleh tenaga kesehatan yang Profesional, 
                  Terlatih dan Berpengalaman.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🏥</span>
                  Fasilitas Modern
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RS Bhayangkara Palembang memiliki peralatan canggih terkini dan terakreditasi seperti CT Scan, 
                  Ruang operasi dengan Sistem MOT (Modular Operating System), serta peralatan medis modern lainnya.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about.jpg"
                  alt="RS Bhayangkara"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h4 className="text-2xl font-bold mb-2">Pelayanan Prima</h4>
                  <p className="text-gray-200">Untuk kesehatan yang lebih baik</p>
                </div>
              </div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-teal-600">
                      <AnimatedCounter end={60} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600">Tahun Melayani</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      <AnimatedCounter end={24} suffix="/7" />
                    </div>
                    <div className="text-sm text-gray-600">Jam Operasional</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'terakreditasi',
                icon: '🎖️',
                title: 'Terakreditasi',
                description: 'Standar pelayanan kesehatan yang telah terakreditasi dan terpercaya'
              },
              {
                id: 'tenaga-profesional',
                icon: '👨‍⚕️',
                title: 'Tenaga Profesional',
                description: 'Dokter spesialis dan tenaga medis yang berpengalaman dan terlatih'
              },
              {
                id: 'pelayanan-lengkap',
                icon: '💊',
                title: 'Pelayanan Lengkap',
                description: 'Layanan medis lengkap dari pencegahan hingga pengobatan spesialis'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section id="sejarah" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.1)_0%,_transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Perjalanan Sejarah
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Lebih dari 60 Tahun Melayani
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dari balai pengobatan sederhana hingga menjadi rumah sakit modern yang terpercaya
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-teal-500 to-blue-500 h-full hidden lg:block"></div>

            <div className="space-y-16">
              {timelineData.map((item) => (
                <motion.div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    timelineData.indexOf(item) % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: timelineData.indexOf(item) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1">
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="text-2xl font-bold text-teal-400">{item.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:block relative z-20">
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-lg"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: timelineData.indexOf(item) * 0.1 }}
                    />
                  </div>

                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section id="visi-misi" className="py-24 bg-gradient-to-br from-white via-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.1)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Visi & Misi
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Arah & Tujuan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Komitmen kami dalam memberikan pelayanan kesehatan yang berkualitas dan terpercaya
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Visi */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-8 text-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      👁️
                    </div>
                    <h3 className="text-3xl font-bold">Visi</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <p className="text-lg leading-relaxed">
                      Mewujudkan Rumah Sakit yang profesional dan terpercaya dibidang kedokteran kepolisian dan pelayanan kesehatan 
                      guna mendukung Provinsi Sumatera Selatan yang aman dan tertib.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Misi */}
            <motion.div
              className="group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-3xl p-8 text-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                      🎯
                    </div>
                    <h3 className="text-3xl font-bold">Misi</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 space-y-4">
                    {[
                      'Menyelenggarakan Kedokteran Kepolisian yang professional guna mendukung tugas Polri dalam memelihara kamtibmas dan menegakkan hukum.',
                      'Menyelenggarakan pelayanan kesehatan prima dan paripurna yang berorientasi pada keselamatan dan kepuasan pasien.',
                      'Menambah sarana dan prasarana untuk meningkatkan kualitas pelayanan.',
                      'Membangun kemitraan dan jejaring kerja.',
                      'Meningkatkan kemampuan SDM melalui pelatihan.',
                      'Mengembangkan sistem informasi dan teknologi medis terkini.'
                    ].map((item, itemIndex) => (
                      <motion.div
                        key={`misi-${itemIndex}-${item.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '-')}`}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Budaya & Motto Section */}
      <section id="budaya" className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.1)_0%,_transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Budaya & Motto
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Nilai-Nilai yang Kami Junjung
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Budaya kerja dan motto yang menjadi pedoman dalam memberikan pelayanan terbaik
            </p>
          </motion.div>

          {/* Budaya Section */}
          <div className="mb-20">
            <motion.h3
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Budaya Rumah Sakit
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuesData.map((value) => (
                <motion.div
                  key={value.title}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: valuesData.indexOf(value) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Motto Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-8">Motto Rumah Sakit</h3>
              <motion.div
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                "Siap Melayani dengan Ikhlas dan Profesional"
              </motion.div>
              <p className="text-xl text-gray-200 leading-relaxed">
                Komitmen kami untuk selalu memberikan pelayanan kesehatan terbaik dengan dedikasi tinggi dan keahlian profesional
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Home Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Siap Melayani Anda</h3>
            <p className="text-xl mb-8 text-gray-200">
              Hubungi kami untuk informasi lebih lanjut atau kunjungi langsung RS Bhayangkara
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Beranda
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: lastScrollY > 200 ? 1 : 0, 
          scale: lastScrollY > 200 ? 1 : 0,
          y: isHeaderVisible ? 0 : -10
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default TentangKamiPage;
