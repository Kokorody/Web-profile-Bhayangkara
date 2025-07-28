'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Calendar, Clock, Users, Award, ChevronRight, Star } from 'lucide-react';

const HospitalWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Mock data based on the original website
  const doctors = [
    {
      id: 1,
      name: "KOMBES POL Dr. BUDI SUSANTO, Sp.BS",
      specialization: "KARUM KIT BHAYANGKARA M. HASAN PALEMBANG",
      role: "DOKTER SPESIALIS PENYAKIT KANDUNGAN OBSTETRI DAN GINEKOLOGI (OBGYN)",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "AKBP DR. ANDRIANTO, SPOG",
      specialization: "DOKTER SPESIALIS PENYAKIT KANDUNGAN OBSTETRI DAN GINEKOLOGI (OBGYN)",
      role: "Spesialis Kandungan",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "IPTU dr. IRMA YENNI, Sp.A",
      specialization: "DOKTER SPESIALIS ANAK",
      role: "Spesialis Anak",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      name: "iptu Dr AFRIYANTO RIDHWAN, Sp.THT-KL., MARs",
      specialization: "DOKTER SPESIALIS TELINGA HIDUNG TENGGOROKAN (THT)",
      role: "Spesialis THT",
      image: "/api/placeholder/200/200"
    }
  ];

  const services = [
    {
      icon: "💊",
      title: "Perawatan Medis",
      description: "Memberikan perawatan medis yang berkualitas dan efektif untuk memastikan pemulihan pasien dengan pendekatan yang holistik."
    },
    {
      icon: "🚑",
      title: "Bantuan Darurat",
      description: "Layanan darurat yang siap 24 jam untuk menangani kondisi medis kritis dengan cepat dan tanggap."
    },
    {
      icon: "🩺",
      title: "Dokter Berkualifikasi",
      description: "Tim medis kami terdiri dari dokter berkualifikasi tinggi yang berpengalaman, memberikan layanan terdepan kepada pasien."
    },
    {
      icon: "🏥",
      title: "Profesional Medis",
      description: "Kami memastikan seluruh tenaga medis bekerja dengan penuh profesionalisme, menjamin kualitas layanan yang optimal."
    }
  ];

  const news = [
    {
      id: 1,
      title: "Bakti Kesehatan RS Bhayangkara M Hasan Palembang",
      excerpt: "Dalam rangka memperingati Hari Bhayangkara ke-78, RS Bhayangkara M. Hasan Palembang turut serta menyemarakkan...",
      date: "14 Jun 2025",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Memperingati Hari Lahir Pancasila",
      excerpt: "Kepala Rumah Sakit Bhayangkara Palembang, KBP. Dr. dr. BUDI SUSANTO, Sp.BS, GHLA, beserta Ibu Ny. Aryanti Budi, dan seluruh...",
      date: "01 Jun 2025",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Polda Sumsel menggelar Bazar & Olahraga",
      excerpt: "Dalam rangka memperingati Hari Ulang Tahun ke-45 YKB, Polda Sumsel menggelar Bazar & Olahraga Senam pada Sabtu, 23...",
      date: "18 May 2025",
      image: "/api/placeholder/300/200"
    }
  ];

  const testimonials = [
    {
      name: "Ahmad Fauzi",
      role: "Pasien Umum",
      message: "Pelayanan di rumah sakit ini sangat memuaskan. Dokter dan perawat sangat profesional dan ramah. Saya merasa nyaman selama perawatan.",
      rating: 5
    },
    {
      name: "Sobri (Uduk)",
      role: "Pasien BPJS",
      message: "Proses administrasi cepat dan tidak berbelit-belit. Fasilitas rumah sakit juga lengkap dan bersih. Kasih nilai terbaik untuk pelayanan terbaiknya.",
      rating: 5
    },
    {
      name: "Rian Novaria Ncu",
      role: "Keluarga Pasien",
      message: "Dokter sangat informatif dalam menjelaskan kondisi pasien. Perawat juga sangat perhatian dan selalu siap membantu. Ruangan bersih dan nyaman.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-teal-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                rs.bhayangkara.palembang@gmail.com
              </span>
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                (0711) 414
              </span>
            </div>
            <button className="bg-teal-700 px-3 py-1 rounded text-sm hover:bg-teal-800 transition-colors">
              Masuk
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/images/header.png" 
                alt="RS Bhayangkara Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['HOME', 'ABOUT', 'VISI DAN MISI', 'GALERI', 'POLI', 'JADWAL'].map((item) => (
                <button
                  key={item}
                  className={item === 'HOME' 
                    ? 'px-4 py-2 rounded transition-colors bg-teal-600 text-white'
                    : 'px-4 py-2 rounded transition-colors text-gray-700 hover:text-teal-600'}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {['HOME', 'ABOUT', 'VISI DAN MISI', 'GALERI', 'POLI', 'JADWAL'].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-animate="true" className="opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Pelayanan Kesehatan Terdepan untuk Anda
              </h2>
              <p className="text-xl mb-8 opacity-90">
                RS Bhayangkara Mohammad Hasan Palembang memberikan layanan kesehatan berkualitas dengan teknologi modern dan tenaga medis profesional.
              </p>
              <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                Pelajari Lebih Lanjut
              </button>
            </div>
            <div data-animate="true" className="opacity-0 translate-x-8 transition-all duration-700 ease-out">
              {isMounted && (
                <img
                  src="/images/by1.jpg"
                  alt="Hospital Building"
                  className="rounded-lg shadow-2xl w-full h-auto"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-teal-600 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Berita Klinik</h3>
              <p className="text-sm opacity-90 mb-4">Kunjungan Kerja Dinkes Kota Palembang dan dinkes Provinsi ke Rumah Sakit Bhayangkara | 28 Maret 2021 | 15:56:29</p>
              <button className="bg-white text-teal-600 px-4 py-2 rounded text-sm font-semibold">
                iqro more
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Dokter</h3>
              <p className="text-gray-600 text-sm mb-4">Dokter terbaik di Bhayangkara selalu memberikan profesionalisme, memberikan pelayanan medis yang berkualitas, serta penuh perhatian terhadap kesejahteraan.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Layanan 24 Jam</h3>
              <p className="text-gray-600 text-sm mb-4">Layanan 24 jam di Bhayangkara hadir untuk memberikan perawatan medis terbaik kapan saja, memastikan pasien mendapatkan bantuan secepat mungkin.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Jam Buka</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>9:30 - 17:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>9:30 - 15:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-100/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center relative">
            <div className="space-y-8 relative z-10">
              <div className="relative px-6 py-8 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-teal-100 rounded-full opacity-50 blur-xl animate-pulse"></div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl animate-pulse delay-700"></div>
                <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-6 py-2 rounded-full inline-block shadow-sm border border-teal-100 hover:shadow-md transition-all relative">
                  <span className="absolute inset-0 bg-white/50 rounded-full blur"></span>
                  <span className="relative">Tentang Kami</span>
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">Memberikan Pelayanan Kesehatan <span className="text-teal-600">Terbaik</span> Untuk Anda</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  RS Bhayangkara Mohammad Hasan Palembang telah melayani masyarakat dengan dedikasi tinggi dan komitmen untuk memberikan pelayanan kesehatan terbaik.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
                <div className="space-y-4 relative">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-1 bg-gradient-to-b from-teal-600 to-blue-600 rounded-full transform group-hover:scale-y-110 transition-transform duration-300"></div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Visi</h3>
                  </div>
                  <p className="text-gray-600 pl-8 group-hover:text-gray-800 transition-colors duration-300">
                    Terwujudnya Pelayanan Kesehatan Paripurna yang Prima dan Unggul di Bidang Kedokteran Kepolisian.
                  </p>
                </div>

                <div className="space-y-4 relative">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-1 bg-gradient-to-b from-teal-600 to-blue-600 rounded-full transform group-hover:scale-y-110 transition-transform duration-300"></div>
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Misi</h3>
                  </div>
                  <div className="pl-8">
                    <ul className="space-y-3">
                      {[
                        "Menyelenggarakan pelayanan kesehatan yang profesional, bermutu, akuntabel, dan humanis",
                        "Mengembangkan kualitas SDM secara profesional",
                        "Melengkapi sarana prasarana dan teknologi modern",
                        "Membangun kemitraan lintas sektoral",
                        "Mendukung tugas operasional kepolisian",
                        "Meningkatkan layanan kedokteran kepolisian",
                        "Meningkatkan kesejahteraan pegawai"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                            <ChevronRight className="w-4 h-4 text-teal-600" />
                          </div>
                          <span className="text-gray-600 flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative mt-12 md:mt-0">
              {/* Background decorative elements */}
              <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full opacity-40 animate-pulse blur-2xl"></div>
              <div className="absolute top-1/4 -right-8 w-40 h-40 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-30 animate-pulse delay-150 blur-xl"></div>
              <div className="absolute -bottom-12 -right-12 w-60 h-60 bg-gradient-to-br from-teal-200 to-blue-100 rounded-full opacity-30 animate-pulse delay-300 blur-xl"></div>
              <div className="absolute top-1/3 -left-8 w-32 h-32 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full opacity-40 animate-pulse delay-500 blur-lg"></div>
              
              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-white to-teal-50 p-6 rounded-3xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-3xl"></div>
                <img
                  src="/images/about.jpg"
                  alt="Hospital Facility"
                  className="rounded-2xl shadow-xl relative z-10 transform group-hover:scale-105 transition-transform duration-300 w-full h-[400px] object-cover"
                  loading="lazy"
                />
                
                {/* Stats cards */}
                <div className="absolute -bottom-8 -left-8 grid grid-cols-2 gap-6 z-20">
                  <div className="bg-white/95 backdrop-blur p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-teal-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg">
                        <Clock className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">24/7</h4>
                        <p className="text-sm text-gray-600">Layanan Darurat</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-teal-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">100+</h4>
                        <p className="text-sm text-gray-600">Tenaga Medis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            {services.map((service, index) => (
              <div 
                key={index}
                data-animate="true"
                data-delay={(index * 200).toString()}
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
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-full inline-block shadow-sm border border-teal-100 mb-4">Tim Medis Profesional</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Dokter Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Ditangani oleh dokter spesialis yang berpengalaman dan profesional</p>
            <div className="absolute -top-8 -right-4 w-24 h-24 bg-teal-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={doctor.id}
                data-animate="true"
                data-delay={(index * 200).toString()}
                className="opacity-0 translate-y-8 transition-all duration-700 ease-out group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-teal-400/80 to-blue-500/80 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-32 h-32 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="w-16 h-16 text-teal-600 transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-teal-600 transition-colors">{doctor.name}</h3>
                      <p className="text-teal-600 text-sm font-semibold">{doctor.specialization}</p>
                      <p className="text-gray-600 text-sm">{doctor.role}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <button className="text-teal-600 text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Lihat Profil
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            {news.map((article) => (
              <div 
                key={article.id}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-teal-400 to-blue-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-teal-600 font-medium">{article.date}</div>
                  </div>
                  <div className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
                    <h3 className="font-bold text-gray-800 text-lg mb-3 group-hover:text-teal-600 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Palembang • admin</span>
                      <button className="text-teal-600 text-sm font-medium flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
                        Baca Selengkapnya
                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                  <div className="mb-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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
              <div className="bg-white rounded-lg p-2 inline-block mb-4">
                <img src="/images/header.png" alt="RS Bhayangkara" className="h-12" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tenaga medis profesional untuk masyarakat Indonesia.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">Menu Utama</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Visi dan Misi', 'Galeri', 'Poli', 'Jadwal'].map((item) => (
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
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Layanan Darurat 24/7</h4>
                  <p className="text-sm opacity-90">Kami siap melayani keadaan darurat 24 jam sehari, 7 hari seminggu</p>
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

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Rumah Sakit Bhayangkara Mohammad Hasan Palembang. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalWebsite;