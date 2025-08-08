'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Calendar, Clock, User, Phone, ChevronDown, X } from 'lucide-react';
import { doctors, specialists, Doctor } from '@/data/doctors';

const JadwalDokterPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const currentDay = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get current time to check if doctor is currently available
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isCurrentlyAvailable = (doctor: Doctor) => {
    const currentTime = getCurrentTime();
    const todaySchedule = doctor.detailedSchedule[currentDay];
    
    if (!todaySchedule) return false;
    
    const timeRanges = todaySchedule.split(', ');
    return timeRanges.some(range => {
      const [start, end] = range.split(' - ');
      return currentTime >= start && currentTime <= end;
    });
  };

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialist = !selectedSpecialist || doctor.role === selectedSpecialist;
      
      const matchesDay = !selectedDay || doctor.detailedSchedule[selectedDay];
      
      const matchesAvailability = !isAvailableOnly || isCurrentlyAvailable(doctor);
      
      return matchesSearch && matchesSpecialist && matchesDay && matchesAvailability;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'specialist':
          return a.specialization.localeCompare(b.specialization);
        case 'available':
          return Number(isCurrentlyAvailable(b)) - Number(isCurrentlyAvailable(a));
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSpecialist, selectedDay, isAvailableOnly, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialist('');
    setSelectedDay('');
    setIsAvailableOnly(false);
    setSortBy('name');
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Simplified Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_79px,rgba(255,255,255,0.03)_81px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:80px_80px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        {/* Simplified Floating Calendar Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-16 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-xl">
            <div className="text-center">
              <div className="text-2xl font-bold">09</div>
              <div className="text-xs text-white/80">AUG</div>
            </div>
          </div>
          <div className="absolute top-32 right-20 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl">
            <Calendar className="w-8 h-8" />
          </div>
          <div className="absolute bottom-32 left-24 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl">
            <Clock className="w-8 h-8" />
          </div>
          <div className="absolute bottom-48 right-16 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-xl">
            <div className="text-center">
              <div className="text-lg font-bold">24/7</div>
              <div className="text-xs text-white/80">SIAGA</div>
            </div>
          </div>
        </div>

        {/* Simplified Digital Clock Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 text-8xl font-mono text-white/5">
            {getCurrentTime()}
          </div>
          <div className="absolute bottom-20 left-10 text-6xl font-mono text-white/5">
            {currentDay.slice(0, 3).toUpperCase()}
          </div>
        </div>

        {/* Simplified Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-40 h-40 border-2 border-white/10 rounded-2xl grid grid-cols-7 gap-1 p-2">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="w-4 h-4 bg-white/10 rounded"></div>
            ))}
          </div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Breadcrumb */}
          <nav className="mb-12 flex justify-center lg:justify-start" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/40 shadow-2xl">
              <li>
                <Link href="/" className="text-white/90 hover:text-white transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li className="text-white/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </li>
              <li className="text-white font-medium">Jadwal Dokter</li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Calendar & Clock Icons */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-2xl">
                      <Calendar className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-xl">
                      <Clock className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="block text-white">
                  JADWAL
                </span>
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  DOKTER
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto lg:mx-0">
                Temukan jadwal praktik dokter spesialis kami dan{' '}
                <span className="font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">buat janji temu dengan mudah</span>
              </p>

              {/* Live Time Display */}
              <div className="mb-8">
                <div className="inline-flex items-center bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/40 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{currentDay}</div>
                      <div className="text-white/80 text-sm">{new Date().toLocaleDateString('id-ID')}</div>
                    </div>
                    <div className="w-px h-8 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-white font-mono text-lg font-bold">{getCurrentTime()}</div>
                      <div className="text-white/80 text-xs">WAKTU SEKARANG</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center shadow-xl">
                  <div className="text-2xl font-bold text-white mb-1">50+</div>
                  <div className="text-white/90 text-sm">Dokter Tersedia</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center shadow-xl">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/90 text-sm">Layanan Darurat</div>
                </div>
              </div>
            </div>

            {/* Right Content - Calendar Visualization */}
            <div className="flex-1 hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Main Calendar Display */}
                <div className="w-80 h-80 bg-white/15 backdrop-blur-md rounded-3xl border border-white/30 p-6 shadow-2xl">
                  <div className="text-center mb-4">
                    <div className="text-white font-bold text-xl mb-2">Agustus 2025</div>
                    <div className="grid grid-cols-7 gap-1 text-xs text-white/80 mb-2">
                      {['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'].map(day => (
                        <div key={day} className="p-1 text-center font-medium">{day}</div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 3; // Start from Monday
                      const isToday = day === 9;
                      const hasSchedule = day > 0 && day <= 31 && day % 3 === 0;
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                            isToday
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow-lg'
                              : hasSchedule
                              ? 'bg-white/20 text-white hover:bg-white/30 cursor-pointer'
                              : day > 0 && day <= 31
                              ? 'text-white/80 hover:bg-white/10'
                              : 'text-white/30'
                          }`}
                        >
                          {day > 0 && day <= 31 && day}
                          {hasSchedule && day !== 9 && (
                            <div className="absolute w-2 h-2 bg-green-400 rounded-full mt-6"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Simplified Floating Elements Around Calendar */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold">09</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="scheduleWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                <stop offset="25%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="75%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            <path
              fill="url(#scheduleWave)"
              d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white sticky top-0 z-40 shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4">
          {/* Main Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama dokter atau spesialisasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  showFilters
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setIsAvailableOnly(!isAvailableOnly)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isAvailableOnly
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tersedia Sekarang
              </button>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Specialist Filter */}
                <div>
                  <label htmlFor="specialist-filter" className="block text-sm font-medium text-gray-700 mb-2">Spesialisasi</label>
                  <select
                    id="specialist-filter"
                    value={selectedSpecialist}
                    onChange={(e) => setSelectedSpecialist(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 font-medium"
                    style={{ 
                      color: '#111827',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="" className="text-gray-900 bg-white">Semua Spesialisasi</option>
                    {specialists.map(specialist => (
                      <option key={specialist.id} value={specialist.id} className="text-gray-900 bg-white font-medium">
                        {specialist.icon} {specialist.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Day Filter */}
                <div>
                  <label htmlFor="day-filter" className="block text-sm font-medium text-gray-700 mb-2">Hari</label>
                  <select
                    id="day-filter"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 font-medium"
                    style={{ 
                      color: '#111827',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="" className="text-gray-900 bg-white">Semua Hari</option>
                    {days.map(day => (
                      <option key={day} value={day} className="text-gray-900 bg-white font-medium">
                        {day} {day === currentDay ? '(Hari Ini)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
                  <select
                    id="sort-filter"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-900 font-medium"
                    style={{ 
                      color: '#111827',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="name" className="text-gray-900 bg-white font-medium">Nama A-Z</option>
                    <option value="specialist" className="text-gray-900 bg-white font-medium">Spesialisasi</option>
                    <option value="available" className="text-gray-900 bg-white font-medium">Tersedia Dulu</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Menampilkan {filteredDoctors.length} dari {doctors.length} dokter
            </span>
            <span>
              {filteredDoctors.filter(isCurrentlyAvailable).length} dokter tersedia sekarang
            </span>
          </div>
        </div>
      </section>

      {/* Doctors Schedule Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {filteredDoctors.length > 0 ? (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }`}>
              {filteredDoctors.map((doctor, index) => {
                const specialist = specialists.find(s => s.id === doctor.role);
                const isAvailable = isCurrentlyAvailable(doctor);
                
                return (
                  <div
                    key={doctor.id}
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 ${
                      viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Availability Indicator */}
                    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                      isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
                    }`}></div>
                    
                    {viewMode === 'grid' ? (
                      <>
                        {/* Doctor Image/Avatar */}
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                              {doctor.name}
                            </h3>
                            {specialist && (
                              <div className="flex items-center text-teal-600 text-sm">
                                <span className="mr-1">{specialist.icon}</span>
                                <span>{specialist.name}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            isAvailable
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              isAvailable ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            {isAvailable ? 'Tersedia Sekarang' : 'Tidak Tersedia'}
                          </span>
                        </div>

                        {/* Schedule */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Jadwal Praktik
                          </h4>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {Object.entries(doctor.detailedSchedule).map(([day, time]) => (
                              <div key={day} className={`flex justify-between text-sm p-2 rounded ${
                                day === currentDay ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50'
                              }`}>
                                <span className="text-black font-medium">{day}</span>
                                <span className="text-black">{time}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/dokter/profile/${doctor.id}`}
                            className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-center py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Lihat Profil
                          </Link>
                          <button className="px-3 py-2 border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white rounded-lg transition-all duration-200">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="flex items-center mr-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                              {doctor.name}
                            </h3>
                            {specialist && (
                              <div className="flex items-center text-teal-600 text-sm">
                                <span className="mr-1">{specialist.icon}</span>
                                <span>{specialist.name}</span>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                            </span>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-600">
                              {doctor.detailedSchedule[currentDay] || 'Tidak praktik hari ini'}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link
                              href={`/dokter/profile/${doctor.id}`}
                              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 text-sm"
                            >
                              Lihat Profil
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tidak Ada Dokter Ditemukan
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Tidak ada dokter yang sesuai dengan filter yang Anda pilih. Coba ubah kriteria pencarian Anda.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-blue-700 transition-all duration-200"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Butuh Bantuan Membuat Janji?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Tim customer service kami siap membantu Anda 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+62711123456"
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Hubungi Kami
            </a>
            <Link
              href="/reservasi"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Buat Reservasi Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JadwalDokterPage;
