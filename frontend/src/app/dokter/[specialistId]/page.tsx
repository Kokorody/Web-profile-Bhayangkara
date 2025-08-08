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
              <li>
                <Link href="/dokter" className="text-white/80 hover:text-white transition-colors">
                  Profil Dokter
                </Link>
              </li>
              <li className="text-white/60">/</li>
              <li className="text-white font-medium">{specialist.name}</li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="text-6xl mb-6">{specialist.icon}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {specialist.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {specialist.description}
            </p>
            <p className="text-lg text-blue-200 mb-8">
              Dokter Spesialis {specialist.description} di Kota Palembang, Sumatera Selatan SDM Unggul RSUP. Dr. Mohammad Hoesin
            </p>
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
