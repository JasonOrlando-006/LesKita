# Pengenalan LesKita: Hybrid Apps

LesKita adalah aplikasi yang menyediakan wadah bagi orang-orang yang mempunyai usaha Bimbingan Belajar untuk lebih dapat memperkenalkan eksistensi dan jasa mereka dalam dunia pendidikan. Selain itu, aplikasi ini juga mempermudah murid dalam mencari jasa bimbingan belajar yang relevan, baik dalam mata pelajaran maupun ekonomi. Aplikasi ini difokuskan untuk mobile used dan dibangun dengan React Native, Expo, dan TypeScript. Halaman yang tersedia: Login(termasuk Register dan Forgot Password), Home, Search, Notification, Profile, dan Detail Bimbel.

## Struktur Proyek

- `src/app/` : halaman pada aplikasi(Expo Router, satu file = satu halaman, termasuk `bimbel/[id].tsx`)
- `src/components/` : komponen yang dipakai ulang (`passwordInput`, `stickyHeader`, `message`, `iconComp`)
- `src/data/` : data dan tipe TypeScript (`bimbelDetail.ts`, `locations.ts`) yang sementara adalah dummy

## Cara Kerja React Native

React Native merupakan framework yang memungkinkan kita membangun aplikasi mobile dengan JavaScript/TypeScript dan React. Kode akan dijalankan oleh JavaScript engine (Hermes) yang sudah ada pada aplikasi ketika dibuild. Terdapat dua komponen dasar dalam React Native, yaitu View sebagai wadah untuk menyusun tampilan, dan Text sebagai wadah untuk menampilkan teks. Kedua komponen tersebut tidak dirender menjadi halaman web (WebView), tetapi diterjemahkan menjadi komponen native asli masing-masing OS, seperti "UIView" di iOS dan "android.view" di Android, sehingga tampilan dan performanya terasa seperti aplikasi native. Expo mempermudah development: aplikasi cukup dijalankan dengan "npx expo start", tanpa setup Android Studio atau Xcode.

## Keunggulan untuk Aplikasi Hybrid

1. Satu codebase untuk banyak platform: Satu kode berjalan di Android, iOS, dan web, sehingga waktu dan biaya pengembangan lebih hemat
2. Fast Refresh: Perubahan kode langsung terlihat di perangkat tanpa build ulang dan menonaktifkan server
3. Performa mendekati native: UI dirender dengan komponen native, bukan WebView
4. Ekosistem besar: Library seperti `expo-router`, `react-native-svg`, dan `expo-font` tinggal dipasang

## Komponen

Komponen adalah blok pembangun UI yang bisa dipakai ulang.
### Misalnya `StickyHeader` yang dipanggil untuk membungkus isi header agar tidak tertimpa status bar, dan dipakai di Home, Search, Notification, dan Profile:

```tsx
export function StickyHeader({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.header, { paddingTop: insets.top + 8 }]}>
      {children}
    </View>
  );
}
```
### Contoh lain adalah `Message`, komponen untuk menampilkan pesan hasil validasi. Komponen ini menerima satu props `msg` berisi teks dan status berhasil atau gagal. Kalau `msg` kosong (`null`), tidak ada yang ditampilkan. Kalau ada, warna pesan menyesuaikan statusnya:

```tsx
export type Msg = { text: string; ok: boolean } | null;

export function Message({ msg }: { msg: Msg }) {
  if (!msg) return null;
  return (
    <Text style={[styles.message, msg.ok ? styles.ok : styles.error]}>
      {msg.text}
    </Text>
  );
}
```

Komponen ini dipakai di tiga halaman (Login, Register, Forgot Password) dengan pola yang sama: halaman menyimpan pesan di state `msg`, mengisinya saat validasi, lalu mengirimkannya ke `Message` sebagai props.

Login (`index.tsx`): pesan error muncul kalau input tidak valid.

