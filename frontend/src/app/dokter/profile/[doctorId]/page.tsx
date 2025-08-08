'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { doctors, specialists, Doctor } from '@/data/doctors';

const DoctorProfilePage = () => {
  const params = useParams();
  const doctorId = parseInt(params.doctorId as string);
  const [isMounted, setIsMounted] = useState(false);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [specialist, setSpecialist] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsMounted(true);
    
    // Find the doctor
    const foundDoctor = doctors.find(d => d.id === doctorId);
    setDoctor(foundDoctor || null);
    
    if (foundDoctor) {
      // Find the specialist info
      const foundSpecialist = specialists.find(s => s.id === foundDoctor.role);
      setSpecialist(foundSpecialist);
    }

    // Update current time every minute
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timeInterval);
  }, [doctorId]);

  // Get current day in Indonesian
  const getCurrentDay = () => {
    return new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  };

  // Check if doctor is currently available
  const isCurrentlyAvailable = () => {
    if (!doctor) return false;
    
    const currentDay = getCurrentDay();
    const todaySchedule = doctor.detailedSchedule[currentDay];
    
    if (!todaySchedule) return false;
    
    const timeRanges = todaySchedule.split(', ');
    return timeRanges.some(range => {
      const [start, end] = range.split(' - ');
      return currentTime >= start && currentTime <= end;
    });
  };

  // Get next available schedule
  const getNextAvailableSchedule = () => {
    if (!doctor) return null;
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const currentDay = getCurrentDay();
    const currentDayIndex = days.indexOf(currentDay);
    
    // Check today's remaining schedule
    const todaySchedule = doctor.detailedSchedule[currentDay];
    if (todaySchedule) {
      const timeRanges = todaySchedule.split(', ');
      const nextTimeRange = timeRanges.find(range => {
        const [start] = range.split(' - ');
        return currentTime < start;
      });
      
      if (nextTimeRange) {
        return { day: currentDay, time: nextTimeRange };
      }
    }
    
    // Check next days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = days[nextDayIndex];
      const nextDaySchedule = doctor.detailedSchedule[nextDay];
      
      if (nextDaySchedule) {
        const timeRanges = nextDaySchedule.split(', ');
        return { day: nextDay, time: timeRanges[0] };
      }
    }
    
    return null;
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dokter Tidak Ditemukan</h1>
          <Link href="/dokter" className="text-teal-600 hover:text-teal-700">
            Kembali ke Halaman Dokter
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: '👨‍⚕️' },
    { id: 'education', label: 'Pendidikan', icon: '🎓' },
    { id: 'schedule', label: 'Jadwal', icon: '📅' },
    { id: 'contact', label: 'Kontak', icon: '📞' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 text-white overflow-hidden min-h-[100vh] flex items-center">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[conic-gradient(from_45deg,transparent,rgba(255,255,255,0.03),transparent)] animate-spin-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse"></div>
        </div>
        
        {/* Medical Icons Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-20 text-4xl animate-float">⚕️</div>
          <div className="absolute top-40 right-32 text-3xl animate-float delay-700">🔬</div>
          <div className="absolute bottom-40 left-32 text-5xl animate-float delay-1400">🩺</div>
          <div className="absolute top-60 right-20 text-3xl animate-float delay-2100">💉</div>
          <div className="absolute bottom-60 right-40 text-4xl animate-float delay-2800">🏥</div>
        </div>

        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/10 rounded-full animate-spin"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/5 rounded-full animate-reverse-spin"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-rose-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 flex justify-center lg:justify-start" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li className="text-white/60">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </li>
              <li>
                <Link href="/dokter" className="text-white/80 hover:text-white transition-colors">
                  Dokter
                </Link>
              </li>
              {specialist && (
                <>
                  <li className="text-white/60">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </li>
                  <li>
                    <Link href={`/dokter/${specialist.id}`} className="text-white/80 hover:text-white transition-colors">
                      {specialist.name}
                    </Link>
                  </li>
                </>
              )}
              <li className="text-white/60">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </li>
              <li className="text-white font-medium truncate max-w-[200px]">{doctor.name}</li>
            </ol>
          </nav>

          {/* Doctor Hero Info */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Doctor Image Section */}
            <div className="relative flex-shrink-0 animate-fade-in-up">
              {/* Main Image Container */}
              <div className="relative group">
                <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Specialist Badge */}
                {specialist && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-2xl shadow-xl border-4 border-white/20 animate-bounce-slow">
                    <span className="text-3xl">{specialist.icon}</span>
                  </div>
                )}
                
                {/* Status Indicator */}
                <div className={`absolute -bottom-4 -left-4 ${
                  isCurrentlyAvailable() 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                    : 'bg-gradient-to-r from-orange-400 to-red-400'
                } text-white px-6 py-3 rounded-2xl shadow-xl border-4 border-white/20`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 bg-white rounded-full ${
                      isCurrentlyAvailable() ? 'animate-pulse' : 'animate-ping'
                    }`}></div>
                    <span className="font-bold text-sm">
                      {isCurrentlyAvailable() ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Elements Around Image */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-500"></div>
              <div className="absolute -bottom-8 left-1/4 w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-ping delay-1000"></div>
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-center lg:text-left animate-fade-in-up delay-300">
              {/* Doctor Name */}
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white via-rose-100 to-pink-100 bg-clip-text text-transparent">
                  {doctor.name.split(' ').slice(0, -1).join(' ')}
                </span>
                <span className="block bg-gradient-to-r from-pink-100 via-white to-rose-100 bg-clip-text text-transparent text-3xl lg:text-4xl xl:text-5xl mt-2">
                  {doctor.name.split(' ').slice(-1)[0]}
                </span>
              </h1>

              {/* Specialization */}
              <div className="mb-6">
                <p className="text-xl lg:text-2xl xl:text-3xl text-rose-100 font-semibold mb-2">
                  {doctor.specialization}
                </p>
                {specialist && (
                  <div className="inline-flex items-center bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                    <span className="text-2xl mr-3">{specialist.icon}</span>
                    <span className="text-white font-medium text-lg">{specialist.description}</span>
                  </div>
                )}
              </div>

              {/* Experience */}
              <p className="text-lg lg:text-xl text-rose-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {doctor.experience}
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-white mb-1">yeays+</div>
                  <div className="text-rose-100 text-sm">Tahun Pengalaman</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center">
                  <div className="text-2xl font-bold text-white mb-1">patients+</div>
                  <div className="text-rose-100 text-sm">Pasien Ditangani</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/reservasi"
                  className="group bg-gradient-to-r from-white to-rose-50 text-rose-600 px-8 py-4 rounded-2xl font-bold text-lg hover:from-rose-50 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    Buat Janji Temu
                  </span>
                </Link>
                <a
                  href={`tel:${doctor.phone}`}
                  className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    Hubungi Langsung
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Artistic Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-40"
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="20%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.6"/>
                <stop offset="60%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient3)"
              d="M0,256L40,240C80,224,160,192,240,181.3C320,171,400,181,480,208C560,235,640,277,720,282.7C800,288,880,256,960,234.7C1040,213,1120,203,1200,213.3C1280,224,1360,256,1400,272L1440,288L1440,400L1400,400C1360,400,1280,400,1200,400C1120,400,1040,400,960,400C880,400,800,400,720,400C640,400,560,400,480,400C400,400,320,400,240,400C160,400,80,400,40,400L0,400Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Doctor Details Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Real-time Status Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-xl mr-3">⏰</span>{' '}
                    Status Saat Ini
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Current Time */}
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-xl">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Waktu Sekarang</h3>
                      <p className="text-lg font-bold text-gray-800">
                        {getCurrentDay()}, {currentTime}
                      </p>
                    </div>
                    
                    {/* Availability Status */}
                    <div className={`p-4 rounded-xl ${
                      isCurrentlyAvailable() 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50' 
                        : 'bg-gradient-to-r from-orange-50 to-red-50'
                    }`}>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Status Praktik</h3>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          isCurrentlyAvailable() 
                            ? 'bg-green-500 animate-pulse' 
                            : 'bg-red-500 animate-ping'
                        }`}></div>
                        <p className={`text-lg font-bold ${
                          isCurrentlyAvailable() ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {isCurrentlyAvailable() ? 'Sedang Praktik' : 'Tidak Praktik'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Next Schedule */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Jadwal Selanjutnya</h3>
                      {(() => {
                        const nextSchedule = getNextAvailableSchedule();
                        return nextSchedule ? (
                          <div>
                            <p className="text-sm font-semibold text-purple-700">{nextSchedule.day}</p>
                            <p className="text-sm text-purple-600">{nextSchedule.time}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Tidak ada jadwal</p>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Today's Schedule */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Jadwal Hari Ini ({getCurrentDay()})</h3>
                    {doctor.detailedSchedule[getCurrentDay()] ? (
                      <p className="text-lg font-semibold text-gray-800">
                        {doctor.detailedSchedule[getCurrentDay()]}
                      </p>
                    ) : (
                      <p className="text-gray-500">Tidak ada jadwal praktik hari ini</p>
                    )}
                  </div>
                </div>

                {/* Doctor Profile Information */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="text-2xl mr-3">👨‍⚕️</span>{' '}
                    Profil Dokter
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-600 w-32">Nama Lengkap:</span>
                          <span className="text-gray-800">{doctor.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-600 w-32">Tanggal Lahir:</span>
                          <span className="text-gray-800">{doctor.birthDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-600 w-32">Spesialisasi:</span>
                          <span className="text-gray-800">{doctor.specialization}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-600 w-32">Bahasa:</span>
                          <span className="text-gray-800">{doctor.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengalaman</h3>
                      <p className="text-gray-600 leading-relaxed">{doctor.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎓</span>{' '}
                  Riwayat Pendidikan
                </h2>
                <div className="space-y-6">
                  {doctor.education.map((edu) => (
                    <div key={edu} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full mt-2"></div>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{edu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📅</span>{' '}
                  Jadwal Praktik
                </h2>
                
                {/* Current Status */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Status Saat Ini</h3>
                      <p className="text-sm text-gray-600">{getCurrentDay()}, {currentTime}</p>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-3 ${
                        isCurrentlyAvailable() 
                          ? 'bg-green-500 animate-pulse' 
                          : 'bg-red-500'
                      }`}></div>
                      <span className={`font-semibold ${
                        isCurrentlyAvailable() ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {isCurrentlyAvailable() ? 'Sedang Praktik' : 'Tidak Praktik'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(doctor.detailedSchedule).map(([day, time]) => {
                    const isToday = day === getCurrentDay();
                    const isCurrentlyActive = isToday && isCurrentlyAvailable();
                    
                    // Determine card styling based on status
                    let cardClasses = 'flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ';
                    if (isToday) {
                      if (isCurrentlyActive) {
                        cardClasses += 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-lg';
                      } else {
                        cardClasses += 'bg-gradient-to-r from-blue-50 to-teal-50 border-blue-300 shadow-md';
                      }
                    } else {
                      cardClasses += 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
                    }

                    // Determine text color based on status
                    let timeTextColor = 'font-medium ';
                    if (isCurrentlyActive) {
                      timeTextColor += 'text-green-600';
                    } else if (isToday) {
                      timeTextColor += 'text-blue-600';
                    } else {
                      timeTextColor += 'text-gray-600';
                    }
                    
                    return (
                      <div 
                        key={day} 
                        className={cardClasses}
                      >
                        <div className="flex items-center">
                          <span className={`font-semibold ${
                            isToday ? 'text-blue-800' : 'text-gray-800'
                          }`}>
                            {day}
                            {isToday && (
                              <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                                Hari Ini
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className={timeTextColor}>
                            {time}
                          </span>
                          {isCurrentlyActive && (
                            <div className="ml-3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-yellow-800 text-sm">
                    <strong>Catatan:</strong> Jadwal dapat berubah sewaktu-waktu. Silakan hubungi rumah sakit untuk konfirmasi jadwal terkini.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📞</span>{' '}
                  Informasi Kontak
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontak Langsung</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-800">{doctor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Telepon</p>
                          <p className="font-medium text-gray-800">{doctor.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservasi</h3>
                    <div className="space-y-4">
                      <Link
                        href="/reservasi"
                        className="block w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-center py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        Buat Janji Online
                      </Link>
                      <a
                        href={`tel:${doctor.phone}`}
                        className="block w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white text-center py-3 rounded-xl font-medium transition-all duration-200"
                      >
                        Hubungi Langsung
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Doctors Section */}
      {specialist && (
        <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dokter {specialist.name} Lainnya
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Temui dokter spesialis {specialist.description} lainnya di tim kami
            </p>
            <Link
              href={`/dokter/${specialist.id}`}
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Lihat Tim {specialist.name}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default DoctorProfilePage;
