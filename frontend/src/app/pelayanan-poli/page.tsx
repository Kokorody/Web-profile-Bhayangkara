"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Star,
  Filter,
  Grid,
  List,
  Calendar,
  Users,
  Timer,
  Sparkles,
  MessageCircle
} from 'lucide-react';

// Add custom animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes blob {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
  
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-blob { animation: blob 7s infinite; }
  .animate-gradient-x { 
    background-size: 200% 200%; 
    animation: gradient-x 3s ease infinite; 
  }
  .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  
  .animation-delay-0 { animation-delay: 0ms; }
  .animation-delay-300 { animation-delay: 300ms; }
  .animation-delay-600 { animation-delay: 600ms; }
  .animation-delay-1000 { animation-delay: 1000ms; }
  .animation-delay-2000 { animation-delay: 2000ms; }
  .animation-delay-3000 { animation-delay: 3000ms; }
  .animation-delay-4000 { animation-delay: 4000ms; }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  
  .animate-on-scroll.animate-fade-in-up {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}

interface PoliService {
  id: number;
  name: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  services: string[];
  availability: string;
  doctorCount: number;
  rating: number;
  waitTime: string;
  featured?: boolean;
  popular?: boolean;
}

interface ServiceCardProps {
  service: PoliService;
  index: number;
  expandedCard: number | null;
  setExpandedCard: (id: number | null) => void;
  viewMode: string;
  hoveredCard: number | null;
  setHoveredCard: (id: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  index, 
  expandedCard, 
  setExpandedCard, 
  viewMode,
  hoveredCard,
  setHoveredCard 
}) => {
  const Icon = service.icon;
  const isExpanded = expandedCard === service.id;
  const isHovered = hoveredCard === service.id;

  return (
    <div 
      className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100/50 ${
        viewMode === 'list' ? 'flex items-center p-8' : 'p-8'
      } ${isExpanded ? 'scale-105 z-10 ring-2 ring-teal-400/50' : ''} ${
        service.featured ? 'ring-2 ring-gradient-to-r from-amber-400 to-orange-500' : ''
      } transform hover:scale-[1.02] hover:-translate-y-2`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        background: isHovered ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.95) 100%)' : undefined
      }}
      onMouseEnter={() => setHoveredCard(service.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Featured Badge */}
      {service.featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
            ⭐ UNGGULAN
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-20">
          <div className="px-3 py-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
            🔥 POPULER
          </div>
        </div>
      )}

      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-3xl`}></div>
      
      {/* Floating Particles Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75 animation-delay-300"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-600"></div>
        </div>
      )}
      
      {/* Content */}
      <div className={`relative z-10 ${viewMode === 'list' ? 'flex items-center gap-8 flex-1' : ''}`}>
        {/* Icon Section */}
        <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-6'}`}>
          <div className="relative">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
              <Icon className="w-10 h-10 text-white relative z-10" />
              
              {/* Icon Glow Effect */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Pulse Ring */}
              {isHovered && (
                <div className="absolute -inset-4 border-2 border-teal-400/30 rounded-3xl animate-ping"></div>
              )}
            </div>
            
            {/* Floating Rating */}
            <div className="absolute -top-2 -right-2 bg-white shadow-lg rounded-full px-2 py-1 border border-gray-100">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-gray-800">{service.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300 mb-2">
              {service.name}
            </h3>
            
            {/* Quick Info Bar */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 text-teal-500" />
                <span className="font-medium">{service.doctorCount} Dokter</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <Timer className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{service.waitTime}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="font-medium">{service.availability}</span>
              </div>
            </div>
          </div>
          
          <p className={`text-gray-600 mb-6 leading-relaxed ${viewMode === 'list' ? 'line-clamp-2' : ''}`}>
            {service.description}
          </p>

          {/* Services List */}
          {(viewMode === 'grid' || isExpanded) && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-teal-500" />
                Layanan Tersedia:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.services.map((srv: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100 hover:shadow-md transition-shadow duration-200">
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Daftar
              </button>
              
              <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
            </div>
            
            <button 
              onClick={() => setExpandedCard(isExpanded ? null : service.id)}
              className="flex items-center text-teal-600 hover:text-teal-700 transition-colors duration-200 font-medium group/btn"
            >
              {isExpanded ? 'Tutup' : 'Lihat Detail'}
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:scale-110 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

const PoliPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const poliServices = [
    {
      id: 1,
      name: "Poli Penyakit Dalam",
      description: "Konsultasi dokter spesialis penyakit dalam dengan pelayanan komprehensif untuk berbagai keluhan medis internal",
      icon: Stethoscope,
      category: "internal",
      color: "from-red-500 to-pink-500",
      services: ["Konsultasi Spesialis", "Pemeriksaan Komprehensif", "Follow-up Treatment", "Medical Check-up"],
      availability: "24/7",
      doctorCount: 5,
      rating: 4.9,
      waitTime: "15 menit",
      featured: true
    },
    {
      id: 2,
      name: "Poli Syaraf",
      description: "Konsultasi dokter spesialis syaraf, pemeriksaan cranium, pemeriksaan reflek patela, saraf kranial lengkap",
      icon: Brain,
      category: "neurologi",
      color: "from-purple-500 to-indigo-500",
      services: ["Konsultasi Neurologi", "Pemeriksaan Cranium", "Tes Reflek Patela", "Evaluasi Saraf Kranial"],
      availability: "Senin-Sabtu",
      doctorCount: 3,
      rating: 4.8,
      waitTime: "20 menit",
      popular: true
    },
    {
      id: 3,
      name: "Poli Anak",
      description: "Konsultasi dokter spesialis anak, program imunisasi lengkap, dan monitoring tumbuh kembang anak",
      icon: Baby,
      category: "pediatric",
      color: "from-green-500 to-emerald-500",
      services: ["Konsultasi Pediatrik", "Program Imunisasi", "Tumbuh Kembang Anak", "Konsultasi Gizi"],
      availability: "24/7",
      doctorCount: 4,
      rating: 4.9,
      waitTime: "10 menit",
      featured: true
    },
    {
      id: 4,
      name: "Poli THT",
      description: "Konsultasi dokter spesialis THT, pemeriksaan cerumen plug, pemeriksaan pengambilan corpus alienum telinga dan hidung",
      icon: Ear,
      category: "tht",
      color: "from-orange-500 to-red-500",
      services: ["Konsultasi THT", "Pembersihan Cerumen", "Ekstraksi Benda Asing", "Audiometri"],
      availability: "Senin-Jumat",
      doctorCount: 2,
      rating: 4.7,
      waitTime: "25 menit"
    },
    {
      id: 5,
      name: "Poli Mata",
      description: "Konsultasi dokter spesialis mata, pemeriksaan visus, buta warna, auto ref dan slit lamp dengan teknologi terkini",
      icon: Eye,
      category: "mata",
      color: "from-blue-500 to-cyan-500",
      services: ["Konsultasi Oftalmologi", "Tes Visus", "Tes Buta Warna", "Pemeriksaan Slit Lamp"],
      availability: "Senin-Sabtu",
      doctorCount: 3,
      rating: 4.8,
      waitTime: "15 menit",
      popular: true
    },
    {
      id: 6,
      name: "Poli Bedah",
      description: "Konsultasi dokter spesialis bedah, perawatan luka, angkat jahitan, ganti verban dan balutan, ekstraksi kuku",
      icon: Scissors,
      category: "bedah",
      color: "from-teal-500 to-green-500",
      services: ["Konsultasi Bedah", "Perawatan Luka", "Minor Surgery", "Post-op Care"],
      availability: "24/7",
      doctorCount: 4,
      rating: 4.9,
      waitTime: "30 menit"
    },
    {
      id: 7,
      name: "Poli Kandungan",
      description: "Konsultasi dokter kandungan, pemeriksaan kehamilan, pasang/lepas iud, usg 4 dimensi dengan teknologi modern",
      icon: Heart,
      category: "kandungan",
      color: "from-pink-500 to-rose-500",
      services: ["Konsultasi ObGyn", "Pemeriksaan Kehamilan", "Kontrasepsi IUD", "USG 4D"],
      availability: "24/7",
      doctorCount: 3,
      rating: 4.8,
      waitTime: "20 menit",
      featured: true
    },
    {
      id: 8,
      name: "Poli Paru",
      description: "Pemeriksaan Spirometri dan konsultasi lengkap untuk masalah pernapasan dan paru-paru",
      icon: Droplets,
      category: "paru",
      color: "from-indigo-500 to-purple-500",
      services: ["Pemeriksaan Spirometri", "Konsultasi Pulmonologi", "Tes Fungsi Paru"],
      availability: "Senin-Jumat",
      doctorCount: 2,
      rating: 4.7,
      waitTime: "25 menit"
    },
    {
      id: 9,
      name: "Poli Kulit dan Kelamin",
      description: "Cauter, Skin Care, dan berbagai perawatan dermatologi dengan teknologi terdepan",
      icon: Shield,
      category: "kulit",
      color: "from-yellow-500 to-orange-500",
      services: ["Cauter Treatment", "Skin Care", "Dermatologi Konsultasi", "Laser Treatment"],
      availability: "Senin-Sabtu",
      doctorCount: 2,
      rating: 4.6,
      waitTime: "20 menit"
    },
    {
      id: 10,
      name: "Poli Kejiwaan",
      description: "MMPI dan konsultasi psikiatri lengkap untuk kesehatan mental yang optimal",
      icon: Brain,
      category: "psikiatri",
      color: "from-violet-500 to-purple-500",
      services: ["MMPI Testing", "Konsultasi Psikiatri", "Terapi Psikologi"],
      availability: "Senin-Jumat",
      doctorCount: 2,
      rating: 4.8,
      waitTime: "30 menit"
    },
    {
      id: 11,
      name: "Poli Jantung",
      description: "Treadmill, Echo dan EKG dengan peralatan canggih untuk pemeriksaan jantung yang akurat",
      icon: Activity,
      category: "jantung",
      color: "from-red-500 to-rose-500",
      services: ["Treadmill Test", "Echocardiography", "EKG", "Holter Monitor"],
      availability: "Senin-Sabtu",
      doctorCount: 3,
      rating: 4.9,
      waitTime: "25 menit",
      popular: true
    },
    {
      id: 12,
      name: "Poli MCU",
      description: "Medical Check-up lengkap, surat keterangan sehat, surat keterangan kesehatan rohani, surat keterangan bebas narkoba",
      icon: UserCheck,
      category: "mcu",
      color: "from-emerald-500 to-teal-500",
      services: ["Medical Check-Up", "Surat Keterangan Sehat", "Tes Bebas Narkoba", "Pemeriksaan Komprehensif"],
      availability: "Senin-Sabtu",
      doctorCount: 6,
      rating: 4.8,
      waitTime: "45 menit"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Poli', count: poliServices.length },
    { id: 'internal', name: 'Penyakit Dalam', count: 1 },
    { id: 'bedah', name: 'Bedah', count: 1 },
    { id: 'pediatric', name: 'Anak', count: 1 },
    { id: 'kandungan', name: 'Kandungan', count: 1 },
    { id: 'neurologi', name: 'Neurologi', count: 1 },
    { id: 'jantung', name: 'Jantung', count: 1 },
    { id: 'mata', name: 'Mata', count: 1 },
    { id: 'tht', name: 'THT', count: 1 },
    { id: 'kulit', name: 'Kulit', count: 1 },
    { id: 'paru', name: 'Paru', count: 1 },
    { id: 'psikiatri', name: 'Psikiatri', count: 1 },
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
      
      if (direction !== (isHeaderVisible ? "up" : "down")) {
        setIsHeaderVisible(direction === "up" || scrollY < 10);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [isHeaderVisible]);

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
              <span className="text-teal-600 font-semibold">Pelayanan Poli</span>
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
                  Pelayanan Poli
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
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50"></div>
        
        {/* Floating Medical Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-teal-200/30 rounded-full animate-float animation-delay-0">
            <Stethoscope className="w-8 h-8 text-teal-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-200/30 rounded-full animate-float animation-delay-1000">
            <Heart className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute bottom-40 left-1/4 w-14 h-14 bg-purple-200/30 rounded-full animate-float animation-delay-2000">
            <Brain className="w-7 h-7 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute top-60 right-1/3 w-10 h-10 bg-green-200/30 rounded-full animate-float animation-delay-3000">
            <Eye className="w-5 h-5 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-teal-700 rounded-full text-sm font-medium mb-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300 animate-on-scroll">
              <Sparkles className="w-5 h-5 mr-2 text-teal-500" />
              <span className="font-semibold">Pelayanan Poliklinik Spesialis Terdepan</span>
              <div className="ml-2 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight animate-on-scroll">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 animate-gradient-x">
                Poliklinik
              </span>
              <br />
              <span className="text-gray-800">Spesialis</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-x">
                Terlengkap
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto animate-on-scroll">
              Nikmati layanan poliklinik spesialis dengan 
              <span className="font-bold text-teal-600"> 12 poli unggulan</span>, 
              <span className="font-bold text-blue-600"> 40+ dokter berpengalaman</span>, 
              dan <span className="font-bold text-purple-600">teknologi medis terdepan</span> 
              untuk kesehatan optimal Anda dan keluarga.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-on-scroll">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center">
                  <Calendar className="w-6 h-6 mr-3" />
                  Daftar Poli Sekarang
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30"></div>
              </button>
              
              <button className="group relative px-8 py-5 bg-white/90 backdrop-blur-sm text-gray-800 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 hover:border-teal-300">
                <span className="relative flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-teal-600" />
                  Hubungi (0711) 414855
                </span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-on-scroll">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 group">
                <div className="text-3xl font-black text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-300">12</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Poli Spesialis</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                <div className="text-3xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">40+</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Dokter Ahli</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group">
                <div className="text-3xl font-black text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Layanan Siaga</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group">
                <div className="text-3xl font-black text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Kepuasan Pasien</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search & Filter Section */}
      <section className="py-12 bg-white/60 backdrop-blur-sm border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
              {/* Advanced Search */}
              <div className="relative flex-1 max-w-2xl">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Search className="text-gray-400 w-6 h-6" />
                </div>
                <input
                  type="text"
                  placeholder="Cari poli, layanan, atau dokter spesialis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-300 shadow-inner text-lg font-medium placeholder-gray-500"
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-6">
                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <Filter className="w-6 h-6 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:outline-none focus:bg-white transition-all duration-300 shadow-sm font-medium text-gray-700 min-w-[200px]"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-2xl p-2 shadow-inner">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-teal-600 shadow-lg scale-105' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white text-teal-600 shadow-lg scale-105' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-3">
                <div className="text-sm font-semibold text-gray-600 flex items-center mr-4">
                  <Sparkles className="w-4 h-4 mr-2 text-teal-500" />
                  Filter Cepat:
                </div>
                <button 
                  onClick={() => setSelectedCategory('featured')}
                  className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 border border-amber-200"
                >
                  ⭐ Unggulan
                </button>
                <button 
                  onClick={() => setSelectedCategory('popular')}
                  className="px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 border border-pink-200"
                >
                  🔥 Populer
                </button>
                <button 
                  onClick={() => setSelectedCategory('24/7')}
                  className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium hover:shadow-md transition-all duration-200 border border-green-200"
                >
                  🕐 24/7
                </button>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-12 animate-on-scroll">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {filteredServices.length} Poliklinik Tersedia
              </h2>
              {searchTerm && (
                <p className="text-gray-600">
                  Hasil pencarian untuk "<span className="font-semibold text-teal-600">{searchTerm}</span>"
                </p>
              )}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Layanan Aktif</span>
                </div>
                <div className="text-sm text-gray-500">
                  Menampilkan {filteredServices.length} dari {poliServices.length} poli
                </div>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600">Urutkan:</span>
                <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-teal-500 transition-colors duration-200">
                  <option>Rating Tertinggi</option>
                  <option>Waktu Tunggu Tersingkat</option>
                  <option>Paling Populer</option>
                  <option>Alphabetical A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
              : 'space-y-8'
          } animate-on-scroll`}>
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                expandedCard={expandedCard} 
                setExpandedCard={setExpandedCard} 
                viewMode={viewMode}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </div>

          {/* No Results State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-20 animate-on-scroll">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Search className="w-16 h-16 text-gray-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xl">😔</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Tidak ada poliklinik ditemukan</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Coba gunakan kata kunci yang berbeda atau pilih kategori lain untuk menemukan layanan yang Anda butuhkan
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Reset Semua Filter
                </button>
                
                <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-teal-300">
                  Hubungi Customer Service
                </button>
              </div>
            </div>
          )}

          {/* Featured Services Banner */}
          {filteredServices.length > 0 && (
            <div className="mt-20 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-3xl p-8 text-white relative overflow-hidden animate-on-scroll">
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-white/10 rounded-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-3xl font-bold mb-4">Butuh Konsultasi Segera?</h3>
                <p className="text-xl mb-8 opacity-90">Tim medis kami siap membantu Anda 24/7 untuk layanan darurat</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5" />
                    Hubungi Emergency: (0711) 414855
                  </button>
                  
                  <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 flex items-center justify-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    Chat Online
                  </button>
                </div>
              </div>
            </div>
          )}
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

export default PoliPage;