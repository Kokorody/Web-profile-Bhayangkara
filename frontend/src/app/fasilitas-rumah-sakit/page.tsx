'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Zap, 
  ArrowUpDown, 
  Trash2, 
  Droplets,
  Wind,
  Car,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  Activity,
  ChevronDown,
  Heart,
  Leaf,
  Recycle,
  WifiIcon,
  Smartphone,
  Camera,
  Mail,
  Phone
} from 'lucide-react';

// Facility Category Icons
const getFacilityIcon = (category: string) => {
  switch (category) {
    case 'Infrastruktur':
      return Building2;
    case 'Utilitas':
      return Zap;
    case 'Transportasi':
      return ArrowUpDown;
    case 'Lingkungan':
      return Leaf;
    case 'Keamanan':
      return Shield;
    case 'Teknologi':
      return Smartphone;
    case 'Pelayanan':
      return Users;
    default:
      return Building2;
  }
};

// Animated Counter Component
const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
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
  }, [isInView, end, duration, hasAnimated]);

  return <span ref={countRef}>{prefix}{count}{suffix}</span>;
};

// Facility Card Component
const FacilityCard = ({ facility, index, isExpanded, onToggle }: {
  facility: any;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-400/10 to-blue-500/10 flex items-center justify-center">
        <facility.icon className="w-8 h-8 text-teal-600" />
      </div>

      <div className="relative p-6">
        {/* Category Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${facility.categoryColor}`}
        >
          <facility.categoryIcon className="w-3 h-3" />
          {facility.category}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
          {facility.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {facility.description}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-4">
          {facility.stats?.map((stat: any, statIdx: number) => (
            <div key={`stat-${facility.id}-${statIdx}`} className="flex items-center gap-1 text-xs text-gray-500">
              <stat.icon className="w-3 h-3" />
              <span>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Expand Button */}
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between w-full p-3 rounded-xl bg-gray-50 hover:bg-teal-50 transition-all duration-300 group/btn"
        >
          <span className="text-sm font-medium text-gray-700 group-hover/btn:text-teal-600">
            {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover/btn:text-teal-600" />
          </motion.div>
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden mt-4"
            >
              <div className="space-y-4">
                {/* Features */}
                {facility.features && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Fitur Utama:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {facility.features.map((feature: string, featureIdx: number) => (
                        <motion.div
                          key={`feature-${facility.id}-${featureIdx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIdx * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 text-teal-500" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {facility.specifications && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Spesifikasi:</h4>
                    <div className="space-y-1">
                      {facility.specifications.map((spec: any, specIdx: number) => (
                        <div key={`spec-${facility.id}-${specIdx}`} className="flex justify-between text-sm">
                          <span className="text-gray-600">{spec.label}:</span>
                          <span className="font-medium text-gray-800">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {facility.benefits && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Manfaat:</h4>
                    <div className="space-y-2">
                      {facility.benefits.map((benefit: string, benefitIdx: number) => (
                        <motion.div
                          key={`benefit-${facility.id}-${benefitIdx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: benefitIdx * 0.1 }}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/5 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

const FasilitasRumahSakitPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

  // Hospital Facilities Data
  const hospitalFacilities = useMemo(() => [
    {
      id: 1,
      title: "Escalator",
      category: "Transportasi",
      categoryIcon: ArrowUpDown,
      categoryColor: "bg-blue-100 text-blue-700",
      icon: ArrowUpDown,
      gradient: "from-blue-400 to-purple-500",
      description: "Escalator atau tangga berjalan untuk kemudahan transportasi vertikal pasien, pengunjung, dan staf medis.",
      features: [
        "Kapasitas 20-25 orang",
        "Kecepatan standar internasional",
        "Sensor keamanan otomatis",
        "Emergency stop button",
        "Handrail dengan pembersih otomatis"
      ],
      specifications: [
        { label: "Kapasitas", value: "20-25 orang" },
        { label: "Kecepatan", value: "0.5 m/s" },
        { label: "Sudut Kemiringan", value: "30°" },
        { label: "Maintenance", value: "24/7" }
      ],
      benefits: [
        "Mengurangi kelelahan pasien dan pengunjung",
        "Meningkatkan mobilitas untuk lansia dan difabel",
        "Efisiensi pergerakan di dalam gedung"
      ],
      stats: [
        { icon: Users, value: "500+ pengguna/hari" },
        { icon: Clock, value: "24/7 operasional" }
      ]
    },
    {
      id: 2,
      title: "Instalasi Listrik",
      category: "Utilitas",
      categoryIcon: Zap,
      categoryColor: "bg-yellow-100 text-yellow-700",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
      description: "Sistem kelistrikan yang andal dengan backup generator untuk memastikan kontinuitas pelayanan medis.",
      features: [
        "Generator backup otomatis",
        "UPS untuk peralatan kritikal",
        "Panel distribusi berlapis",
        "Ground fault protection",
        "Emergency lighting system"
      ],
      specifications: [
        { label: "Kapasitas Generator", value: "2000 KVA" },
        { label: "Voltage", value: "220V/380V" },
        { label: "Backup Time", value: "72 jam" },
        { label: "Response Time", value: "< 10 detik" }
      ],
      benefits: [
        "Kontinuitas operasional 24/7",
        "Keamanan untuk peralatan medis sensitif",
        "Efisiensi energi dengan monitoring real-time"
      ],
      stats: [
        { icon: Activity, value: "99.9% uptime" },
        { icon: Shield, value: "Triple backup" }
      ]
    },
    {
      id: 3,
      title: "Lift Pasien",
      category: "Transportasi",
      categoryIcon: ArrowUpDown,
      categoryColor: "bg-blue-100 text-blue-700",
      icon: ArrowUpDown,
      gradient: "from-blue-400 to-teal-500",
      description: "Lift khusus pasien dengan kapasitas besar dan fitur medis untuk transportasi brankar dan kursi roda.",
      features: [
        "Kapasitas brankar dan kursi roda",
        "Tombol kontrol ketinggian mudah diakses",
        "Interior mudah dibersihkan",
        "Sistem ventilasi khusus",
        "Emergency communication system"
      ],
      specifications: [
        { label: "Kapasitas", value: "2000 kg" },
        { label: "Dimensi Cabin", value: "2.1m x 1.4m" },
        { label: "Kecepatan", value: "1.0 m/s" },
        { label: "Lantai Dilayani", value: "6 lantai" }
      ],
      benefits: [
        "Transportasi pasien yang aman dan nyaman",
        "Akses mudah untuk emergency",
        "Dapat mengangkut peralatan medis berat"
      ],
      stats: [
        { icon: Users, value: "200+ trip/hari" },
        { icon: Heart, value: "Emergency ready" }
      ]
    },
    {
      id: 4,
      title: "Incinerator",
      category: "Lingkungan",
      categoryIcon: Leaf,
      categoryColor: "bg-green-100 text-green-700",
      icon: Trash2,
      gradient: "from-green-400 to-emerald-500",
      description: "Fasilitas pembakaran limbah medis dengan teknologi ramah lingkungan untuk pengelolaan sampah berbahaya.",
      features: [
        "Filter emisi canggih",
        "Kontrol suhu otomatis",
        "Monitoring emisi real-time",
        "Ash handling system",
        "Compliance standar lingkungan"
      ],
      specifications: [
        { label: "Kapasitas", value: "50 kg/jam" },
        { label: "Suhu Operasi", value: "850-1100°C" },
        { label: "Efisiensi", value: "> 99.9%" },
        { label: "Emisi", value: "Below EU standard" }
      ],
      benefits: [
        "Pengelolaan limbah medis yang aman",
        "Mencegah kontaminasi lingkungan",
        "Compliance dengan regulasi kesehatan"
      ],
      stats: [
        { icon: Recycle, value: "1000+ kg/bulan" },
        { icon: Leaf, value: "Eco-friendly" }
      ]
    },
    {
      id: 5,
      title: "IPAL (Instalasi Pengolahan Air Limbah)",
      category: "Lingkungan",
      categoryIcon: Leaf,
      categoryColor: "bg-green-100 text-green-700",
      icon: Droplets,
      gradient: "from-cyan-400 to-blue-500",
      description: "Sistem pengolahan air limbah yang memastikan kualitas air buangan sesuai standar lingkungan.",
      features: [
        "Biological treatment process",
        "Chemical precipitation",
        "Filtration system",
        "Disinfection unit",
        "Sludge treatment facility"
      ],
      specifications: [
        { label: "Kapasitas", value: "100 m³/hari" },
        { label: "BOD Removal", value: "> 95%" },
        { label: "COD Removal", value: "> 90%" },
        { label: "TSS Removal", value: "> 95%" }
      ],
      benefits: [
        "Perlindungan lingkungan hidup",
        "Compliance dengan baku mutu air",
        "Mendukung program green hospital"
      ],
      stats: [
        { icon: Droplets, value: "3000L/jam" },
        { icon: CheckCircle, value: "99% clean" }
      ]
    },
    {
      id: 6,
      title: "Sistem HVAC",
      category: "Utilitas",
      categoryIcon: Wind,
      categoryColor: "bg-purple-100 text-purple-700",
      icon: Wind,
      gradient: "from-purple-400 to-pink-500",
      description: "Sistem Heating, Ventilation, dan Air Conditioning untuk menjaga kualitas udara dan kenyamanan optimal.",
      features: [
        "Central air conditioning",
        "HEPA filtration system",
        "Positive pressure control",
        "Temperature monitoring",
        "Humidity control"
      ],
      specifications: [
        { label: "Coverage Area", value: "15,000 m²" },
        { label: "Air Change Rate", value: "6-12 ACH" },
        { label: "Filter Efficiency", value: "99.97%" },
        { label: "Noise Level", value: "< 45 dB" }
      ],
      benefits: [
        "Kualitas udara bersih dan sehat",
        "Kontrol infeksi yang optimal",
        "Kenyamanan pasien dan staf"
      ],
      stats: [
        { icon: Wind, value: "24/7 fresh air" },
        { icon: Shield, value: "HEPA filtered" }
      ]
    },
    {
      id: 7,
      title: "Parking Area",
      category: "Transportasi",
      categoryIcon: Car,
      categoryColor: "bg-gray-100 text-gray-700",
      icon: Car,
      gradient: "from-gray-400 to-slate-500",
      description: "Area parkir yang luas dan aman untuk kendaraan pasien, pengunjung, dan staf dengan sistem keamanan 24 jam.",
      features: [
        "CCTV monitoring 24/7",
        "Security patrol",
        "Designated spaces for ambulance",
        "Disabled parking spaces",
        "Electronic parking system"
      ],
      specifications: [
        { label: "Total Capacity", value: "500 mobil" },
        { label: "Security Level", value: "24/7" },
        { label: "Disabled Spaces", value: "25 unit" },
        { label: "Ambulance Bay", value: "10 unit" }
      ],
      benefits: [
        "Kemudahan akses ke rumah sakit",
        "Keamanan kendaraan terjamin",
        "Parkir khusus untuk emergency"
      ],
      stats: [
        { icon: Car, value: "500 capacity" },
        { icon: Shield, value: "24/7 security" }
      ]
    },
    {
      id: 8,
      title: "Security System",
      category: "Keamanan",
      categoryIcon: Shield,
      categoryColor: "bg-red-100 text-red-700",
      icon: Shield,
      gradient: "from-red-400 to-rose-500",
      description: "Sistem keamanan terpadu dengan CCTV, access control, dan security personnel untuk menjamin keamanan optimal.",
      features: [
        "CCTV HD di seluruh area",
        "Access card system",
        "Alarm system",
        "Fire detection system",
        "24/7 security personnel"
      ],
      specifications: [
        { label: "CCTV Cameras", value: "200+ units" },
        { label: "Recording Storage", value: "30 hari" },
        { label: "Access Points", value: "50+ doors" },
        { label: "Response Time", value: "< 3 menit" }
      ],
      benefits: [
        "Keamanan pasien dan staf terjamin",
        "Monitoring real-time 24/7",
        "Quick response untuk emergency"
      ],
      stats: [
        { icon: Camera, value: "200+ CCTV" },
        { icon: Clock, value: "24/7 monitoring" }
      ]
    },
    {
      id: 9,
      title: "WiFi & Network Infrastructure",
      category: "Teknologi",
      categoryIcon: Smartphone,
      categoryColor: "bg-indigo-100 text-indigo-700",
      icon: WifiIcon,
      gradient: "from-indigo-400 to-blue-500",
      description: "Infrastruktur jaringan fiber optik dan WiFi berkecepatan tinggi untuk mendukung operasional digital hospital.",
      features: [
        "Fiber optic backbone",
        "Free WiFi untuk pasien",
        "Dedicated network untuk staff",
        "24/7 network monitoring",
        "Redundant internet connection"
      ],
      specifications: [
        { label: "Bandwidth", value: "1 Gbps" },
        { label: "WiFi Coverage", value: "100%" },
        { label: "Access Points", value: "150+ units" },
        { label: "Uptime", value: "99.9%" }
      ],
      benefits: [
        "Konektivitas internet cepat dan stabil",
        "Mendukung telemedicine",
        "Digital hospital ecosystem"
      ],
      stats: [
        { icon: WifiIcon, value: "1000+ users" },
        { icon: Activity, value: "1 Gbps speed" }
      ]
    }
  ], []);

  // Show all facilities
  const filteredFacilities = hospitalFacilities;

  // Toggle card expansion
  const toggleCard = (cardId: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 transform-origin-left z-50"
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
          <div className="flex flex-col items-center space-y-4">
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

            {/* Navigation - Show on both mobile and desktop */}
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors">
                Beranda
              </Link>
              <span className="text-gray-300">/</span>
              <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors">
                Fasilitas
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-teal-600 font-semibold">Fasilitas Rumah Sakit</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-55 pb-16 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-300 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-blue-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300 rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-teal-600 border border-teal-200 mb-6"
            >
              <Building2 className="w-4 h-4" />
              Fasilitas Terlengkap & Modern
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Fasilitas
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                {' '}Rumah Sakit{' '}
              </span>
              Terdepan
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Explore fasilitas lengkap dan modern RS Bhayangkara M. Hasan Palembang yang dirancang 
              untuk memberikan pelayanan kesehatan terbaik dengan standar internasional.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { id: 'facilities', label: 'Total Fasilitas', value: hospitalFacilities.length, suffix: '+' },
                { id: 'categories', label: 'Kategori', value: 7, suffix: '' },
                { id: 'uptime', label: 'Uptime', value: 99, suffix: '%' },
                { id: 'years', label: 'Tahun Beroperasi', value: 25, suffix: '+' }
              ].map((stat, statIndex) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + statIndex * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Fasilitas
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                {' '}Unggulan{' '}
              </span>
              Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Setiap fasilitas dirancang dengan teknologi terdepan dan standar keamanan tertinggi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                index={index}
                isExpanded={expandedCards.has(facility.id)}
                onToggle={() => toggleCard(facility.id)}
              />
            ))}
          </div>

          {filteredFacilities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Fasilitas</h3>
              <p className="text-gray-600">Belum ada fasilitas yang tersedia saat ini.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Merasakan Fasilitas Terbaik?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Kunjungi RS Bhayangkara M. Hasan Palembang dan rasakan pengalaman pelayanan kesehatan 
              dengan fasilitas terlengkap dan tercanggih.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/tentang-kami"
                className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Lokasi & Kontak
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/pelayanan-poli"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Lihat Jadwal Dokter
              </Link>
            </div>
          </motion.div>
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
                      <ArrowRight className="w-4 h-4 mr-2 text-teal-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
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
    </div>
  );
};

export default FasilitasRumahSakitPage;
