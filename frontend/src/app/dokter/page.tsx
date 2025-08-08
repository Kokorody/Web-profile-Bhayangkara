'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { specialists } from '@/data/doctors';

const DoctorPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden min-h-[100vh] flex items-center">
        {/* Doctor Background Image with Creative Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/doctor.png')",
            }}
          />
          {/* Multi-layer Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-teal-800/85 to-cyan-900/95"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Enhanced Dynamic Pattern Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] animate-breathing"></div>
        </div>
        
        {/* Floating Medical Icons with Glassmorphism */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-xl animate-float">
            <span className="text-4xl">🩺</span>
          </div>
          <div className="absolute top-40 right-20 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl animate-float delay-500">
            <span className="text-3xl">💊</span>
          </div>
          <div className="absolute bottom-40 left-20 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-xl animate-float delay-1000">
            <span className="text-4xl">❤️</span>
          </div>
          <div className="absolute top-60 left-1/3 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl animate-float delay-1500">
            <span className="text-2xl">🏥</span>
          </div>
          <div className="absolute bottom-60 right-1/3 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-xl animate-float delay-2000">
            <span className="text-3xl">👨‍⚕️</span>
          </div>
        </div>

        {/* Enhanced Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-white/15 to-transparent rounded-full blur-3xl animate-spin-slow border border-white/10"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-cyan-400/25 to-transparent rounded-full blur-3xl animate-pulse border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-breathing"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Enhanced Breadcrumb */}
          <nav className="mb-12 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/40 shadow-2xl">
              <li>
                <Link href="/" className="text-white/90 hover:text-white transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
              <li className="text-white font-medium">Profil Dokter</li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Medical Cross Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50 animate-pulse shadow-2xl">
                  <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 8h-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 002 2h6a2 2 0 002-2v-2h2a2 2 0 002-2v-4a2 2 0 00-2-2z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full animate-ping shadow-lg"></div>
              </div>
            </div>

            {/* Enhanced Title with Better Contrast */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block text-white drop-shadow-2xl animate-fade-in-up" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.3)' }}>
                TIM MEDIS
              </span>
              <span className="block text-white drop-shadow-2xl animate-fade-in-up delay-300" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.3)' }}>
                TERBAIK
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-600" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Dokter Spesialis Berpengalaman dengan Dedikasi Tinggi untuk 
              <span className="font-bold "> Kesehatan Terbaik Anda</span>
            </p>

            {/* Enhanced Stats with Glassmorphism */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up delay-900">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/25 transition-all duration-300 shadow-2xl">
                <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
                <div className="text-white/95 text-sm drop-shadow-md font-medium">Dokter Spesialis</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/25 transition-all duration-300 shadow-2xl">
                <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">15+</div>
                <div className="text-white/95 text-sm drop-shadow-md font-medium">Spesialisasi</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/25 transition-all duration-300 shadow-2xl">
                <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">24/7</div>
                <div className="text-white/95 text-sm drop-shadow-md font-medium">Pelayanan</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 hover:bg-white/25 transition-all duration-300 shadow-2xl">
                <div className="text-3xl font-bold text-white mb-2 drop-shadow-lg">1000+</div>
                <div className="text-white/95 text-sm drop-shadow-md font-medium">Pasien/Bulan</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-1200">
              <button className="group border-2 border-white/90 bg-white/15 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Lihat Jadwal
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Specialists Grid Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              KOMITE STAF MEDIK
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih spesialisasi dokter yang Anda butuhkan untuk mendapatkan pelayanan medis terbaik
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {specialists.map((specialist, index) => (
              <Link
                key={specialist.id}
                href={`/dokter/${specialist.id}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Icon Background */}
                  <div className="absolute top-2 right-2 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    {specialist.icon}
                  </div>
                  
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {specialist.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-sm text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                      {specialist.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {specialist.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Butuh Konsultasi Medis?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Tim dokter spesialis kami siap memberikan pelayanan terbaik untuk kesehatan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jadwal-dokter"
              className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Lihat Jadwal Dokter
            </Link>
            <Link
              href="/reservasi"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200"
            >
              Buat Reservasi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorPage;
