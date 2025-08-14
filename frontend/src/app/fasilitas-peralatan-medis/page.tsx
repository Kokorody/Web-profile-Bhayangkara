'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Zap, 
  Eye, 
  Heart, 
  Microscope, 
  Shield, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Activity,
  TrendingUp,
  UserCheck,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Search,
  Monitor,
  Scan,
  Cpu,
  Settings,
  Target,
  Brain,
  Bone,
  Dna
} from 'lucide-react';

// Equipment Category Icons
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Radiologi':
      return Scan;
    case 'Laboratorium':
      return Microscope;
    case 'Poli':
      return Stethoscope;
    case 'ICU':
      return Monitor;
    case 'Kamar Operasi':
      return Settings;
    case 'Fisioterapi':
      return Activity;
    case 'Forensik':
      return Shield;
    default:
      return Monitor;
  }
};

// Equipment Modal Component
const EquipmentModal = ({ isOpen, onClose, equipment }: {
  isOpen: boolean;
  onClose: () => void;
  equipment: any;
}) => {
  if (!isOpen || !equipment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={equipment.image}
              alt={equipment.name}
              className="w-full h-64 object-cover"
            />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${equipment.categoryColor}`}>
                <equipment.categoryIcon className="w-4 h-4" />
                {equipment.category}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{equipment.name}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{equipment.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Lokasi</div>
                <div className="font-semibold text-gray-800">{equipment.location}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-600">Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Equipment Card Component
const EquipmentCard = ({ equipment, index }: { equipment: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* Equipment Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${equipment.categoryColor}`}>
            <equipment.categoryIcon className="w-4 h-4 inline mr-1" />
            {equipment.category}
          </div>
          
          {/* View Details Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <ZoomIn className="w-5 h-5" />
          </motion.div>

          {/* Status Indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">Aktif</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300">
            {equipment.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
            {equipment.description}
          </p>
          
          {/* Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{equipment.location}</span>
            </div>
            <div className="text-teal-600 font-semibold text-sm">
              Lihat Detail →
            </div>
          </div>
        </div>
      </motion.div>

      {/* Equipment Modal */}
      <EquipmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        equipment={equipment}
      />
    </>
  );
};