```tsx
const [msg, setMsg] = useState<Msg>(null);

const handleLogin = () => {
  if (email.trim() === '' || password === '') {
    setMsg({ text: 'Email and password are required.', ok: false });
    return;
  }
  if (!email.includes('@')) {
    setMsg({ text: 'Invalid email format.', ok: false });
    return;
  }
  // ...
  setMsg(null); // validasi lolos, pesan dihapus
};

<Message msg={msg} />
```
### Contoh berikutnya adalah `PasswordInput`, kolom password buatan sendiri yang dipakai di Login dan Register. Karakter terakhir yang diketik terlihat selama 0,5 detik sebelum disensor, dan ikon mata bisa menampilkan atau menyembunyikan password. Komponen ini menerima props `value`, `onChangeText`, `placeholder`, dan `maxLength`, serta menyimpan dua state: `showLast` untuk karakter terakhir dan `visible` untuk mode lihat password.

```tsx
export function PasswordInput(/*props*/) {
  // ... logika & state ...

  return (
    <View>
      <TextInput
        value={display}
        onChangeText={handleChange}
      />
      <TouchableOpacity onPress={toggleVisible}>
        <EyeIcon off={visible} color={colors.muted} />
      </TouchableOpacity>
    </View>
  );
}
```

## Props

Props adalah data yang dikirim dari komponen induk ke komponen anak dan bersifat read-only. `PasswordInput` menerima `value`, `onChangeText`, `placeholder`, dan `maxLength`, sehingga bisa dipakai di Login maupun Register:

```tsx
export function PasswordInput({
  value, //props
  onChangeText,
  placeholder,
  maxLength,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  maxLength?: number;
})
```

## State

State adalah data yang bisa berubah di dalam komponen dan dikelola dengan `useState`. Setiap state berubah, tampilan dirender ulang. Di Home, state `location` menyimpan lokasi yang dipilih dari `data/locations.ts`:

```tsx
const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
const [pickerOpen, setPickerOpen] = useState(false);

<Text>{location.district}, {location.city}</Text>
```

Di `PasswordInput`, state `showLast` menampilkan karakter terakhir selama 0,5 detik sebelum disensor:

```tsx
setShowLast(true);
timer.current = setTimeout(() => setShowLast(false), 500);
```

## Navigasi

Navigasi memakai Expo Router yang berbasis file. Halaman utama didaftarkan di `_layout.tsx`:

```tsx
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="index" />
  <Stack.Screen name="register" />
  <Stack.Screen name="home" />
</Stack>
```

Perpindahan halaman dilakukan dengan `router`:

```tsx
router.push('/register');   // buka Register, bisa kembali
router.replace('/home');    // masuk ke Home, tidak bisa kembali ke Login
```

Untuk halaman detail, `id` bimbel dikirim sebagai parameter dari Home, lalu dibaca di `bimbel/[id].tsx` dengan `useLocalSearchParams` untuk mengambil datanya:

```tsx
// home.tsx (pengirim)
router.push({ pathname: '/bimbel/[id]', params: { id: item.id } });

// bimbel/[id].tsx (penerima)
const { id } = useLocalSearchParams<{ id: string }>();
const bimbel = getBimbelById(id);
```

## Cara Menjalankan Aplikasinya

```bash
npm install
npx expo start
```

# Analisis Kebutuhan Aplikasi

## 1. Masalah yang Melatarbelakangi

Di sekitar kita masih banyak usaha rumahan (UMKM) di bidang pendidikan, terutama
bimbel rumahan, yang kualitas pengajarannya baik tetapi kurang dikenal masyarakat.
Orang tua cenderung memilih bimbel berjaringan besar seperti Kumon, Ganesha
Operation, atau Ruangguru karena namanya sudah dikenal, padahal bimbel rumahan
sering kali lebih terjangkau dengan manfaat belajar yang tidak kalah baik.

Kondisi ini dapat terjadi karena beberapa alasan, seperti:

