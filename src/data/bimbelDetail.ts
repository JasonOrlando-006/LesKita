export type Review = { id: string; name: string; rating: number; comment: string };

export type Bimbel = {
  id: string;
  name: string;
  subject: string;
  district: string;
  city: string;
  address: string;
  distanceKm: number;
  price: number; //rupiah
  priceUnit: string; //per apa? misal sesi atau bulan
  note?: string;
  tags: string[];
  badge?: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  format: string; //private atau kelompok
  levels: string[];
  subjects: string[];
  about: string;
  tutor: { name: string; role: string; experience: string };
  schedule: string[];
  facilities: string[];
  reviews: Review[];
  whatsapp: string;
};

export const BIMBEL_LIST: Bimbel[] = [
  {
    id: '1',
    name: 'Bimbel Bu Retno Ceria',
    subject: 'SD Tematik & Calistung Menyenangkan',
    district: 'Tembalang',
    city: 'Semarang',
    address: 'Jl. Banjarsari Raya No. 12, Tembalang, Semarang',
    distanceKm: 0.4,
    price: 25000,
    priceUnit: '/ sesi',
    tags: ['Maks. 5 anak per sesi', 'Bisa Guru Datang ke Rumah'],
    rating: 4.9,
    reviewCount: 42,
    verified: true,
    format: 'Kelompok kecil (maks. 5 siswa)',
    levels: ['SD'],
    subjects: ['Tematik', 'Calistung', 'Matematika Dasar'],
    about:
      'Bimbel rumahan dengan suasana hangat seperti belajar di rumah sendiri. Materi disesuaikan dengan kurikulum sekolah dan kecepatan belajar tiap anak.',
    tutor: { name: 'Retno Handayani, S.Pd.', role: 'Pemilik & Tutor Utama', experience: '8 tahun mengajar SD' },
    schedule: ['Senin - Jumat, 15.30 - 17.00', 'Sabtu, 09.00 - 11.00'],
    facilities: ['Ruang ber-AC', 'Alat peraga', 'Area tunggu orang tua', 'Guru bisa datang ke rumah'],
    reviews: [
      { id: 'r1', name: 'Ibu Dina', rating: 5, comment: 'Anak saya jadi lebih semangat belajar membaca.' },
      { id: 'r2', name: 'Pak Hendra', rating: 5, comment: 'Tutornya sabar dan jadwalnya fleksibel.' },
    ],
    whatsapp: '081234567890',
  },
  {
    id: '2',
    name: 'Rumah Belajar Bintang Prestasi',
    subject: 'Matematika & Sains Terpadu SMP',
    district: 'Tembalang',
    city: 'Semarang',
    address: 'Jl. Sambiroto Indah No. 5, Tembalang, Semarang',
    distanceKm: 0.8,
    price: 200000,
    priceUnit: '/ bln',
    note: '2x seminggu',
    tags: ['Fasilitas Modul Lengkap', 'Konsultasi PR Harian'],
    rating: 4.9,
    reviewCount: 56,
    verified: true,
    format: 'Kelompok (maks. 8 siswa)',
    levels: ['SMP'],
    subjects: ['Matematika', 'IPA'],
    about:
      'Pendalaman Matematika dan Sains SMP dengan modul lengkap, latihan soal rutin, dan konsultasi PR setiap hari.',
    tutor: { name: 'Budi Santoso, S.Si.', role: 'Tutor Sains', experience: '6 tahun mengajar SMP' },
    schedule: ['Senin - Kamis, 16.00 - 17.30'],
    facilities: ['Modul belajar', 'Papan tulis besar', 'Wi-Fi'],
    reviews: [
      { id: 'r1', name: 'Ibu Lina', rating: 5, comment: 'Nilai IPA anak saya naik dalam dua bulan.' },
      { id: 'r2', name: 'Pak Eko', rating: 4, comment: 'Modulnya lengkap dan pembahasannya runtut.' },
    ],
    whatsapp: '081298765432',
  },
  {
    id: '3',
    name: 'English Corner Pak Dimas',
    subject: 'Percakapan & Grammar Dasar Anak',
    district: 'Banyumanik',
    city: 'Semarang',
    address: 'Jl. Pandanaran II No. 21, Banyumanik, Semarang',
    distanceKm: 1.1,
    price: 30000,
    priceUnit: '/ sesi',
    badge: 'Diskon 20%',
    tags: ['Percakapan', 'Grammar Dasar'],
    rating: 4.95,
    reviewCount: 38,
    verified: true,
    format: 'Kelompok kecil (maks. 6 siswa)',
    levels: ['SD', 'SMP'],
    subjects: ['Bahasa Inggris'],
    about:
      'Belajar Bahasa Inggris lewat percakapan sehari-hari dan permainan, supaya anak berani berbicara sejak dini.',
    tutor: { name: 'Dimas Prakoso, S.Pd.', role: 'Tutor Bahasa Inggris', experience: '5 tahun mengajar' },
    schedule: ['Selasa & Kamis, 16.00 - 17.30', 'Sabtu, 10.00 - 11.30'],
    facilities: ['Ruang ber-AC', 'Kartu kosakata', 'Area bermain kecil'],
    reviews: [
      { id: 'r1', name: 'Ibu Sari', rating: 5, comment: 'Anak jadi berani ngomong bahasa Inggris.' },
      { id: 'r2', name: 'Ibu Wati', rating: 5, comment: 'Metodenya menyenangkan, harganya terjangkau.' },
    ],
    whatsapp: '081311122233',
  },
  {
    id: '4',
    name: 'Rumah Tahsin Baiti',
    subject: 'Iqro Cepat & Tahsin',
    district: 'Pedurungan',
    city: 'Semarang',
    address: 'Jl. Gemah Raya No. 9, Pedurungan, Semarang',
    distanceKm: 0.9,
    price: 20000,
    priceUnit: '/ sesi',
    badge: 'Bisa Privat',
    tags: ['Iqro', 'Tahsin'],
    rating: 4.9,
    reviewCount: 31,
    verified: false,
    format: 'Privat / Kelompok kecil',
    levels: ['SD', 'SMP'],
    subjects: ['Iqro', 'Tahsin'],
    about:
      'Belajar membaca Al-Qur’an dari dasar dengan metode Iqro cepat, dibimbing pengajar yang sabar dan ramah anak.',
    tutor: { name: 'Ustadzah Baiti', role: 'Pengajar Tahsin', experience: '7 tahun mengajar' },
    schedule: ['Senin - Jumat, 15.30 - 17.00'],
    facilities: ['Ruang lesehan', 'Iqro & Al-Qur’an', 'Mushola kecil'],
    reviews: [
      { id: 'r1', name: 'Ibu Nur', rating: 5, comment: 'Bacaan anak saya makin lancar dan tartil.' },
      { id: 'r2', name: 'Pak Andi', rating: 5, comment: 'Pengajarnya telaten sekali.' },
    ],
    whatsapp: '081355566677',
  },
];

export const NEARBY_BIMBEL = BIMBEL_LIST.slice(0, 2);
export const RECOMMENDED_BIMBEL = BIMBEL_LIST.slice(2, 4);

export const getBimbelById = (id: string) => BIMBEL_LIST.find((b) => b.id === id);

export const formatRupiah = (n: number) => 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');