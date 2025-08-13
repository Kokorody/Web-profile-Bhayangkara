'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { news, NewsItem } from '@/data/news';
import { 
  Calendar, 
  Clock, 
  Share2, 
  BookOpen,
  ArrowLeft,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Tag,
  Eye,
  Heart
} from 'lucide-react';

const NewsDetailPage = () => {
  const { id } = useParams();
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const lastScrollY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (id) {
      const newsItem = news.find(item => item.id === parseInt(id as string));
      if (newsItem) {
        setCurrentNews(newsItem);
        setLikesCount(Math.floor(Math.random() * 50) + 10);
        setViewsCount(Math.floor(Math.random() * 500) + 100);
        
        // Get related news (same category, excluding current)
        const related = news
          .filter(item => item.id !== newsItem.id && item.category === newsItem.category)
          .slice(0, 3);
        setRelatedNews(related);
      }
    }
  }, [id]);

  useEffect(() => {
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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = currentNews?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        break;
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

  if (!currentNews) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />

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

            {/* Back Button */}
            <div className="hidden md:flex items-center">
              <Link 
                href="/berita" 
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Berita</span>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-xl transition-colors ${
                  isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <div className="relative group">
                <button className="p-2 rounded-xl text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                
                {/* Share Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 space-y-1">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      {isCopied ? 'Tersalin!' : 'Salin Link'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Article Content */}
      <main className="pt-40">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/berita" className="hover:text-teal-600 transition-colors">Berita</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate">{currentNews.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={currentNews.image}
            alt={currentNews.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Article Meta Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white/20 text-white border-white/30`}>
                  {currentNews.category}
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {currentNews.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentNews.readTime} min baca
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {viewsCount} views
                  </span>
                </div>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              >
                {currentNews.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-200 max-w-3xl"
              >
                {currentNews.excerpt}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-between mb-8 p-6 bg-gray-50 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {currentNews.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{currentNews.author}</h3>
                      <p className="text-sm text-gray-600">Penulis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {viewsCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500' : ''}`} />
                      {likesCount + (isLiked ? 1 : 0)}
                    </div>
                  </div>
                </motion.div>

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentNews.content }}
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-12 p-6 bg-gray-50 rounded-2xl"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentNews.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200 hover:border-teal-300 hover:text-teal-700 transition-colors cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Social Share */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">Bagikan Artikel Ini</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {isCopied ? 'Tersalin!' : 'Salin'}
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-36 space-y-8">
                  {/* Table of Contents */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
                      <BookOpen className="w-5 h-5" />
                      Daftar Isi
                    </h3>
                    <div className="space-y-2 text-sm">
                      <a href="#introduction" className="block text-gray-600 hover:text-teal-600 transition-colors py-1">
                        Pendahuluan
                      </a>
                      <a href="#content" className="block text-gray-600 hover:text-teal-600 transition-colors py-1">
                        Isi Berita
                      </a>
                      <a href="#conclusion" className="block text-gray-600 hover:text-teal-600 transition-colors py-1">
                        Kesimpulan
                      </a>
                    </div>
                  </motion.div>

                  {/* Reading Progress */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Progress Baca</h3>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                        style={{ width: progressBarWidth }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Estimasi waktu baca: {currentNews.readTime} menit
                    </p>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                          isLiked 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        {isLiked ? 'Disukai' : 'Suka'}
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-colors"
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                        {isCopied ? 'Tersalin!' : 'Bagikan'}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Berita Terkait
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Artikel lain yang mungkin menarik untuk Anda baca
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedNews.map((item, index) => (
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
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {item.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
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
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
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
                Jangan Lewatkan Berita Terbaru
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Berlangganan newsletter kami untuk mendapatkan informasi terkini dari RS Bhayangkara
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
      </main>

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

export default NewsDetailPage;
