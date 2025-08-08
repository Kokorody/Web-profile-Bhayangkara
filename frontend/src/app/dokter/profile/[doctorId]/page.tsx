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
  }, [doctorId]);

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
              {specialist && (
                <>
                  <li className="text-white/60">/</li>
                  <li>
                    <Link href={`/dokter/${specialist.id}`} className="text-white/80 hover:text-white transition-colors">
                      {specialist.name}
                    </Link>
                  </li>
                </>
              )}
              <li className="text-white/60">/</li>
              <li className="text-white font-medium">{doctor.name}</li>
            </ol>
          </nav>

          {/* Doctor Hero Info */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Doctor Image */}
            <div className="relative">
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {specialist && (
                <div className="absolute -top-2 -right-2 bg-white text-teal-600 p-3 rounded-full shadow-lg">
                  <span className="text-2xl">{specialist.icon}</span>
                </div>
              )}
            </div>

            {/* Doctor Details */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {doctor.name}
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mb-4">
                {doctor.specialization}
              </p>
              {specialist && (
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <span className="text-lg mr-2">{specialist.icon}</span>
                  <span className="text-white font-medium">{specialist.description}</span>
                </div>
              )}
              <p className="text-lg text-blue-200 mb-6 max-w-2xl">
                {doctor.experience}
              </p>
              
              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/reservasi"
                  className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                >
                  Buat Janji
                </Link>
                <a
                  href={`tel:${doctor.phone}`}
                  className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200"
                >
                  Hubungi Dokter
                </a>
              </div>
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
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">👨‍⚕️</span>
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
            )}

            {activeTab === 'education' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎓</span>
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
                  <span className="text-2xl mr-3">📅</span>
                  Jadwal Praktik
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(doctor.detailedSchedule).map(([day, time]) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                      <span className="font-semibold text-gray-800">{day}</span>
                      <span className="text-teal-600 font-medium">{time}</span>
                    </div>
                  ))}
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
                  <span className="text-2xl mr-3">📞</span>
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
