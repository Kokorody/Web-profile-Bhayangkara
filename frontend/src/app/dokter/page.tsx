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
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-600 to-blue-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/doctor.png')",
              backgroundBlendMode: 'overlay'
            }}
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-10 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white font-medium">Profil Dokter</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              PROFIL DOKTER
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Tim medis terbaik dengan keahlian dan pengalaman yang luas untuk melayani kesehatan Anda
            </p>
            
            {/* Decorative Element */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
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
