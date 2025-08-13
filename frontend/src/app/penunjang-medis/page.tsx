'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Activity,
  Waves,
  Pill,
  ChefHat,
  Search,
  FileText,
  Ambulance,
  TestTube,
  Camera,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronDown,
  Clock
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
        y: [0, -15, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Interactive Service Card Component - Icon Animation
const ServiceCardIcon = ({ Icon, color, isHovered }: {
  Icon: any;
  color: string;
  isHovered: boolean;
}) => (
  <motion.div
    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden`}
    whileHover={{ scale: 1.15, rotate: 8 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="absolute inset-0 bg-white opacity-20 rounded-full"
      animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
      transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
    />
    <Icon className="w-12 h-12 text-white relative z-10" />
  </motion.div>
);

// Interactive Service Card Component - Expandable Content
const ServiceCardExpandableContent = ({ specialFeatures, isExpanded }: {
  specialFeatures?: string[];
  isExpanded: boolean;
}) => {
  if (!specialFeatures) return null;
  
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isExpanded ? 'auto' : 0,
        opacity: isExpanded ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden mt-4"
    >
      <div className="pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-2">Fasilitas Khusus:</h4>
        <div className="space-y-2">
          {specialFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Interactive Service Card Component
const ServiceCard = ({ icon: Icon, title, description, features, color, delay, specialFeatures }: {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
  specialFeatures?: string[];
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ duration: 0.8, delay }}
      className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            x: isHovered ? 20 : 0,
            y: isHovered ? -20 : 0
          }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-full"
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            x: isHovered ? -15 : 0,
            y: isHovered ? 15 : 0
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
        initial={false}
        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 2 : 0 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10">
        {/* Animated Icon Container */}
        <ServiceCardIcon Icon={Icon} color={color} isHovered={isHovered} />

        {/* Title with Animation */}
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-teal-600 transition-colors duration-300"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <p className="text-gray-600 mb-6 leading-relaxed font-medium">
          {description}
        </p>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Expandable Special Features */}
        <ServiceCardExpandableContent 
          specialFeatures={specialFeatures}
          isExpanded={isExpanded}
        />

        {/* Interactive Button */}
        <motion.button
          className="mt-8 w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 rounded-2xl font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">
            {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 relative z-10" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

const PenunjangMedisPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Header visibility control
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
        setIsMenuOpen(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Medical support services data
  const medicalServices = [
    {
      icon: Camera,
      title: "Instalasi Radiologi",
      description: "Layanan pencitraan medis dengan teknologi canggih untuk diagnosis yang akurat dan cepat.",
      features: [
        "X-Ray Digital",
        "CT Scan 64 Slice",
        "MRI 1.5 Tesla",
        "USG 4D Color Doppler",
        "Mammografi Digital"
      ],
      specialFeatures: [
        "Radiologist 24/7",
        "PACS System",
        "Hasil dalam 1 jam",
        "Terintegrasi dengan EMR"
      ],
      color: "from-blue-500 to-indigo-600",
      delay: 0.1
    },
    {
      icon: Activity,
      title: "Instalasi Fisiotherapi",
      description: "Rehabilitasi medik profesional untuk pemulihan fungsi tubuh optimal dengan terapi modern.",
      features: [
        "Terapi Manual",
        "Elektroterapi",
        "Hidroterapi",
        "Exercise Therapy",
        "Occupational Therapy"
      ],
      specialFeatures: [
        "Fisioterapis bersertifikat",
        "Gym rehabilitasi",
        "Pool therapy",
        "Home visit service"
      ],
      color: "from-emerald-500 to-teal-600",
      delay: 0.2
    },
    {
      icon: Waves,
      title: "Instalasi Haemodialisa",
      description: "Unit cuci darah modern dengan standar internasional untuk pasien gagal ginjal.",
      features: [
        "Mesin HD Fresenius",
        "Water Treatment Plant",
        "Monitoring 24/7",
        "Program CAPD",
        "Konsultasi Nefrologi"
      ],
      specialFeatures: [
        "20 bed dialisis",
        "Shift pagi & sore",
        "Nurse to patient ratio 1:4",
        "Infection control ketat"
      ],
      color: "from-cyan-500 to-blue-600",
      delay: 0.3
    },
    {
      icon: TestTube,
      title: "Instalasi Laboratorium",
      description: "Laboratorium klinik lengkap dengan hasil pemeriksaan cepat dan akurat 24 jam.",
      features: [
        "Kimia Klinik",
        "Hematologi",
        "Mikrobiologi",
        "Imunologi",
        "Patologi Klinik"
      ],
      specialFeatures: [
        "Auto analyzer",
        "Hasil 1-2 jam",
        "Home sampling",
        "Lab online system"
      ],
      color: "from-purple-500 to-pink-600",
      delay: 0.4
    },
    {
      icon: Pill,
      title: "Instalasi Farmasi (Apotek)",
      description: "Pelayanan farmasi profesional dengan stok obat lengkap dan konsultasi farmasis.",
      features: [
        "Obat Original",
        "Konsultasi Farmasis",
        "Compounding",
        "Drug Information",
        "Monitoring Terapi"
      ],
      specialFeatures: [
        "24 jam emergency",
        "Unit dose dispensing",
        "Clinical pharmacy",
        "Home delivery"
      ],
      color: "from-orange-500 to-red-600",
      delay: 0.5
    },
    {
      icon: ChefHat,
      title: "Instalasi Gizi",
      description: "Layanan nutrisi klinis untuk mendukung proses penyembuhan dengan diet seimbang.",
      features: [
        "Konsultasi Gizi",
        "Diet Therapy",
        "Menu Khusus",
        "Edukasi Gizi",
        "Nutrition Support"
      ],
      specialFeatures: [
        "Dietitian bersertifikat",
        "Kitchen steril",
        "Menu individual",
        "Follow up ambulatory"
      ],
      color: "from-green-500 to-emerald-600",
      delay: 0.6
    },
    {
      icon: Search,
      title: "Instalasi Forensik",
      description: "Layanan kedokteran forensik untuk keperluan hukum dengan standar internasional.",
      features: [
        "Visum et Repertum",
        "Autopsi Forensik",
        "Pemeriksaan DNA",
        "Toksikologi",
        "Antropologi Forensik"
      ],
      specialFeatures: [
        "Dokter forensik bersertifikat",
        "Lab DNA",
        "Dokumentasi digital",
        "Expert witness"
      ],
      color: "from-gray-600 to-slate-700",
      delay: 0.7
    },
    {
      icon: FileText,
      title: "Pelayanan Rekam Medis",
      description: "Sistem informasi kesehatan terintegrasi untuk pengelolaan data medis yang aman.",
      features: [
        "Electronic Medical Record",
        "Coding Diagnosis",
        "Medical Resume",
        "Statistik Kesehatan",
        "Arsip Digital"
      ],
      specialFeatures: [
        "Paperless system",
        "Cloud backup",
        "BPJS integration",
        "Mobile access"
      ],
      color: "from-indigo-500 to-purple-600",
      delay: 0.8
    },
    {
      icon: Shield,
      title: "Pelayanan Traumatic Center",
      description: "Unit trauma terintegrasi untuk penanganan kasus emergency dan trauma kompleks.",
      features: [
        "Trauma Team",
        "Resusitasi",
        "Bedah Darurat",
        "ICU Trauma",
        "Rehabilitasi Trauma"
      ],
      specialFeatures: [
        "24/7 standby",
        "Helipad ready",
        "Advanced life support",
        "Trauma registry"
      ],
      color: "from-red-500 to-orange-600",
      delay: 0.9
    },
    {
      icon: Ambulance,
      title: "Ambulance",
      description: "Layanan ambulans 24 jam dengan peralatan life support untuk transportasi medis.",
      features: [
        "Basic Life Support",
        "Advanced Life Support",
        "Patient Transport",
        "Inter Hospital",
        "Emergency Response"
      ],
      specialFeatures: [
        "GPS tracking",
        "Paramedis terlatih",
        "Ventilator portable",
        "Response time <15 menit"
      ],
      color: "from-yellow-500 to-orange-600",
      delay: 1.0
    }
  ];

  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 z-50 origin-left"
        style={{ scaleX: pathLength }}
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
              <span className="text-teal-600 font-semibold">Penunjang Medis</span>
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
      <section className="relative pt-44 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 rounded-full blur-xl"></div>
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Pelayanan Penunjang Medis
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Layanan penunjang medis lengkap dengan teknologi canggih dan tenaga ahli profesional 
              untuk mendukung diagnosis dan terapi yang optimal
            </motion.p>

            {/* Statistics */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600">
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Layanan Penunjang</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-gray-600 font-medium">Layanan Emergency</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">
                  <AnimatedCounter end={50} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Tenaga Ahli</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span>Jelajahi Layanan</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Layanan Penunjang Medis Terdepan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dilengkapi dengan teknologi modern dan tenaga ahli berpengalaman untuk memberikan 
              pelayanan penunjang medis terbaik yang mendukung proses diagnosis dan terapi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                specialFeatures={service.specialFeatures}
                color={service.color}
                delay={service.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <FloatingElement delay={0}>
            <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Butuh Layanan Penunjang Medis?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Tim ahli kami siap memberikan pelayanan penunjang medis terbaik 24/7. 
              Hubungi kami untuk konsultasi dan informasi lebih lanjut.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" />
                <span>Hubungi Kami</span>
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-teal-600 transition-colors duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-5 h-5" />
                <span>Lokasi Kami</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg className="w-full h-24" viewBox="0 0 1440 94" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#0083e2" d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z" />
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
                    <button type="button" className="text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center group">
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
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
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

export default PenunjangMedisPage;
