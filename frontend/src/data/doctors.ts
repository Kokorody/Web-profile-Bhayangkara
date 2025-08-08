export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  role: string;
  image: string;
  experience: string;
  schedule: string;
  email: string;
  birthDate: string;
  education: string[];
  languages: string[];
  phone: string;
  detailedSchedule: {
    [key: string]: string;
  };
}

export const specialists = [
  { id: 'obgyn', name: 'OBGYN', icon: '👶', description: 'Obstetri dan Ginekologi' },
  { id: 'anak', name: 'ANAK', icon: '🧒', description: 'Spesialis Anak' },
  { id: 'bedah', name: 'BEDAH', icon: '🏥', description: 'Bedah Umum' },
  { id: 'penyakit-dalam', name: 'PENYAKIT DALAM', icon: '🩺', description: 'Penyakit Dalam' },
  { id: 'jantung', name: 'KARDIOLOGI', icon: '❤️', description: 'Jantung dan Pembuluh Darah' },
  { id: 'mata', name: 'MATA', icon: '👁️', description: 'Oftalmologi' },
  { id: 'kulit', name: 'KULIT', icon: '🧴', description: 'Dermatologi' },
  { id: 'gigi', name: 'GIGI', icon: '🦷', description: 'Kedokteran Gigi' },
  { id: 'tht', name: 'THT', icon: '👂', description: 'Telinga Hidung Tenggorokan' },
  { id: 'saraf', name: 'NEUROLOGI', icon: '🧠', description: 'Neurologi' },
  { id: 'jiwa', name: 'PSIKIATRI', icon: '🧘', description: 'Kesehatan Jiwa' },
  { id: 'rehab', name: 'REHABILITASI', icon: '🏃', description: 'Rehabilitasi Medik' }
];

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "KOMBES POL Dr. BUDI SUSANTO, Sp.BS",
    specialization: "KARUM KIT BHAYANGKARA M. HASAN PALEMBANG",
    role: "bedah",
    image: "/api/placeholder/200/200",
    experience: "test exp",
    schedule: "Senin - Jumat: 08:00 - 16:00",
    email: "testdoctor1@gmail.com",
    birthDate: "Test Birth Date 1",
    education: [
      "Test Education 1",
      "Test Education 2",
      "Test Education 3"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000001",
    detailedSchedule: {
      "Senin": "08:00 - 12:00",
      "Selasa": "08:00 - 12:00, 14:00 - 16:00",
      "Rabu": "08:00 - 12:00",
      "Kamis": "08:00 - 12:00, 14:00 - 16:00",
      "Jumat": "08:00 - 12:00"
    }
  },
  {
    id: 2,
    name: "AKBP DR. ANDRIANTO, SPOG",
    specialization: "DOKTER SPESIALIS PENYAKIT KANDUNGAN OBSTETRI DAN GINEKOLOGI (OBGYN)",
    role: "obgyn",
    image: "/api/placeholder/200/200",
    experience: "test exp 2",
    schedule: "Senin - Sabtu: 09:00 - 17:00",
    email: "testdoctor2@gmail.com",
    birthDate: "Test Birth Date 2",
    education: [
      "Test Education 1",
      "Test Education 2",
      "Test Education 3"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000002",
    detailedSchedule: {
      "Senin": "09:00 - 12:00, 14:00 - 17:00",
      "Selasa": "09:00 - 12:00, 14:00 - 17:00",
      "Rabu": "09:00 - 12:00",
      "Kamis": "09:00 - 12:00, 14:00 - 17:00",
      "Jumat": "09:00 - 12:00, 14:00 - 17:00",
      "Sabtu": "09:00 - 12:00"
    }
  },
  {
    id: 3,
    name: "IPTU dr. IRMA YENNI, Sp.A",
    specialization: "DOKTER SPESIALIS ANAK",
    role: "anak",
    image: "/api/placeholder/200/200",
    experience: "test exp 3",
    schedule: "Senin - Jumat: 08:00 - 15:00",
    email: "testdoctor3@gmail.com",
    birthDate: "Test Birth Date 3",
    education: [
      "Test Education 1",
      "Test Education 2",
      "Test Education 3"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000003",
    detailedSchedule: {
      "Senin": "08:00 - 12:00, 13:00 - 15:00",
      "Selasa": "08:00 - 12:00, 13:00 - 15:00",
      "Rabu": "08:00 - 12:00, 13:00 - 15:00",
      "Kamis": "08:00 - 12:00, 13:00 - 15:00",
      "Jumat": "08:00 - 12:00"
    }
  },
  {
    id: 4,
    name: "TestDoctor PenyakitDalam1",
    specialization: "TEST PENYAKIT DALAM SPECIALIST",
    role: "penyakit-dalam",
    image: "/api/placeholder/200/200",
    experience: "Test experience for internal medicine development",
    schedule: "Test Schedule - Selasa - Sabtu: 10:00 - 16:00",
    email: "penyakitdalamtest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Specialization",
      "Test Education 3 - Fellowship"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000004",
    detailedSchedule: {
      "Selasa": "10:00 - 12:00, 14:00 - 16:00",
      "Rabu": "10:00 - 12:00, 14:00 - 16:00",
      "Kamis": "10:00 - 12:00, 14:00 - 16:00",
      "Jumat": "10:00 - 12:00, 14:00 - 16:00",
      "Sabtu": "10:00 - 12:00"
    }
  },
  {
    id: 5,
    name: "TestDoctor Jantung1",
    specialization: "TEST KARDIOLOGI SPECIALIST",
    role: "jantung",
    image: "/api/placeholder/200/200",
    experience: "Test experience for cardiology development",
    schedule: "Test Schedule - Senin - Jumat: 08:00 - 15:00",
    email: "jantungtest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Cardiology Specialization",
      "Test Education 3 - Intervention Fellowship"
    ],
    languages: ["Indonesia", "English", "TestLanguage"],
    phone: "+62 711 000005",
    detailedSchedule: {
      "Senin": "08:00 - 12:00, 13:00 - 15:00",
      "Selasa": "08:00 - 12:00, 13:00 - 15:00",
      "Rabu": "08:00 - 12:00",
      "Kamis": "08:00 - 12:00, 13:00 - 15:00",
      "Jumat": "08:00 - 12:00, 13:00 - 15:00"
    }
  },
  {
    id: 6,
    name: "TestDoctor Mata1",
    specialization: "TEST OFTALMOLOGI SPECIALIST",
    role: "mata",
    image: "/api/placeholder/200/200",
    experience: "Test experience for ophthalmology development",
    schedule: "Test Schedule - Senin - Jumat: 09:00 - 16:00",
    email: "matatest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Ophthalmology Specialization",
      "Test Education 3 - Retina Fellowship"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000006",
    detailedSchedule: {
      "Senin": "09:00 - 12:00, 14:00 - 16:00",
      "Selasa": "09:00 - 12:00, 14:00 - 16:00",
      "Rabu": "09:00 - 12:00, 14:00 - 16:00",
      "Kamis": "09:00 - 12:00, 14:00 - 16:00",
      "Jumat": "09:00 - 12:00"
    }
  },
  {
    id: 7,
    name: "TestDoctor Kulit1",
    specialization: "TEST DERMATOLOGI SPECIALIST",
    role: "kulit",
    image: "/api/placeholder/200/200",
    experience: "Test experience for dermatology development",
    schedule: "Test Schedule - Senin - Jumat: 10:00 - 17:00",
    email: "kulittest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Dermatology Specialization",
      "Test Education 3 - Cosmetic Training"
    ],
    languages: ["Indonesia", "English", "TestLanguage"],
    phone: "+62 711 000007",
    detailedSchedule: {
      "Senin": "10:00 - 12:00, 14:00 - 17:00",
      "Selasa": "10:00 - 12:00, 14:00 - 17:00",
      "Rabu": "10:00 - 12:00, 14:00 - 17:00",
      "Kamis": "10:00 - 12:00, 14:00 - 17:00",
      "Jumat": "10:00 - 12:00"
    }
  },
  {
    id: 8,
    name: "TestDoctor Gigi1",
    specialization: "TEST KONSERVASI GIGI SPECIALIST",
    role: "gigi",
    image: "/api/placeholder/200/200",
    experience: "Test experience for dental conservation development",
    schedule: "Test Schedule - Senin - Jumat: 08:00 - 15:00",
    email: "gigitest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Dental School",
      "Test Education 2 - Conservation Specialization",
      "Test Education 3 - Aesthetic Training"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000008",
    detailedSchedule: {
      "Senin": "08:00 - 12:00, 13:00 - 15:00",
      "Selasa": "08:00 - 12:00, 13:00 - 15:00",
      "Rabu": "08:00 - 12:00, 13:00 - 15:00",
      "Kamis": "08:00 - 12:00, 13:00 - 15:00",
      "Jumat": "08:00 - 12:00"
    }
  },
  {
    id: 9,
    name: "TestDoctor THT1",
    specialization: "TEST THT-KL SPECIALIST",
    role: "tht",
    image: "/api/placeholder/200/200",
    experience: "Test experience for ENT development",
    schedule: "Test Schedule - Senin - Jumat: 09:00 - 16:00",
    email: "thttest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - ENT Specialization",
      "Test Education 3 - Head Neck Surgery Fellowship"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000009",
    detailedSchedule: {
      "Senin": "09:00 - 12:00, 14:00 - 16:00",
      "Selasa": "09:00 - 12:00, 14:00 - 16:00",
      "Rabu": "09:00 - 12:00, 14:00 - 16:00",
      "Kamis": "09:00 - 12:00, 14:00 - 16:00",
      "Jumat": "09:00 - 12:00"
    }
  },
  {
    id: 10,
    name: "TestDoctor Saraf1",
    specialization: "TEST NEUROLOGI SPECIALIST",
    role: "saraf",
    image: "/api/placeholder/200/200",
    experience: "Test experience for neurology development",
    schedule: "Test Schedule - Senin - Jumat: 08:00 - 15:00",
    email: "saraftest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Neurology Specialization",
      "Test Education 3 - Stroke Fellowship"
    ],
    languages: ["Indonesia", "English", "TestLanguage"],
    phone: "+62 711 000010",
    detailedSchedule: {
      "Senin": "08:00 - 12:00, 13:00 - 15:00",
      "Selasa": "08:00 - 12:00, 13:00 - 15:00",
      "Rabu": "08:00 - 12:00",
      "Kamis": "08:00 - 12:00, 13:00 - 15:00",
      "Jumat": "08:00 - 12:00, 13:00 - 15:00"
    }
  },
  {
    id: 11,
    name: "TestDoctor Jiwa1",
    specialization: "TEST PSIKIATRI SPECIALIST",
    role: "jiwa",
    image: "/api/placeholder/200/200",
    experience: "Test experience for psychiatry development",
    schedule: "Test Schedule - Senin - Jumat: 09:00 - 16:00",
    email: "jiwatest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Psychiatry Specialization",
      "Test Education 3 - Cognitive Therapy Training"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000011",
    detailedSchedule: {
      "Senin": "09:00 - 12:00, 14:00 - 16:00",
      "Selasa": "09:00 - 12:00, 14:00 - 16:00",
      "Rabu": "09:00 - 12:00, 14:00 - 16:00",
      "Kamis": "09:00 - 12:00, 14:00 - 16:00",
      "Jumat": "09:00 - 12:00"
    }
  },
  {
    id: 12,
    name: "TestDoctor Rehab1",
    specialization: "TEST REHABILITASI MEDIK SPECIALIST",
    role: "rehab",
    image: "/api/placeholder/200/200",
    experience: "Test experience for rehabilitation medicine development",
    schedule: "Test Schedule - Senin - Jumat: 08:00 - 15:00",
    email: "rehabtest1@gmail.com",
    birthDate: "Test Birth Date",
    education: [
      "Test Education 1 - Medical School",
      "Test Education 2 - Physical Medicine & Rehabilitation Specialization",
      "Test Education 3 - Stroke Rehabilitation Training"
    ],
    languages: ["Indonesia", "English"],
    phone: "+62 711 000012",
    detailedSchedule: {
      "Senin": "08:00 - 12:00, 13:00 - 15:00",
      "Selasa": "08:00 - 12:00, 13:00 - 15:00",
      "Rabu": "08:00 - 12:00, 13:00 - 15:00",
      "Kamis": "08:00 - 12:00, 13:00 - 15:00",
      "Jumat": "08:00 - 12:00"
    }
  }
];