export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
  featured: boolean;
  readTime: number;
}

export const news: NewsItem[] = [
  {
    id: 1,
    title: "Bakti Kesehatan RS Bhayangkara M Hasan Palembang",
    excerpt: "Dalam rangka memperingati Hari Bhayangkara ke-78, RS Bhayangkara M. Hasan Palembang turut serta menyemarakkan acara dengan berbagai kegiatan bakti kesehatan untuk masyarakat.",
    content: `
      <p>Dalam rangka memperingati Hari Bhayangkara ke-78, RS Bhayangkara M. Hasan Palembang turut serta menyemarakkan acara dengan berbagai kegiatan bakti kesehatan untuk masyarakat. Kegiatan ini merupakan wujud komitmen rumah sakit dalam melayani masyarakat dengan memberikan pelayanan kesehatan terbaik.</p>
      
      <p>Acara bakti kesehatan meliputi pemeriksaan kesehatan gratis, konsultasi dokter spesialis, pemeriksaan laboratorium, dan edukasi kesehatan. Ratusan masyarakat antusias mengikuti kegiatan ini yang diselenggarakan di halaman rumah sakit.</p>
      
      <p>Kepala Rumah Sakit, KBP Dr. dr. Budi Susanto, Sp.BS, GHLA menyampaikan bahwa kegiatan ini merupakan bentuk kepedulian rumah sakit terhadap kesehatan masyarakat, khususnya dalam upaya promotif dan preventif.</p>
      
      <h3>Layanan yang Tersedia:</h3>
      <ul>
        <li>Pemeriksaan kesehatan umum gratis</li>
        <li>Konsultasi dokter spesialis</li>
        <li>Pemeriksaan laboratorium dasar</li>
        <li>Edukasi kesehatan dan gizi</li>
        <li>Pembagian vitamin dan obat-obatan</li>
      </ul>
      
      <p>Kegiatan bakti kesehatan ini diharapkan dapat meningkatkan awareness masyarakat tentang pentingnya menjaga kesehatan dan melakukan pemeriksaan kesehatan secara rutin.</p>
    `,
    date: "14 Jun 2025",
    image: "/images/1.png",
    category: "Kegiatan",
    author: "Tim Humas RS Bhayangkara",
    tags: ["bakti kesehatan", "hari bhayangkara", "pelayanan masyarakat", "kesehatan gratis"],
    featured: true,
    readTime: 5
  },
  {
    id: 2,
    title: "Memperingati Hari Lahir Pancasila",
    excerpt: "Kepala Rumah Sakit Bhayangkara Palembang, KBP. Dr. dr. BUDI SUSANTO, Sp.BS, GHLA, beserta Ibu Ny. Aryanti Budi, dan seluruh pegawai memperingati Hari Lahir Pancasila dengan penuh khidmat.",
    content: `
      <p>Kepala Rumah Sakit Bhayangkara Palembang, KBP. Dr. dr. BUDI SUSANTO, Sp.BS, GHLA, beserta Ibu Ny. Aryanti Budi, dan seluruh pegawai memperingati Hari Lahir Pancasila dengan penuh khidmat. Peringatan ini dilaksanakan sebagai wujud komitmen terhadap nilai-nilai Pancasila dalam pelayanan kesehatan.</p>
      
      <p>Acara dimulai dengan upacara bendera yang diikuti oleh seluruh jajaran manajemen dan pegawai rumah sakit. Dalam sambutan, Kepala Rumah Sakit menekankan pentingnya mengamalkan nilai-nilai Pancasila dalam memberikan pelayanan kesehatan yang bermutu dan berkeadilan.</p>
      
      <h3>Nilai-nilai Pancasila dalam Pelayanan Kesehatan:</h3>
      <ul>
        <li>Ketuhanan Yang Maha Esa - Melayani dengan ikhlas dan penuh syukur</li>
        <li>Kemanusiaan yang Adil dan Beradab - Menghormati harkat dan martabat pasien</li>
        <li>Persatuan Indonesia - Melayani tanpa membedakan suku, agama, dan ras</li>
        <li>Kerakyatan - Mengutamakan kepentingan pasien dan masyarakat</li>
        <li>Keadilan Sosial - Memberikan pelayanan yang adil dan merata</li>
      </ul>
      
      <p>Peringatan Hari Lahir Pancasila ini diharapkan dapat memperkuat komitmen seluruh pegawai dalam mengamalkan nilai-nilai luhur bangsa dalam setiap aspek pelayanan kesehatan.</p>
    `,
    date: "01 Jun 2025",
    image: "/images/2.png",
    category: "Acara",
    author: "Tim Humas RS Bhayangkara",
    tags: ["pancasila", "upacara", "nilai-nilai", "komitmen"],
    featured: false,
    readTime: 4
  },
  {
    id: 3,
    title: "Polda Sumsel menggelar Bazar & Olahraga",
    excerpt: "Dalam rangka memperingati Hari Ulang Tahun ke-45 YKB, Polda Sumsel menggelar Bazar & Olahraga Senam pada Sabtu, 23 Mei 2025 yang diikuti oleh seluruh pegawai dan keluarga.",
    content: `
      <p>Dalam rangka memperingati Hari Ulang Tahun ke-45 YKB (Yayasan Kesejahteraan Brimob), Polda Sumsel menggelar Bazar & Olahraga Senam pada Sabtu, 23 Mei 2025. Acara ini diselenggarakan di halaman RS Bhayangkara M. Hasan Palembang dan diikuti oleh seluruh pegawai beserta keluarga.</p>
      
      <p>Kegiatan dimulai dengan senam sehat bersama yang dipimpin oleh instruktur profesional. Antusiasme peserta sangat tinggi, terlihat dari partisipasi yang mencapai lebih dari 500 orang.</p>
      
      <h3>Rangkaian Acara:</h3>
      <ul>
        <li>Senam sehat bersama (pukul 07.00 - 08.30)</li>
        <li>Bazar makanan dan kerajinan (pukul 08.30 - 12.00)</li>
        <li>Doorprize dan hiburan (pukul 10.00 - 11.00)</li>
        <li>Pemeriksaan kesehatan gratis (pukul 07.00 - 12.00)</li>
      </ul>
      
      <p>Bazar yang digelar menampilkan berbagai stand makanan tradisional, kerajinan tangan, dan produk-produk UMKM lokal. Kegiatan ini tidak hanya sebagai ajang silaturahmi, tetapi juga mendukung ekonomi lokal.</p>
      
      <p>RS Bhayangkara M. Hasan Palembang juga menyediakan layanan pemeriksaan kesehatan gratis bagi seluruh peserta, sebagai bentuk komitmen dalam meningkatkan derajat kesehatan masyarakat.</p>
    `,
    date: "18 May 2025",
    image: "/images/3.jpg",
    category: "Kegiatan",
    author: "Tim Humas RS Bhayangkara",
    tags: ["YKB", "bazar", "olahraga", "senam", "kesehatan"],
    featured: false,
    readTime: 6
  },
  {
    id: 4,
    title: "Test News 4",
    excerpt: "RS Bhayangkara M. Hasan Palembang memperkenalkan teknologi medis terbaru untuk meningkatkan kualitas pelayanan dan akurasi diagnosis.",
    content: `
      <p>RS Bhayangkara M. Hasan Palembang terus berkomitmen untuk memberikan pelayanan kesehatan terdepan dengan memperkenalkan teknologi medis terbaru. Investasi besar-besaran dalam bidang teknologi medis ini bertujuan untuk meningkatkan kualitas pelayanan dan akurasi diagnosis.</p>
      
      <p>Teknologi baru yang diperkenalkan meliputi sistem MRI generasi terbaru, CT Scan dengan resolusi tinggi, dan sistem laboratorium otomatis yang dapat menghasilkan hasil pemeriksaan dengan cepat dan akurat.</p>
      
      <h3>Teknologi Medis Terbaru:</h3>
      <ul>
        <li>MRI 3.0 Tesla dengan teknologi AI-assisted diagnosis</li>
        <li>CT Scan 128-slice dengan low radiation dose</li>
        <li>Laboratorium otomatis dengan kapasitas 1000 sampel/hari</li>
        <li>Sistem PACS (Picture Archiving Communication System)</li>
        <li>Telemedicine platform untuk konsultasi jarak jauh</li>
      </ul>
      
      <p>Direktur Utama menyampaikan bahwa investasi ini merupakan langkah strategis untuk memposisikan RS Bhayangkara sebagai rumah sakit rujukan terdepan di Sumatera Selatan.</p>
      
      <p>Dengan teknologi ini, pasien akan mendapatkan diagnosa yang lebih cepat, akurat, dan pengobatan yang lebih efektif. Sistem telemedicine juga memungkinkan konsultasi dengan dokter spesialis tanpa harus datang langsung ke rumah sakit.</p>
    `,
    date: "10 Aug 2025",
    image: "/images/4.jpg",
    category: "Teknologi",
    author: "Dr. Sarah Medina, Sp.Rad",
    tags: ["teknologi", "MRI", "CT Scan", "inovasi", "diagnosis"],
    featured: true,
    readTime: 7
  },
  {
    id: 5,
    title: "Test News 5",
    excerpt: "Launching program edukasi kesehatan komprehensif untuk meningkatkan awareness masyarakat tentang pentingnya pencegahan penyakit dan gaya hidup sehat.",
    content: `
      <p>RS Bhayangkara M. Hasan Palembang meluncurkan program edukasi kesehatan komprehensif yang bertujuan untuk meningkatkan kesadaran masyarakat tentang pentingnya pencegahan penyakit dan penerapan gaya hidup sehat.</p>
      
      <p>Program ini dirancang khusus untuk menjangkau berbagai lapisan masyarakat, mulai dari anak-anak usia sekolah hingga lansia. Materi edukasi disesuaikan dengan kebutuhan dan karakteristik masing-masing kelompok usia.</p>
      
      <h3>Komponen Program Edukasi:</h3>
      <ul>
        <li>Seminar kesehatan rutin setiap bulan</li>
        <li>Workshop gizi dan diet sehat</li>
        <li>Pelatihan pertolongan pertama untuk masyarakat</li>
        <li>Kampanye anti rokok dan narkoba</li>
        <li>Edukasi kesehatan reproduksi</li>
        <li>Program deteksi dini penyakit tidak menular</li>
      </ul>
      
      <p>Dr. Ahmad Fauzi, Sp.PD selaku koordinator program menyatakan bahwa pencegahan jauh lebih baik daripada pengobatan. Melalui edukasi yang tepat, diharapkan angka kesakitan di masyarakat dapat ditekan secara signifikan.</p>
      
      <p>Program ini juga melibatkan kerjasama dengan sekolah-sekolah, organisasi masyarakat, dan instansi pemerintah untuk memastikan jangkauan yang lebih luas dan efektif.</p>
    `,
    date: "05 Aug 2025",
    image: "/images/5.jpg",
    category: "Edukasi",
    author: "Dr. Ahmad Fauzi, Sp.PD",
    tags: ["edukasi", "kesehatan masyarakat", "pencegahan", "gaya hidup sehat"],
    featured: false,
    readTime: 5
  },
  {
    id: 6,
    title: "Test News 6",
    excerpt: "RS Bhayangkara M. Hasan Palembang meraih akreditasi internasional NABH (National Accreditation Board for Hospitals) sebagai pengakuan atas standar pelayanan berkualitas tinggi.",
    content: `
      <p>RS Bhayangkara M. Hasan Palembang dengan bangga mengumumkan pencapaian akreditasi internasional NABH (National Accreditation Board for Hospitals). Pencapaian ini merupakan bukti nyata komitmen rumah sakit dalam memberikan pelayanan kesehatan berstandar internasional.</p>
      
      <p>Proses akreditasi NABH melibatkan evaluasi komprehensif terhadap 636 standar yang mencakup seluruh aspek pelayanan rumah sakit, mulai dari manajemen hingga keselamatan pasien.</p>
      
      <h3>Area yang Dievaluasi:</h3>
      <ul>
        <li>Patient Safety & Quality Management</li>
        <li>Clinical Services & Care Standards</li>
        <li>Infrastructure & Facility Management</li>
        <li>Human Resource Management</li>
        <li>Information Management System</li>
        <li>Hospital Governance & Leadership</li>
      </ul>
      
      <p>Tim assessor NABH memberikan apresiasi tinggi terhadap sistem manajemen kualitas dan keselamatan pasien yang telah diimplementasikan di RS Bhayangkara. Khususnya dalam hal protokol pencegahan infeksi dan sistem pelaporan insiden keselamatan pasien.</p>
      
      <p>Dengan akreditasi ini, RS Bhayangkara M. Hasan Palembang menjadi salah satu dari sedikit rumah sakit di Indonesia yang memiliki standar internasional, setara dengan rumah sakit-rumah sakit terbaik di dunia.</p>
      
      <p>Direktur Utama menyampaikan rasa syukur dan berterima kasih kepada seluruh tim yang telah bekerja keras untuk mencapai standar tertinggi ini. Akreditasi NABH akan menjadi motivasi untuk terus meningkatkan kualitas pelayanan.</p>
    `,
    date: "01 Aug 2025",
    image: "/images/about.jpg",
    category: "Pencapaian",
    author: "Manajemen RS Bhayangkara",
    tags: ["akreditasi", "NABH", "internasional", "kualitas", "standar"],
    featured: true,
    readTime: 6
  },
  {
    id: 7,
    title: "Test News 7",
    excerpt: "Penandatanganan MoU dengan beberapa universitas kedokteran terkemuka untuk program magang mahasiswa dan penelitian bersama di bidang kesehatan.",
    content: `
      <p>RS Bhayangkara M. Hasan Palembang menandatangani Memorandum of Understanding (MoU) dengan beberapa universitas kedokteran terkemuka di Indonesia. Kerjasama ini meliputi program magang mahasiswa kedokteran, penelitian bersama, dan pertukaran pengetahuan di bidang kesehatan.</p>
      
      <p>Universitas yang terlibat dalam kerjasama ini antara lain Universitas Indonesia, Universitas Gadjah Mada, Universitas Airlangga, dan Universitas Sriwijaya. Program ini diharapkan dapat meningkatkan kualitas pendidikan kedokteran dan pelayanan kesehatan.</p>
      
      <h3>Program Kerjasama:</h3>
      <ul>
        <li>Magang klinis mahasiswa kedokteran dan keperawatan</li>
        <li>Program residency untuk dokter spesialis</li>
        <li>Penelitian bersama di bidang medis</li>
        <li>Seminar dan workshop ilmiah</li>
        <li>Pertukaran dosen dan tenaga medis</li>
        <li>Publikasi jurnal ilmiah bersama</li>
      </ul>
      
      <p>Prof. Dr. Bambang Sutrisno, Sp.PD dari Universitas Indonesia menyatakan bahwa kerjasama ini akan memberikan manfaat besar bagi pengembangan ilmu kedokteran dan peningkatan kualitas SDM kesehatan di Indonesia.</p>
      
      <p>RS Bhayangkara berkomitmen untuk menjadi teaching hospital yang tidak hanya fokus pada pelayanan, tetapi juga berperan aktif dalam pendidikan dan penelitian kesehatan. Hal ini sejalan dengan visi rumah sakit untuk menjadi center of excellence di bidang kesehatan.</p>
      
      <p>Program magang pertama akan dimulai pada September 2025 dengan penerimaan 50 mahasiswa kedokteran dan 30 mahasiswa keperawatan dari berbagai universitas partner.</p>
    `,
    date: "28 Jul 2025",
    image: "/images/doctor.png",
    category: "Kerjasama",
    author: "Prof. Dr. Maria Silviana, Sp.PD",
    tags: ["kerjasama", "universitas", "pendidikan", "penelitian", "magang"],
    featured: false,
    readTime: 8
  },
  {
    id: 8,
    title: "Test News 8",
    excerpt: "Menghadirkan kemudahan akses layanan kesehatan melalui aplikasi mobile yang memungkinkan pendaftaran online, konsultasi virtual, dan monitoring kesehatan.",
    content: `
      <p>RS Bhayangkara M. Hasan Palembang dengan bangga meluncurkan aplikasi mobile "RS Bhayangkara Mobile" yang menghadirkan revolusi dalam akses layanan kesehatan. Aplikasi ini dikembangkan untuk memberikan kemudahan dan kenyamanan maksimal bagi pasien dan keluarga.</p>
      
      <p>Aplikasi yang tersedia di Google Play Store dan App Store ini menawarkan berbagai fitur canggih yang terintegrasi dengan sistem informasi rumah sakit, memungkinkan akses layanan 24/7 dari mana saja.</p>
      
      <h3>Fitur Unggulan Aplikasi:</h3>
      <ul>
        <li>Pendaftaran online dan pemilihan jadwal dokter</li>
        <li>Konsultasi virtual dengan dokter spesialis</li>
        <li>Akses hasil laboratorium dan radiologi</li>
        <li>Reminder jadwal kontrol dan obat</li>
        <li>Monitoring kesehatan harian</li>
        <li>Emergency call dan ambulance tracking</li>
        <li>Sistem pembayaran digital terintegrasi</li>
        <li>Riwayat medis digital lengkap</li>
      </ul>
      
      <p>CEO RS Bhayangkara, Dr. Budi Susanto menyampaikan bahwa digitalisasi layanan kesehatan merupakan langkah penting dalam era modern. Aplikasi ini tidak hanya meningkatkan efisiensi pelayanan, tetapi juga memberikan pengalaman yang lebih baik bagi pasien.</p>
      
      <p>Fitur konsultasi virtual memungkinkan pasien berkonsultasi dengan dokter tanpa harus datang ke rumah sakit, sangat bermanfaat untuk follow-up rutin atau konsultasi awal. Sistem AI yang terintegrasi juga dapat memberikan rekomendasi awal berdasarkan gejala yang diinput.</p>
      
      <p>Dalam bulan pertama peluncuran, target pengguna aktif adalah 10,000 user dengan tingkat kepuasan minimal 4.5 dari 5 bintang. Tim IT rumah sakit akan terus melakukan update dan perbaikan berdasarkan feedback pengguna.</p>
    `,
    date: "20 Jul 2025",
    image: "/images/ninu.png",
    category: "Teknologi",
    author: "Tim IT RS Bhayangkara",
    tags: ["aplikasi mobile", "digital health", "telemedicine", "teknologi", "inovasi"],
    featured: true,
    readTime: 7
  }
];