"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Ear,
  Eye,
  Scissors,
  UserCheck,
  Droplets,
  Shield,
  Activity,
  Plus,
  ChevronDown,
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react';

interface PoliService {
  id: number;
  name: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  services: string[];
  availability: string;
}

interface ServiceCardProps {
  service: PoliService;
  index: number;
  expandedCard: number | null;
  setExpandedCard: (id: number | null) => void;
  viewMode: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, expandedCard, setExpandedCard, viewMode }) => {
  const Icon = service.icon;
  const isExpanded = expandedCard === service.id;

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
        viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
      } ${isExpanded ? 'scale-105 z-10' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className={`relative z-10 ${viewMode === 'list' ? 'flex items-center gap-6 flex-1' : ''}`}>
        {/* Icon */}
        <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
              {service.name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
          
          <p className={`text-gray-600 mb-4 leading-relaxed ${viewMode === 'list' ? 'line-clamp-2' : ''}`}>
            {service.description}
          </p>

          {/* Services List */}
          {(viewMode === 'grid' || isExpanded) && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                <Plus className="w-4 h-4 mr-1 text-teal-500" />
                Layanan Tersedia:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.services.map((srv: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100">
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1 text-teal-500" />
              <span className="font-medium">{service.availability}</span>
            </div>
            
            <button 
              onClick={() => setExpandedCard(isExpanded ? null : service.id)}
              className="flex items-center text-teal-600 hover:text-teal-700 transition-colors duration-200 font-medium"
            >
              {isExpanded ? 'Tutup' : 'Lihat Detail'}
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

const RawatInapPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const poliServices = [
    {
      id: 1,
      name: "Poli Penyakit Dalam",
      description: "Konsultasi dokter spesialis penyakit dalam",
      icon: Stethoscope,
      category: "internal",
      color: "from-red-500 to-pink-500",
      services: ["Konsultasi Spesialis", "Pemeriksaan Komprehensif", "Follow-up Treatment"],
      availability: "24/7"
    },
    {
      id: 2,
      name: "Poli Syaraf",
      description: "Konsultasi dokter spesialis syaraf, pemeriksaan cranium, pemeriksaan reflek patela, saraf kranial i, ii, iii, iv, v, vi, vii, ix, x, xi",
      icon: Brain,
      category: "neurologi",
      color: "from-purple-500 to-indigo-500",
      services: ["Konsultasi Neurologi", "Pemeriksaan Cranium", "Tes Reflek Patela", "Evaluasi Saraf Kranial"],
      availability: "Senin-Sabtu"
    },
    {
      id: 3,
      name: "Poli Anak",
      description: "Konsultasi dokter spesialis anak, imunisasi",
      icon: Baby,
      category: "pediatric",
      color: "from-green-500 to-emerald-500",
      services: ["Konsultasi Pediatrik", "Program Imunisasi", "Tumbuh Kembang Anak"],
      availability: "24/7"
    },
    {
      id: 4,
      name: "Poli THT",
      description: "Konsultasi dokter spesialis THT, pemeriksaan cerumen plug, pemeriksaan pengambilan corpus alienum di telinga dan hidung",
      icon: Ear,
      category: "tht",
      color: "from-orange-500 to-red-500",
      services: ["Konsultasi THT", "Pembersihan Cerumen", "Ekstraksi Benda Asing"],
      availability: "Senin-Jumat"
    },
    {
      id: 5,
      name: "Poli Mata",
      description: "Konsultasi dokter spesialis mata, pemeriksaan visus, buta warna, auto ref dan slit lamp",
      icon: Eye,
      category: "mata",
      color: "from-blue-500 to-cyan-500",
      services: ["Konsultasi Oftalmologi", "Tes Visus", "Tes Buta Warna", "Pemeriksaan Slit Lamp"],
      availability: "Senin-Sabtu"
    },
    {
      id: 6,
      name: "Poli Bedah",
      description: "Konsultasi dokter spesialis bedah, perawatan luka, angkat jahitan, ganti verban dan balutan, ekstraksi kuku (cabut kuku)",
      icon: Scissors,
      category: "bedah",
      color: "from-teal-500 to-green-500",
      services: ["Konsultasi Bedah", "Perawatan Luka", "Minor Surgery", "Post-op Care"],
      availability: "24/7"
    },
    {
      id: 7,
      name: "Poli Kandungan",
      description: "Konsultasi dokter kandungan, pemeriksaan kehamilan, pasang/lepas iud, usg 4 dimensi",
      icon: Heart,
      category: "kandungan",
      color: "from-pink-500 to-rose-500",
      services: ["Konsultasi ObGyn", "Pemeriksaan Kehamilan", "Kontrasepsi IUD", "USG 4D"],
      availability: "24/7"
    },
    {
      id: 8,
      name: "Poli Paru",
      description: "Pemeriksaan Spirometri",
      icon: Droplets,
      category: "paru",
      color: "from-indigo-500 to-purple-500",
      services: ["Pemeriksaan Spirometri", "Konsultasi Pulmonologi"],
      availability: "Senin-Jumat"
    },
    {
      id: 9,
      name: "Poli Kulit dan Kelamin",
      description: "Cauter, Skin Care",
      icon: Shield,
      category: "kulit",
      color: "from-yellow-500 to-orange-500",
      services: ["Cauter Treatment", "Skin Care", "Dermatologi Konsultasi"],
      availability: "Senin-Sabtu"
    },
    {
      id: 10,
      name: "Poli Kejiwaan",
      description: "MMPI",
      icon: Brain,
      category: "psikiatri",
      color: "from-violet-500 to-purple-500",
      services: ["MMPI Testing", "Konsultasi Psikiatri"],
      availability: "Senin-Jumat"
    },
    {
      id: 11,
      name: "Poli Jantung",
      description: "Treadmill, Echo dan EKG",
      icon: Activity,
      category: "jantung",
      color: "from-red-500 to-rose-500",
      services: ["Treadmill Test", "Echocardiography", "EKG"],
      availability: "Senin-Sabtu"
    },
    {
      id: 12,
      name: "Poli MCU",
      description: "Surat keterangan sehat, surat keterangan kesehatan rohani, surat keterangan bebas narkoba",
      icon: UserCheck,
      category: "mcu",
      color: "from-emerald-500 to-teal-500",
      services: ["Medical Check-Up", "Surat Keterangan Sehat", "Tes Bebas Narkoba"],
      availability: "Senin-Sabtu"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Poli', count: poliServices.length },
    { id: 'internal', name: 'Penyakit Dalam', count: 1 },
    { id: 'bedah', name: 'Bedah', count: 4 },
    { id: 'pediatric', name: 'Anak', count: 1 },
    { id: 'kandungan', name: 'Kandungan', count: 1 },
    { id: 'neurologi', name: 'Neurologi', count: 2 },
    { id: 'jantung', name: 'Jantung', count: 1 },
    { id: 'mcu', name: 'MCU', count: 1 }
  ];

  const filteredServices = poliServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== (scrollY > lastScrollY ? "down" : "up") && Math.abs(scrollY - lastScrollY) > 10) {
        setIsHeaderVisible(direction === "up" || scrollY < 100);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
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
              <a 
                href="mailto:rs.bhayangkara.palembang@gmail.com"
                className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">rs.bhayangkara.palembang@gmail.com</span>
              </a>
              <a 
                href="tel:(0711)414"
                className="flex items-center hover:text-yellow-200 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-medium">(0711) 414</span>
              </a>
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* PELAYANAN with Dropdown */}
              <div className="relative group">              
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <Link
                      href="/pelayanan-poli"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-teal-600 bg-teal-50 border border-teal-100 transition-colors duration-200"
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
            </nav>

            {/* Breadcrumb - Hidden on smaller screens to make room for navigation */}
            <nav className="hidden xl:flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
                Beranda
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
                Pelayanan
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-teal-600 font-semibold">Pelayanan Poli</span>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-xl bg-gray-50 hover:bg-teal-50 transition-colors duration-200 border border-gray-200"
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

          {/* Mobile Menu */}
          <div className={`lg:hidden mt-4 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200 font-medium"
              >
                Beranda
              </Link>
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500">Pelayanan</div>
                <Link
                  href="/pelayanan-poli"
                  className="block px-6 py-2 rounded-lg text-teal-600 bg-teal-50 border border-teal-100 font-medium"
                >
                  Pelayanan Poli
                </Link>
                <Link
                  href="/rawat-inap"
                  className="block px-6 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                >
                  Rawat Inap
                </Link>
                <Link
                  href="/penunjang-medis"
                  className="block px-6 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                >
                  Penunjang Medis
                </Link>
                <Link
                  href="/perawatan-umum"
                  className="block px-6 py-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                >
                  Perawatan Umum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-white"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4 mr-2" />
              Pelayanan Poliklinik Spesialis
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Pelayanan Poli
              </span>
              <br />
              <span className="text-gray-800">Spesialis</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Layanan poliklinik spesialis terlengkap dengan dokter berpengalaman dan fasilitas medis modern 
              untuk memenuhi kebutuhan kesehatan Anda dan keluarga dengan pelayanan berkualitas tinggi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Daftar Poli
                </span>
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500">Informasi & Pendaftaran</div>
                <div className="font-bold text-teal-600">(0711) 414855</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari poli atau layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors duration-200 shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors duration-200 shadow-sm"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredServices.length} Poli Ditemukan
              </h2>
              {searchTerm && (
                <p className="text-gray-600">
                  Hasil pencarian untuk "{searchTerm}"
                </p>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Menampilkan {filteredServices.length} dari {poliServices.length} poli
            </div>
          </div>

          {/* Services Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                expandedCard={expandedCard} 
                setExpandedCard={setExpandedCard} 
                viewMode={viewMode} 
              />
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada hasil ditemukan</h3>
              <p className="text-gray-500 mb-4">Coba gunakan kata kunci yang berbeda atau pilih kategori lain</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors duration-200"
              >
                Reset Filter
              </button>
            </div>
          )}
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
              <button className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
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
                    <button className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group">
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
    </div>
  );
};

export default RawatInapPage;