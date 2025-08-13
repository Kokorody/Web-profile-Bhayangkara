'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle
} from 'lucide-react';

const RawatInapPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [isHeaderVisible]);

  // Debounce search query for performance
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

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
          <div className="flex items-center justify-between">
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

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center space-x-2 text-sm">
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

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-3">
                <button
                  onClick={() => {
                    window.location.href = '/';
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  Beranda
                </button>
                <button
                  onClick={() => {
                    window.location.href = '/pelayanan';
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  Pelayanan
                </button>
                <div className="px-4 py-3 text-teal-600 font-semibold bg-teal-50 rounded-lg">
                  Rawat Inap
                </div>
                <hr className="my-2" />
                <a
                  href="tel:(0711)414"
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Hubungi Kami
                </a>
                <a
                  href="https://maps.app.goo.gl/KAVjdZuMNDDQW7Su9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="w-4 h-4" />
                  Lokasi
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-400/20 via-blue-400/10 to-transparent"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 mb-6">
              <Bed className="w-6 h-6 text-teal-600" />
              <span className="text-teal-600 font-semibold text-sm">LAYANAN UNGGULAN</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
              Instalasi Rawat Inap
            </h1>
            
            <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Fasilitas rawat inap lengkap dengan tenaga medis profesional dan pelayanan 24 jam.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/40">
                <div className="text-3xl font-bold text-teal-600 mb-1">{inpatientFacilities.length}</div>
                <div className="text-sm font-semibold text-gray-600">Unit Instalasi</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/40">
                <div className="text-3xl font-bold text-blue-600 mb-1">{totalBeds}</div>
                <div className="text-sm font-semibold text-gray-600">Total Tempat Tidur</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/40">
                <div className="text-3xl font-bold text-indigo-600 mb-1">24/7</div>
                <div className="text-sm font-semibold text-gray-600">Pelayanan</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari unit atau fasilitas (misal: Anak, ICU, VIP)"
                  aria-label="Pencarian unit rawat inap"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100/60 outline-none px-12 py-3 text-sm md:text-base"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm text-gray-600">Urutkan:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm focus:border-teal-400 focus:ring-4 focus:ring-teal-100/60 outline-none"
                >
                  <option value="relevance">Relevan</option>
                  <option value="az">A-Z</option>
                  <option value="beds_desc">Tempat Tidur Terbanyak</option>
                  <option value="beds_asc">Tempat Tidur Tersedikit</option>
                </select>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white border-transparent shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:text-teal-700'
                    }`}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Fasilitas Rawat Inap</h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Pilihan unit dengan spesialisasi berbeda untuk kebutuhan Anda</p>
            </div>
            <div className="text-sm text-gray-500">{filteredFacilities.length} unit ditemukan</div>
          </div>

          {filteredFacilities.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-600">Tidak ada unit yang sesuai pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredFacilities.map((facility, index) => (
                <article
                  key={facility.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Accent background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  {/* Header */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${facility.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {facility.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-xs inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 mb-2">
                          <Shield className="w-3.5 h-3.5 text-teal-600" />
                          {facility.category}
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{facility.beds}</div>
                        <div className="text-sm text-gray-500">Tempat Tidur</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 gap-2">
                      {facility.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a href="#kontak" className={`px-4 py-3 bg-gradient-to-r ${facility.color} text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`}>
                        <span>Hubungi</span>
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href="https://maps.app.goo.gl/KAVjdZuMNDDQW7Su9" target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 transition-colors flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Rute</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Admission Process */}
          <div className="mt-16 md:mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Alur Pendaftaran Rawat Inap</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-1">1. Pendaftaran</div>
                <p className="text-sm text-gray-600">Daftar di loket dengan identitas dan kartu asuransi/rujukan.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-1">2. Evaluasi Dokter</div>
                <p className="text-sm text-gray-600">Penilaian kondisi pasien dan kebutuhan kamar/perawatan.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <Bed className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-1">3. Pilih Kamar</div>
                <p className="text-sm text-gray-600">Pemilihan tipe kamar sesuai ketersediaan dan kebutuhan.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-1">4. Masuk Perawatan</div>
                <p className="text-sm text-gray-600">Proses administrasi akhir dan pasien masuk ke kamar.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 md:mt-20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Pertanyaan yang Sering Diajukan</h3>
            <div className="space-y-3">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between px-4 md:px-6 py-4 bg-white hover:bg-gray-50"
                      aria-expanded={open}
                    >
                      <span className="text-left font-medium text-gray-800">{item.q}</span>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    {open && (
                      <div className="px-4 md:px-6 pb-5 text-sm text-gray-600 bg-gray-50">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div id="kontak" className="mt-16 md:mt-20 bg-gradient-to-br from-teal-500 via-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Butuh Informasi Lebih Lanjut?</h3>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
                Tim customer service kami siap membantu 24/7 untuk pendaftaran, jadwal kunjungan, dan layanan rawat inap lainnya.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:(0711)414" className="group px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>(0711) 414</span>
                </a>
                
                <a href="mailto:rs.bhayangkara.palembang@gmail.com" className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Email Kami</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1440 94" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#005fd4" d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z" />
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