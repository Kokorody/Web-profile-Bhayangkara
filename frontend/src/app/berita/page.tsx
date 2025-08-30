'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { news, NewsItem } from '@/data/news';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  BookOpen,
  Tag
} from 'lucide-react';

const BeritaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const itemsPerPage = 6;

  // Scroll handling for header visibility
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsHeaderVisible(currentScrollY < lastScrollY.current);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(news.map(item => item.category))];
    return cats;
  }, []);

  // Filter and sort news
  const filteredAndSortedNews = useMemo(() => {
    let filtered = news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.readTime - a.readTime; // Using readTime as popularity metric
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedNews.length / itemsPerPage);
  const paginatedNews = filteredAndSortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Featured news
  const featuredNews = useMemo(() => 
    news.filter(item => item.featured).slice(0, 3), 
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Kegiatan': 'bg-blue-100 text-blue-800 border-blue-200',
      'Acara': 'bg-purple-100 text-purple-800 border-purple-200',
      'Teknologi': 'bg-green-100 text-green-800 border-green-200',
      'Edukasi': 'bg-orange-100 text-orange-800 border-orange-200',
      'Pencapaian': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Kerjasama': 'bg-pink-100 text-pink-800 border-pink-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
          ease: [0.25, 0.46, 0.45, 0.94]
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

            {/* Navigation - Below the logo */}
            <nav className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors duration-200 font-medium">
                Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-teal-600 font-semibold">Berita</span>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-blue-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Berita Terkini</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
              Berita & Informasi
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Temukan informasi terbaru seputar layanan, kegiatan, dan perkembangan terkini dari RS Bhayangkara M. Hasan Palembang
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              {[
                { icon: BookOpen, label: 'Total Berita', value: news.length },
                { icon: TrendingUp, label: 'Berita Unggulan', value: featuredNews.length },
                { icon: Tag, label: 'Kategori', value: categories.length - 1 }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-teal-300" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured News Section */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-2 rounded-full border border-teal-200 mb-4">
                <Star className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold text-teal-800">Berita Unggulan</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sorotan Utama</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Berita dan informasi penting yang patut mendapat perhatian khusus
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/berita/${item.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:scale-[1.02] group-hover:border-teal-200">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-yellow-500 p-2 rounded-full">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.readTime} min
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-teal-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
          >
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita, tag, atau kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
              >
                <option value="all">Semua Kategori</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="popular">Populer</option>
              </select>
            </div>

            {/* View Mode and Results Info */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan {filteredAndSortedNews.length} dari {news.length} berita
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-teal-100 text-teal-600 border border-teal-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-teal-100 text-teal-600 border border-teal-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
              }
            >
              {paginatedNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link href={`/berita/${item.id}`}>
                    {viewMode === 'grid' ? (
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:scale-[1.02] group-hover:border-teal-200">
                        <div className="relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                          {item.featured && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-yellow-500 p-2 rounded-full">
                                <Star className="w-4 h-4 text-white fill-current" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {item.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {item.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.readTime} min
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {item.author}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                              <ArrowRight className="w-4 h-4 text-teal-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-teal-200">
                        <div className="md:flex">
                          <div className="md:w-1/3 relative overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                                {item.category}
                              </span>
                            </div>
                            {item.featured && (
                              <div className="absolute top-4 right-4">
                                <div className="bg-yellow-500 p-2 rounded-full">
                                  <Star className="w-4 h-4 text-white fill-current" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="md:w-2/3 p-6">
                            <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {item.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center gap-6">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {item.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {item.readTime} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {item.author}
                                </span>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight className="w-5 h-5 text-teal-600" />
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {item.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredAndSortedNews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada berita ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba ubah kata kunci pencarian atau filter kategori</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center mt-16 gap-2"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/herobg.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tetap Update dengan Informasi Terbaru
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Dapatkan berita dan informasi terbaru langsung dari RS Bhayangkara M. Hasan Palembang
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                Berlangganan
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 rotate-90" />
      </motion.button>
    </div>
  );
};

export default BeritaPage;