1. Keterbatasan sarana promosi: Bimbel rumahan belum menemukan platform yang tepat untuk memperkenalkan layanannya. Promosi umumnya masih dilakukan secara tradisional, seperti menyebar pamflet atau mengandalkan promosi dari mulut ke mulut, sehingga jangkauannya terbatas pada lingkungan sekitar.
2. Reputasi merek yang belum seimbang: Bimbel berjaringan sudah memiliki nama dan kepercayaan publik, sedangkan bimbel rumahan harus membangun kepercayaan dari nol.
3. Minimnya informasi bagi orang tua: Orang tua tidak tahu bahwa ada alternatif di dekat rumah, dan tidak ada tempat untuk membandingkan harga jarak, serta kualitas secara mudah.

Akibatnya muncul dua masalah yang saling berkaitan:

1. Bimbel rumahan sulit ditemukan dan berkembang: Pengajar lokal kehilangan peluang mendapat murid, padahal biayanya lebih terjangkau.
2. Orang tua kesulitan mencari alternatif: Keluarga dengan anggaran terbatas, atau yang tidak ingin memakai bimbel konvensional (contoh: Kumon, Ganesha Operation, dll.) tidak tahu ke mana harus mencari tempat les yang dekat, murah, dan dapat dipercaya.

"LesKita" dibuat sebagai aplikasi hybrid (Android, iOS, dan web dari satu codebase) yang menjadi platform promosi digital bagi bimbel rumahan sekaligus membantu orang tua menemukan les terdekat yang sesuai anggaran.

## 2. Target Pengguna

1. Orang tua dan Pelajar: User yang mencari tempat les untuk anak usia SD sampai SMA, dengan anggaran terbatas atau yang menginginkan alternatif selain bimbel konvensional
Kebutuhan: Menemukan les yang dekat, terjangkau, dan terpercaya
2. Pengajar/pemilik bimbel rumahan: Guru atau warga yang membuka kelas di rumah atau usaha mandiri di suatu tempat dan belum punya sarana promosi yang luas
Kebutuhan: Dikenal masyarakat dan mendapat calon murid

## 3. Kebutuhan Pengguna

1. Mencari bimbel berdasarkan jenjang dan mata pelajaran (SD, SMP, SMA, Calistung, Bahasa Inggris) agar sesuai usia dan kebutuhan anak
2. Menemukan bimbel yang dekat dengan rumah, dengan memilih lokasi dan melihat jarak tiap bimbel
3. Mengetahui biaya sebelum memutuskan, per sesi atau per bulan, supaya bisa dicocokkan dengan anggaran keluarga
4. Menilai kepercayaan dan kualitas: rating, ulasan orang tua, penanda terverifikasi, profil tutor, jadwal, dan fasilitas
5. Menghubungi bimbel dan mencoba kelas dengan mudah lewat WhatsApp dan pendaftaran trial, tanpa harus datang langsung dulu
6. Memiliki akun yang aman dan mudah dipulihkan: aturan password 6-12 karakter, show/hide password, serta fitur lupa password
7. Mendapat pengingat dan pembaruan: jadwal trial, balasan pemilik bimbel, dan tagihan
8. Mengelola aktivitas belajar anak (bimbel tersimpan, jadwal dan riwayat) dalam satu profil
9. Pengajar membutuhkan sarana promosi di era digital ini, agar bimbel rumahannya dikenal lebih luas daripada lewat pamflet dan mulut ke mulut
10. Mudah diexplore, membutuhkan UI yang konsisten/seragam, seperti Navbar

## 4. Pemetaan Kebutuhan ke Layar dan Komponen

