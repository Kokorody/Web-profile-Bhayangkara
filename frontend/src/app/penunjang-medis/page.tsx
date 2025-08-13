'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Activity,
  Waves,
  Pill,
  Heart,
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
  Menu,
  X,
  Home,
  ChevronDown
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

  // Scroll handler for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDifference < 5) {
        lastScrollY.current = currentScrollY;
        return;
      }
      
      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else {
        const isScrollingDown = currentScrollY > lastScrollY.current;
        setIsHeaderVisible(!isScrollingDown);
        if (isScrollingDown) setIsMenuOpen(false);
      }
      
      // Update scroll progress - removed as not used
      
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RS BHAYANGKARA</h1>
                <p className="text-sm text-gray-600">Mohammad Hasan Palembang</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link href="/" className="px-4 py-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200 flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </Link>
              <span className="px-4 py-2 rounded-lg bg-teal-100 text-teal-700 font-semibold">
                Penunjang Medis
              </span>
              <Link href="/perawatan-umum" className="px-4 py-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200">
                Perawatan Umum
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </Link>
            <div className="px-4 py-3 rounded-lg bg-teal-100 text-teal-700 font-semibold">
              Penunjang Medis
            </div>
            <Link 
              href="/perawatan-umum" 
              className="block px-4 py-3 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Perawatan Umum
            </Link>
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hospital Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">RS BHAYANGKARA</h3>
                  <p className="text-gray-400 text-sm">Mohammad Hasan Palembang</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Rumah sakit dengan layanan penunjang medis terdepan, 
                berkomitmen memberikan pelayanan kesehatan terbaik dengan teknologi modern.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Link Cepat</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Beranda</Link></li>
                <li><Link href="/tentang-kami" className="text-gray-400 hover:text-white transition-colors duration-200">Tentang Kami</Link></li>
                <li><Link href="/dokter" className="text-gray-400 hover:text-white transition-colors duration-200">Dokter</Link></li>
                <li><Link href="/perawatan-umum" className="text-gray-400 hover:text-white transition-colors duration-200">Perawatan Umum</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Layanan Penunjang</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-400">Radiologi & Imaging</li>
                <li className="text-gray-400">Laboratorium Klinik</li>
                <li className="text-gray-400">Farmasi & Apotek</li>
                <li className="text-gray-400">Rehabilitasi Medik</li>
                <li className="text-gray-400">Emergency & Trauma</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Kontak</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">(0711) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">info@rsbhayangkara.co.id</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-1" />
                  <span className="text-gray-400">
                    Jl. Jenderal Sudirman No. 1<br />
                    Palembang, Sumatera Selatan
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 RS Bhayangkara Mohammad Hasan Palembang. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PenunjangMedisPage;
