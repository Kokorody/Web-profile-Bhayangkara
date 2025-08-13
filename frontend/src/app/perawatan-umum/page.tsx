'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Heart, 
  Stethoscope, 
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
  UserCheck
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef);

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

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, features, color, delay }: {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full transform -translate-x-12 translate-y-12"></div>
      </div>

      {/* Animated Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        initial={false}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: delay + (feature.length * 0.01) }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* Action Button */}
        <motion.button
          className="mt-8 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Pelajari Lebih Lanjut</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Statistics Card
const StatCard = ({ icon: Icon, value, label, color, delay }: {
  icon: any;
  value: string;
  label: string;
  color: string;
  delay: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-800">{value}</div>
          <div className="text-gray-600 font-medium">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

const PerawatanUmumPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('layanan');
  
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
  }, []); // Remove lastScrollY from dependencies

  // Services data - Ruang Perawatan Umum
  const services = [
    {
      icon: Stethoscope,
      title: "Kasus Bedah",
      description: "Ruang perawatan untuk pasien bedah umum dengan fasilitas lengkap dan tim medis berpengalaman.",
      features: [
        "Perawatan pre dan post operasi",
        "Monitoring kondisi pasien 24 jam",
        "Perawatan luka operasi",
        "Konsultasi dengan dokter bedah"
      ],
      color: "from-blue-500 to-cyan-600",
      delay: 0.2
    },
    {
      icon: Activity,
      title: "Kasus Syaraf",
      description: "Perawatan khusus untuk pasien dengan gangguan sistem saraf dan neurologis.",
      features: [
        "Monitoring neurologi intensif",
        "Terapi rehabilitasi saraf",
        "Perawatan pasien stroke",
        "Konsultasi dokter spesialis saraf"
      ],
      color: "from-purple-500 to-indigo-600",
      delay: 0.4
    },
    {
      icon: Heart,
      title: "Kasus Penyakit Dalam",
      description: "Ruang perawatan untuk berbagai kasus penyakit dalam dan kondisi medis umum.",
      features: [
        "Perawatan diabetes dan hipertensi",
        "Monitoring kondisi kronis",
        "Terapi obat-obatan",
        "Konsultasi dokter spesialis penyakit dalam"
      ],
      color: "from-green-500 to-emerald-600",
      delay: 0.6
    },
    {
      icon: Shield,
      title: "Kasus Mata",
      description: "Perawatan spesialisasi untuk pasien dengan gangguan dan penyakit mata.",
      features: [
        "Perawatan post operasi mata",
        "Terapi gangguan penglihatan",
        "Monitoring kondisi mata",
        "Konsultasi dokter spesialis mata"
      ],
      color: "from-orange-500 to-amber-600",
      delay: 0.8
    },
    {
      icon: UserCheck,
      title: "Kasus Bedah Orthopedi",
      description: "Ruang perawatan khusus untuk pasien bedah tulang dan sendi.",
      features: [
        "Perawatan patah tulang",
        "Rehabilitasi pasca operasi",
        "Terapi fisik dan mobilisasi",
        "Konsultasi dokter spesialis orthopedi"
      ],
      color: "from-red-500 to-pink-600",
      delay: 1.0
    },
    {
      icon: Clock,
      title: "Kasus Lainnya",
      description: "Perawatan untuk kasus bedah urologi, bedah syaraf, jantung, paru, dan THT.",
      features: [
        "Kasus Bedah Urologi",
        "Kasus Bedah Syaraf",
        "Kasus Jantung dan Paru",
        "Kasus THT (Telinga, Hidung, Tenggorokan)"
      ],
      color: "from-teal-500 to-cyan-600",
      delay: 1.2
    }
  ];

  // Statistics data
  const stats = [
    { icon: Users, value: "200+", label: "Tempat Tidur", color: "from-blue-500 to-cyan-600", delay: 0.2 },
    { icon: Award, value: "25+", label: "Tahun Pengalaman", color: "from-green-500 to-emerald-600", delay: 0.4 },
    { icon: Star, value: "10+", label: "Jenis Kasus Medis", color: "from-yellow-500 to-orange-600", delay: 0.6 },
    { icon: TrendingUp, value: "24/7", label: "Pelayanan Non-Stop", color: "from-purple-500 to-pink-600", delay: 0.8 }
  ];

  const tabs = [
    { id: 'layanan', label: 'Layanan Kami', icon: Stethoscope },
    { id: 'fasilitas', label: 'Fasilitas', icon: Shield },
    { id: 'tim', label: 'Tim Medis', icon: Users },
    { id: 'testimoni', label: 'Testimoni', icon: Star }
  ];

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-600 transform-gpu z-50"
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

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors">
                Beranda
              </Link>
              <span className="text-gray-300">/</span>
              <Link href="/" className="text-gray-500 hover:text-teal-600 transition-colors">
                Pelayanan
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-teal-600 font-semibold">Perawatan Umum</span>
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl"
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
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-gray-700">Ruang Perawatan Terbaik</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
              >
                Perawatan{' '}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Umum
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              >
                Ruang Perawatan Umum RS Bhayangkara Mohammad Hasan menyediakan fasilitas perawatan 
                untuk berbagai jenis kasus medis dengan tim dokter spesialis dan perawat profesional.
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
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-6 h-6" />
                  Buat Janji Temu
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  Hubungi Kami
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                {/* Main Card */}
                <FloatingElement delay={0}>
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <Stethoscope className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">Ruang Perawatan Umum</h3>
                        <p className="text-gray-600">Fasilitas Perawatan Terlengkap</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {['Kasus Bedah & Orthopedi', 'Kasus Penyakit Dalam', 'Kasus Syaraf & Mata'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-teal-500" />
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FloatingElement>

                {/* Stats Cards */}
                <FloatingElement delay={0.5}>
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        <AnimatedCounter end={98} suffix="%" />
                      </div>
                      <div className="text-red-100 font-semibold">Tingkat Kepuasan</div>
                    </div>
                  </div>
                </FloatingElement>

                <FloatingElement delay={1}>
                  <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        <AnimatedCounter end={24} suffix="/7" />
                      </div>
                      <div className="text-green-100 font-semibold">Layanan Darurat</div>
                    </div>
                  </div>
                </FloatingElement>
              </div>

              {/* Background Decorations */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-blue-500/30 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Fasilitas{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Ruang Perawatan
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ruang Perawatan Umum dengan fasilitas modern dan standar pelayanan tinggi 
              untuk berbagai jenis kasus medis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Medical Cases Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Jenis{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Kasus Medis
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Berbagai jenis kasus medis yang dapat ditangani di Ruang Perawatan Umum 
              RS Bhayangkara Mohammad Hasan Palembang.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏥", title: "Kasus Bedah", description: "Perawatan pre dan post operasi bedah umum" },
              { icon: "🧠", title: "Kasus Syaraf", description: "Perawatan gangguan sistem saraf dan neurologis" },
              { icon: "❤️", title: "Kasus Penyakit Dalam", description: "Perawatan penyakit dalam dan kondisi medis umum" },
              { icon: "👁️", title: "Kasus Mata", description: "Perawatan gangguan dan penyakit mata" },
              { icon: "🦴", title: "Kasus Bedah Orthopedi", description: "Perawatan bedah tulang dan sendi" },
              { icon: "🫁", title: "Kasus Bedah Urologi", description: "Perawatan bedah sistem kemih dan reproduksi" },
              { icon: "🧠", title: "Kasus Bedah Syaraf", description: "Perawatan bedah sistem saraf pusat" },
              { icon: "💓", title: "Kasus Jantung", description: "Perawatan gangguan dan penyakit jantung" },
              { icon: "🫁", title: "Kasus Paru", description: "Perawatan gangguan dan penyakit paru-paru" },
              { icon: "👂", title: "Kasus THT", description: "Perawatan telinga, hidung, dan tenggorokan" }
            ].map((kasus) => (
              <motion.div
                key={kasus.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: kasus.title.length * 0.01 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{kasus.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{kasus.title}</h3>
                <p className="text-gray-600">{kasus.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border border-teal-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Informasi Ruang Perawatan
              </h3>
              <p className="text-gray-600 mb-6">
                Semua kasus medis di atas ditangani dengan fasilitas ruang perawatan modern, 
                tim dokter spesialis berpengalaman, dan perawat profesional yang siap melayani 24 jam.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700 font-medium">Monitoring 24 Jam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700 font-medium">Tim Dokter Spesialis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700 font-medium">Fasilitas Modern</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-700 font-medium">Perawatan Berkualitas</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Ruang{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Perawatan Umum
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fasilitas perawatan untuk berbagai jenis kasus medis dengan tim dokter spesialis 
              dan perawat profesional yang berpengalaman.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Mengapa Memilih{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Kami?
              </span>
            </h2>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12"
          >
            {activeTab === 'layanan' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Pelayanan Ruang Perawatan</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Ruang Perawatan Umum RS Bhayangkara menyediakan fasilitas perawatan yang lengkap dan terintegrasi 
                    untuk berbagai jenis kasus medis dengan dukungan tim dokter spesialis berpengalaman.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Perawatan kasus bedah umum dan spesialisasi',
                      'Monitoring pasien 24 jam dengan alat modern',
                      'Tim dokter spesialis dan perawat profesional',
                      'Ruang perawatan dengan standar internasional',
                      'Fasilitas penunjang medis lengkap'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-teal-500" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                          <AnimatedCounter end={200} suffix="+" />
                        </div>
                        <div className="text-gray-600">Tempat Tidur</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">
                          <AnimatedCounter end={10} suffix="+" />
                        </div>
                        <div className="text-gray-600">Jenis Kasus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fasilitas' && (
              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: 'Ruang Perawatan Standar',
                    description: 'Ruang perawatan dengan fasilitas standar untuk berbagai jenis kasus medis.'
                  },
                  {
                    icon: Activity,
                    title: 'Ruang Perawatan VIP',
                    description: 'Ruang perawatan VIP dengan fasilitas premium dan pelayanan eksklusif.'
                  },
                  {
                    icon: Clock,
                    title: 'Monitoring 24 Jam',
                    description: 'Sistem monitoring pasien 24 jam dengan alat medis modern dan tim jaga.'
                  }
                ].map((facility) => (
                  <motion.div
                    key={facility.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: facility.title.length * 0.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <facility.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{facility.title}</h4>
                    <p className="text-gray-600">{facility.description}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'tim' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Tim Medis Ruang Perawatan</h3>
                <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                  Tim dokter spesialis dan tenaga medis profesional yang berpengalaman 
                  dalam menangani berbagai jenis kasus di Ruang Perawatan Umum.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: 'Dokter Spesialis', count: 15, icon: UserCheck },
                    { title: 'Perawat Profesional', count: 40, icon: Users },
                    { title: 'Tenaga Medis', count: 25, icon: Activity }
                  ].map((team) => (
                    <div key={team.title} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <team.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2">
                        <AnimatedCounter end={team.count} suffix="+" />
                      </div>
                      <div className="text-gray-600 font-semibold">{team.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimoni' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    name: 'Ibu Sari',
                    role: 'Pasien Kasus Bedah',
                    comment: 'Perawatan di ruang perawatan umum sangat baik. Tim medis sangat profesional dan perhatian.',
                    rating: 5
                  },
                  {
                    name: 'Bapak Andi',
                    role: 'Pasien Kasus Penyakit Dalam',
                    comment: 'Fasilitas ruang perawatan lengkap dan nyaman. Proses perawatan sangat memuaskan.',
                    rating: 5
                  }
                ].map((testimoni) => (
                  <motion.div
                    key={testimoni.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: testimoni.name.length * 0.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimoni.rating)].map((_, i) => (
                        <Star key={`star-${testimoni.name}-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimoni.comment}"</p>
                    <div>
                      <div className="font-semibold text-gray-800">{testimoni.name}</div>
                      <div className="text-sm text-gray-500">{testimoni.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/15 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-white/5 rounded-full"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Butuh Perawatan di Ruang Perawatan Umum?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut mengenai ketersediaan ruang perawatan 
              dan konsultasi dengan dokter spesialis kami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" />
                Konsultasi Sekarang
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                (0711) 414
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/header.png"
                  alt="RS Bhayangkara Logo"
                  className="h-12 w-auto"
                />
                <div>
                  <div className="font-bold text-lg">RS Bhayangkara</div>
                  <div className="text-gray-400 text-sm">Mohammad Hasan</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Rumah sakit terpercaya dengan pelayanan kesehatan berkualitas tinggi 
                dan teknologi medis terdepan.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Perawatan Umum</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Rawat Inap</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Rawat Jalan</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Gawat Darurat</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Kontak</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span className="text-gray-400">(0711) 414</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-teal-400" />
                  <span className="text-gray-400">rs.bhayangkara.palembang@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-400 mt-1" />
                  <span className="text-gray-400">Jl. Moh. Hasan, Palembang</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Jam Operasional</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Senin - Jumat: 08:00 - 20:00</li>
                <li>Sabtu: 08:00 - 16:00</li>
                <li>Minggu: 08:00 - 14:00</li>
                <li className="text-red-400 font-semibold">Gawat Darurat: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2024 RS Bhayangkara Mohammad Hasan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerawatanUmumPage;