| No | Kebutuhan | Layar | Komponen / Fitur | Status |
|----|-----------|-------|------------------|--------|
| 1 | Cari per jenjang/mapel | Home, Search | Daftar kategori, kolom pencarian, tombol filter | Tampilan jadi; fungsi pencarian [cek] |
| 2 | Bimbel terdekat | Home, Detail | Pemilih lokasi (modal, 8 kota Jawa Tengah), daftar "Paling Dekat", penanda jarak | Jadi (data statis) |
| 3 | Informasi biaya | Home, Detail | Harga per sesi/bulan, "formatRupiah", bagian "Rekomendasi Hemat" | Jadi (data statis) |
| 4 | Kepercayaan & kualitas | Home, Detail | Rating, ikon "VerifiedIcon", kartu tutor, jadwal, fasilitas, ulasan | Jadi (data statis) |
| 5 | Hubungi & coba kelas | Detail, Notification | Tombol WhatsApp ("Linking" ke wa.me), tombol "Daftar Trial" |Routing ke whatsapp dan trial masih simulasi |
| 6 | Akun aman | Login, Register, Forgot Password | `passwordInput` (6-12 karakter, show/hide), `message`, alur reset | Validasi jadi; autentikasi simulasi |
| 7 | Pengingat & pembaruan | Notification | Kartu jadwal trial, balasan pemilik, tagihan, grup diskusi wali murid | Tampilan jadi (data statis) |
| 8 | Kelola aktivitas anak | Profile | Statistik, menu bimbel tersimpan, jadwal & riwayat, pengaturan, logout | Tampilan jadi; logout berfungsi |
| 9 | Promosi bimbel rumahan | Profile, Home | Kartu "Daftarkan Bimbel Rumahan Saya", kartu "Daftar Tutor" | Tampilan jadi; pendaftaran belum ada |
| 10 | Navigasi konsisten | Home, Search, Notification, Profile | `stickyHeader`, bottom navigation, Expo Router | Jadi |

## 5. Alasan Keputusan Desain

- Hybrid dengan Expo, React Native, dan react-native-web, dimana satu codebase berjalan di Android, iOS, dan browser, sehingga menjangkau lebih banyak pengguna dengan biaya pengembangan lebih kecil
- Expo Router (routing berbasis file), dimana setiap layar adalah satu file, dan halaman detail memakai rute dinamis `[id]` sehingga satu layar melayani semua bimbel
- Data dipisah dari tampilan (`bimbelDetail.ts`, `locations.ts`) dengan tipe TypeScript, komponen-komponen tersebut bersifat statis yang nantinya mudah diganti sumber dari API
- Komponen dipakai ulang (`PasswordInput`, `StickyHeader`, `Message`, set
  ikon SVG), sehingga tampilan konsisten dan perubahan cukup di satu tempat
- Ikon SVG (`react-native-svg`) di semua ukuran layar dan tidak bergantung pada paket ikon tambahan
- Header menempel dan memperhitungkan safe area, sehingga identitas aplikasi dan akses notifikasi/profil selalu terlihat dan tidak tertutup status bar
- Palet hijau dan oranye, kartu bersudut membulat, supaya terkesan ramah dan hangat, sesuai orang tua dan suasana bimbel rumahan, bukan korporat
- Bahasa Indonesia dan sapaan akrab ("Halo, Bu Sarah!", "Maju Bersama Tetangga") agar terasa dekat dengan komunitas lokal
- WhatsApp sebagai channel komunikasi antar user dengan admin bimbel, saluran yang sudah dipakai sehari-hari oleh orang tua dan pengajar rumahan, sehingga tidak perlu fitur chat sendiri
- Validasi di sisi klien (email, password 6-12 karakter, konfirmasi password) memberi umpan balik langsung sebelum data dikirim
- Bimbel rumahan tampil setara lewat kartu seragam (jarak, rating, harga, keunggulan), sehingga bimbel kecil punya peluang yang sama untuk dilihat

## 6. Rencana Pengembangan

Saat ini aplikasi masih di tahap Prototype/Dummy Project, mengedepankan Frontend dan User Flow saja, dengan alur: login/register/lupa password, home, search, detail bimbel, notifikasi, profil. Autentikasi dan pendaftaran trial juga masih simulasi.

Rencana: 
- Pencarian dan filter yang berfungsi (kategori, jarak, harga), memasukkan bimbel ke favorite, dan komponen "Navbar" bersama, mengingat sekarang masih ditulis di masing-masing page, sehingga perlu dijadikan satu sumber data bimbel untuk semua layar
- Backend dan autentikasi nyata (mis. Firebase), data bimbel dari database, lokasi berbasis GPS dan peta, notifikasi push
- Fitur tambahan untuk role pengajar (daftar, kelola, dan promosikan bimbel), pemesanan trial yang tercatat, ulasan oleh pengguna, pembayaran (QRIS/transfer), verifikasi bimbel oleh admin