// Stats Component
const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true });

  const stats = [
    { icon: Monitor, value: 50, label: "Peralatan Medis", suffix: "+" },
    { icon: Stethoscope, value: 15, label: "Kategori Alat", suffix: "+" },
    { icon: Star, value: 99, label: "Akurasi Diagnosa", suffix: "%" },
    { icon: Clock, value: 24, label: "Layanan", suffix: "/7" }
  ];

  return (
    <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Peralatan Medis Terdepan
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Teknologi canggih untuk diagnosis dan perawatan terbaik
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FasilitasPeralatanMedisPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Header visibility control
  useEffect(() => {
    setIsMounted(true);
    
    let lastScrollYRef = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollYRef || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
      
      lastScrollYRef = currentScrollY;
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Medical Equipment data
  const medicalEquipment = [
    {
      name: "CT Scan 16 Slice",
      description: "Pemindaian tomografi komputer canggih dengan 16 slice untuk diagnosis cepat dan akurat pada berbagai kondisi medis.",
      image: "/images/kamar-kelas-vip.jpg",
      category: "Radiologi",
      categoryIcon: Scan,
      categoryColor: "bg-blue-500",
      location: "Ruang Radiologi"
    },
    {
      name: "USG Abdomen",
      description: "Ultrasonografi abdomen untuk pemeriksaan organ dalam perut dengan teknologi imaging terdepan.",
      image: "/images/kamar-kelas-vvip.jpg",
      category: "Radiologi",
      categoryIcon: Scan,
      categoryColor: "bg-blue-500",
      location: "Ruang Radiologi"
    },
    {
      name: "X-Ray Photo Thorax",
      description: "Pemeriksaan rontgen dada untuk diagnosis penyakit paru-paru dan jantung dengan hasil gambar berkualitas tinggi.",
      image: "/images/kamar-kelas-1.jpg",
      category: "Radiologi",
      categoryIcon: Scan,
      categoryColor: "bg-blue-500",
      location: "Ruang Radiologi"
    },
    {
      name: "Panoramic Gigi",
      description: "Pemeriksaan radiologi panoramik untuk mendapatkan gambaran lengkap struktur gigi dan rahang.",
      image: "/images/kamar-kelas-2.jpg",
      category: "Radiologi",
      categoryIcon: Scan,
      categoryColor: "bg-blue-500",
      location: "Ruang Radiologi"
    },
    {
      name: "Autoref Mata",
      description: "Alat pemeriksaan refraksi otomatis untuk mendeteksi gangguan penglihatan dan kelainan mata.",
      image: "/images/kamar-kelas-3.jpg",
      category: "Poli",
      categoryIcon: Eye,
      categoryColor: "bg-green-500",
      location: "Poli Mata"
    },
    {
      name: "USG 4 Dimensi",
      description: "USG 4D untuk pemeriksaan kehamilan dengan visualisasi real-time yang detail dan jelas.",
      image: "/images/kamar-kelas-ps.jpg",
      category: "Poli",
      categoryIcon: Stethoscope,
      categoryColor: "bg-green-500",
      location: "Ruang Kebidanan"
    },
    {
      name: "Vique Mata",
      description: "Peralatan canggih untuk pemeriksaan mata komprehensif dan diagnosis kelainan mata.",
      image: "/images/kamar-kelas-vip.jpg",
      category: "Poli",
      categoryIcon: Eye,
      categoryColor: "bg-green-500",
      location: "Poli Mata"
    },
    {
      name: "EKG (Elektrokardiografi)",
      description: "Pemeriksaan jantung untuk merekam aktivitas listrik jantung dan mendeteksi gangguan ritme.",
      image: "/images/kamar-kelas-vvip.jpg",
      category: "Poli",
      categoryIcon: Heart,
      categoryColor: "bg-green-500",
      location: "Poli Jantung"
    },
    {
      name: "Echo Jantung",
      description: "Ekokardiografi untuk melihat struktur dan fungsi jantung secara real-time menggunakan gelombang suara.",
      image: "/images/kamar-kelas-1.jpg",
      category: "Poli",
      categoryIcon: Heart,
      categoryColor: "bg-green-500",
      location: "Ruang Jantung"
    },
    {
      name: "Dental Unit",
      description: "Unit perawatan gigi lengkap dengan teknologi modern untuk berbagai prosedur dental.",
      image: "/images/kamar-kelas-2.jpg",
      category: "Poli",
      categoryIcon: Stethoscope,
      categoryColor: "bg-green-500",
      location: "Poli Gigi"
    },
    {
      name: "Auto Analyzer",
      description: "Alat analisis otomatis untuk pemeriksaan laboratorium dengan akurasi tinggi dan hasil cepat.",
      image: "/images/kamar-kelas-3.jpg",
      category: "Laboratorium",
      categoryIcon: Microscope,
      categoryColor: "bg-purple-500",
      location: "Ruang Laboratorium"
    },
    {
      name: "Swab PCR",
      description: "Fasilitas tes PCR untuk deteksi virus dan patogen dengan teknologi molekuler terkini.",
      image: "/images/kamar-kelas-ps.jpg",
      category: "Laboratorium",
      categoryIcon: Microscope,
      categoryColor: "bg-purple-500",
      location: "Ruang Laboratorium"
    },
    {
      name: "Defibrillator",
      description: "Alat defibrilator untuk penanganan darurat jantung dan resusitasi kardiopulmoner.",
      image: "/images/kamar-kelas-vip.jpg",
      category: "ICU",
      categoryIcon: Zap,
      categoryColor: "bg-red-500",
      location: "Ruang ICU"
    },
    {
      name: "Treadmill",
      description: "Treadmill untuk tes stress jantung dan evaluasi kapasitas kardiovaskular pasien.",
      image: "/images/kamar-kelas-vvip.jpg",
      category: "Poli",
      categoryIcon: Heart,
      categoryColor: "bg-green-500",
      location: "Ruang Jantung"
    },
    {
      name: "Refrigerator Mortuary",
      description: "Lemari pendingin forensik untuk preservasi jenazah dengan kontrol suhu presisi.",
      image: "/images/kamar-kelas-1.jpg",
      category: "Forensik",
      categoryIcon: Shield,
      categoryColor: "bg-gray-500",
      location: "Ruang Forensik"
    },
    {
      name: "Chemistry Analyzer Biosystem 800",
      description: "Analyzer kimia untuk pemeriksaan laboratorium dengan throughput tinggi dan akurasi maksimal.",
      image: "/images/kamar-kelas-2.jpg",
      category: "Laboratorium",
      categoryIcon: Microscope,
      categoryColor: "bg-purple-500",
      location: "Ruang Laboratorium"
    },
    {
      name: "Set Laparascope",
      description: "Peralatan laparoskopi lengkap untuk operasi minimal invasif dengan teknologi HD imaging.",
      image: "/images/kamar-kelas-3.jpg",
      category: "Kamar Operasi",
      categoryIcon: Settings,
      categoryColor: "bg-orange-500",
      location: "Kamar Operasi"
    },
    {
      name: "Short Wave Diathermy",
      description: "Terapi gelombang pendek untuk fisioterapi dan rehabilitasi dengan penetrasi jaringan optimal.",
      image: "/images/kamar-kelas-ps.jpg",
      category: "Fisioterapi",
      categoryIcon: Activity,
      categoryColor: "bg-teal-500",
      location: "Ruang Fisioterapi"
    },
    {
      name: "Audiometer THT",
      description: "Alat pemeriksaan pendengaran untuk diagnosis gangguan telinga, hidung, dan tenggorokan.",
      image: "/images/kamar-kelas-vip.jpg",
      category: "Poli",
      categoryIcon: Stethoscope,
      categoryColor: "bg-green-500",
      location: "Poli THT"
    },
    {
      name: "Electric Cautery",
      description: "Elektrkauter untuk prosedur bedah dengan kontrol panas presisi dan keamanan maksimal.",
      image: "/images/kamar-kelas-vvip.jpg",
      category: "Kamar Operasi",
      categoryIcon: Settings,
      categoryColor: "bg-orange-500",
      location: "Kamar Operasi"
    },
    {
      name: "Immunologi Analyzer",
      description: "Alat analisis imunologi untuk pemeriksaan sistem kekebalan tubuh dan deteksi antibodi.",
      image: "/images/kamar-kelas-1.jpg",
      category: "Laboratorium",
      categoryIcon: Microscope,
      categoryColor: "bg-purple-500",
      location: "Laboratorium"
    }
  ];

  // Filter equipment based on category and search
  const categories = ['Semua', ...Array.from(new Set(medicalEquipment.map(eq => eq.category)))];
  
  const filteredEquipment = medicalEquipment.filter(equipment => {
    const matchesCategory = selectedCategory === 'Semua' || equipment.category === selectedCategory;
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

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
            {/* Logo */}
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
            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/" className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                HOME
              </Link>
              
              <div className="relative group">
                <button className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50 flex items-center gap-2">
                  PELAYANAN
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <div className="relative group/fasilitas">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-teal-50 text-teal-600 cursor-pointer">
                        <span className="text-lg">🏢</span>
                        <div className="flex-1">
                          <div className="font-semibold">Fasilitas</div>
                          <div className="text-xs text-gray-500">Fasilitas rumah sakit lengkap</div>
                        </div>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover/fasilitas:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
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
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 bg-teal-50 text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-lg">🔬</span>
                            <div>
                              <div className="font-semibold">Fasilitas Peralatan Medis</div>
                              <div className="text-xs text-gray-500">Peralatan medis modern</div>
                            </div>
                          </Link>
                          <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-lg">🏥</span>
                            <div>
                              <div className="font-semibold">Fasilitas Rumah Sakit</div>
                              <div className="text-xs text-gray-500">Fasilitas umum & pendukung</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/dokter" className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                DOKTER
              </Link>
              
              <button className="ml-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:from-red-600 hover:to-orange-600 transition-colors duration-200 shadow-lg">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  DARURAT
                </span>
              </button>
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
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 mb-8"
              >
                <Stethoscope className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-gray-700">Teknologi Medis Canggih</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
              >
                Peralatan{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Medis
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              >
                Fasilitas peralatan medis canggih dan terakreditasi untuk mendukung diagnosis akurat 
                dan perawatan berkualitas tinggi dengan teknologi terdepan.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-6 h-6" />
                  Jadwalkan Pemeriksaan
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  Konsultasi
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Equipment Preview Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/kamar-kelas-vip.jpg"
                      alt="CT Scan"
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-semibold">CT Scan 16 Slice</div>
                      <div className="text-sm opacity-80">Radiologi</div>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/kamar-kelas-1.jpg"
                      alt="Laboratorium"
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-semibold text-sm">Lab Auto Analyzer</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4 pt-8"
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/kamar-kelas-ps.jpg"
                      alt="Operating Room"
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-semibold text-sm">Set Laparascope</div>
                    </div>
                  </div>
                  
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/kamar-kelas-vvip.jpg"
                      alt="Echo Jantung"
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="font-semibold">Echo Jantung</div>
                      <div className="text-sm opacity-80">Kardiologi</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Equipment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Peralatan Medis Canggih
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Teknologi terdepan untuk mendukung diagnosis akurat dan perawatan berkualitas tinggi
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari peralatan medis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-80 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Equipment Grid */}
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map((equipment, index) => (
              <EquipmentCard key={index} equipment={equipment} index={index} />
            ))}
          </div>

          {filteredEquipment.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Monitor className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl">Tidak ada peralatan ditemukan</p>
                <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Butuh Pemeriksaan dengan Peralatan Canggih?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang layanan pemeriksaan dan konsultasi medis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                Jadwalkan Pemeriksaan
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                (0711) 414855
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl">
                  <img src="/images/logo-rs-1.png" alt="Logo" className="h-8 w-auto" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">RS Bhayangkara Mohammad Hasan</h3>
                  <p className="text-gray-400">Palembang</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Jl. Demang Lebar Daun No. 1, Palembang</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">(0711) 414855 - 410023</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">rs.bhayangkara.palembang@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Jam Operasional
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Senin - Jumat</span>
                  <span className="font-medium text-gray-300">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sabtu</span>
                  <span className="font-medium text-gray-300">9:30 - 17:30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Minggu</span>
                  <span className="font-medium text-gray-300">9:30 - 15:00</span>
                </div>
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Layanan Darurat 24/7
              </h4>
              <p className="text-sm opacity-90 mb-3">Kami siap melayani keadaan darurat 24 jam sehari</p>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Phone className="w-4 h-4 text-white animate-pulse" />
                <div className="text-sm font-semibold">(0711) 414855</div>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img src="/images/bpjs-kesehatan.png" alt="BPJS Kesehatan" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/images/Kars-Bintang5.png" alt="KARS Bintang 5" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/images/Kementrian-kesehatan.png" alt="Kementerian Kesehatan" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <img src="/images/Logo-Blue-Promise.png" alt="Blue Promise" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Rumah Sakit Bhayangkara Mohammad Hasan Palembang. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FasilitasPeralatanMedisPage;
