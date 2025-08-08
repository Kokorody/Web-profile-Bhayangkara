'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { doctors, specialists, Doctor } from '@/data/doctors';

const SpecialistPage = () => {
  const params = useParams();
  const specialistId = params.specialistId as string;
  const [isMounted, setIsMounted] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialist, setSpecialist] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Find the specialist info
    const foundSpecialist = specialists.find(s => s.id === specialistId);
    setSpecialist(foundSpecialist);
    
    // Filter doctors by role
    const doctorsBySpecialist = doctors.filter(doctor => doctor.role === specialistId);
    setFilteredDoctors(doctorsBySpecialist);
  }, [specialistId]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!specialist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Spesialisasi Tidak Ditemukan</h1>
          <Link href="/dokter" className="text-teal-600 hover:text-teal-700">
            Kembali ke Halaman Dokter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-breathing"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse delay-1500"></div>
        </div>

        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 border border-white/10 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 left-10 w-60 h-60 border border-white/5 rounded-full animate-reverse-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-12 flex justify-center lg:justify-start" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li className="text-white/60">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </li>
              <li>
                <Link href="/dokter" className="text-white/80 hover:text-white transition-colors">
                  Dokter
                </Link>
              </li>
              <li className="text-white/60">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </li>
              <li className="text-white font-medium">{specialist.name}</li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Specialist Icon */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="text-8xl lg:text-9xl filter drop-shadow-2xl animate-bounce-slow">
                    {specialist.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent animate-fade-in-up">
                  SPESIALIS
                </span>
                <span className="block bg-gradient-to-r from-blue-100 via-white to-purple-100 bg-clip-text text-transparent animate-fade-in-up delay-300">
                  {specialist.name}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-600">
                Pelayanan medis terdepan untuk{' '}
                <span className="text-white font-semibold">{specialist.description}</span>
                {' '}dengan teknologi modern dan tim ahli berpengalaman
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-fade-in-up delay-900">
                <div className="flex items-center justify-center lg:justify-start space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-medium">Dokter Berpengalaman</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-white font-medium">Teknologi Modern</span>
                </div>
              </div>
            </div>

            {/* Right Content - Decorative */}
            <div className="flex-1 hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* Main Circle */}
                <div className="w-80 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-60 h-60 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full flex items-center justify-center">
                    <div className="text-6xl">{specialist.icon}</div>
                  </div>
                </div>
                
                {/* Orbiting Elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-orbit">
                  <span className="text-2xl">🏥</span>
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-orbit delay-1000">
                  <span className="text-xl">💊</span>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-orbit delay-2000">
                  <span className="text-xl">🩺</span>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-orbit delay-3000">
                  <span className="text-lg">❤️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                <stop offset="25%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="75%" stopColor="#ffffff" stopOpacity="1"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient2)"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.05)_0%,_transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {filteredDoctors.length > 0 ? (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Tim Dokter {specialist.name}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-blue-600 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Dokter spesialis berpengalaman dan terpercaya untuk pelayanan kesehatan terbaik
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDoctors.map((doctor, index) => (
                  <div
                    key={doctor.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Doctor Image */}
                    <div className="relative h-64 bg-gradient-to-br from-teal-100 to-blue-100 overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Specialty Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-teal-600 px-3 py-1 rounded-full text-sm font-medium">
                        {specialist.icon} {specialist.name}
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                        {doctor.name}
                      </h3>
                      <p className="text-teal-600 font-medium mb-3 text-sm">
                        {doctor.specialization}
                      </p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {doctor.experience}
                      </p>
                      
                      {/* Schedule */}
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="line-clamp-1">{doctor.schedule}</span>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/dokter/profile/${doctor.id}`}
                        className="block w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-center py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6 opacity-50">{specialist.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Belum Ada Dokter {specialist.name}
              </h2>
              <p className="text-gray-600 mb-8">
                Dokter spesialis {specialist.description} akan segera hadir untuk melayani Anda
              </p>
              <Link
                href="/dokter"
                className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-blue-700 transition-all duration-200"
              >
                Lihat Spesialisasi Lain
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Back to Specialists Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cari Spesialisasi Lain?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Lihat daftar lengkap spesialisasi dokter yang tersedia
          </p>
          <Link
            href="/dokter"
            className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Lihat Semua Spesialisasi
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SpecialistPage;
