import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    ArrowRightIcon,
    BellIcon,
    BlocksIcon,
    BookOpenIcon,
    CalculatorIcon,
    ChevronRightIcon,
    FilterIcon,
    GraduationCapIcon,
    GroupIcon,
    HomeIcon,
    HouseKeyIcon,
    PersonIcon,
    PinIcon,
    SearchIcon,
    SearchTabIcon,
    StarIcon,
    TranslateIcon,
    VerifiedIcon,
} from '../components/iconComp';

// Dummy data
const CATEGORIES = [
  { id: 'sd', label: 'SD', Icon: GraduationCapIcon },
  { id: 'smp', label: 'SMP', Icon: BookOpenIcon },
  { id: 'sma', label: 'SMA', Icon: CalculatorIcon },
  { id: 'calistung', label: 'Calistung Anak', Icon: BlocksIcon },
  { id: 'inggris', label: 'Bahasa Inggris', Icon: TranslateIcon },
];

const NEARBY = [
  {
    id: '1',
    name: 'Bimbel Bu Retno Ceria',
    subject: 'SD Tematik & Calistung Menyenangkan',
    distance: '0.4 km',
    rating: 4.9,
    reviews: 42,
    price: 'Rp 25.000',
    priceUnit: '/ sesi',
    tags: ['Maks. 5 anak per sesi', 'Bisa Guru Datang ke Rumah'],
    verified: true,
  },
  {
    id: '2',
    name: 'Rumah Belajar Bintang Prestasi',
    subject: 'Matematika & Sains Terpadu SMP',
    distance: '0.8 km',
    rating: 4.9,
    reviews: 56,
    price: 'Rp 200.000',
    priceUnit: '/ bln',
    note: '4x seminggu',
    tags: ['Fasilitas Modul Lengkap', 'Konsultasi PR Harian'],
    verified: true,
  },
];

const RECOMMENDED = [
  {
    id: '3',
    name: 'English Corner Pak Dimas',
    subject: 'Percakapan & Grammar Dasar Anak',
    distance: '1.1 km',
    rating: 4.95,
    price: 'Rp 30.000',
    priceUnit: '/ sesi',
    badge: 'Diskon 20%',
  },
  {
    id: '4',
    name: 'Rumah Tahsin Baiti',
    subject: 'Iqro Cepat & Tahsin',
    distance: '0.9 km',
    rating: 4.9,
    price: 'Rp 20.000',
    priceUnit: '/ sesi',
    badge: 'Bisa Privat',
  },
];

export default function HomeScreen() {
  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={s.topBar}>
          <View>
            <Text style={s.brand}>LesKita</Text>
            <Text style={s.brandSub}>Beranda</Text>
          </View>
          <View style={s.topBarActions}>
            <TouchableOpacity style={s.iconButton} onPress={() => router.push('/notification')}>
              <BellIcon />
            </TouchableOpacity>
            <TouchableOpacity style={s.avatarSmall} onPress={() => router.push('/profile')}>
              <PersonIcon size={18} color="#1F6F5C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location + level */}
        <View style={s.locationRow}>
          <View style={s.locationLeft}>
            <PinIcon size={15} />
            <Text style={s.locationText}>Sukolilo, Surabaya</Text>
            <Text style={s.locationChange}>(Ubah)</Text>
          </View>
          <View style={s.levelBadge}>
            <Text style={s.levelBadgeText}>Level Pintar</Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={s.greetingRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.greetingSmall}>Selamat sore, Bunda</Text>
            <Text style={s.greetingTitle}>Halo, Bu Sarah!</Text>
            <Text style={s.greetingSub}>Temukan les terbaik & ramah kantong untuk si kecil</Text>
          </View>
          <View style={s.avatarLargeWrap}>
            <View style={s.avatarLarge}>
              <PersonIcon size={28} color="#1F6F5C" />
            </View>
            <View style={s.avatarCheck}>
              <VerifiedIcon size={14} color="#1F6F5C" />
            </View>
          </View>
        </View>

        {/* Search bar */}
        <View style={s.searchRow}>
          <View style={s.searchBar}>
            <SearchIcon />
            <Text style={s.searchPlaceholder} numberOfLines={1}>
              Cari bimbel matematika, calistung, ngaji...
            </Text>
          </View>
          <TouchableOpacity style={s.filterButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>

        {/* Promo banner */}
        <View style={s.promoCard}>
          <View style={s.promoDecoCircle} />
          <View style={s.promoBadge}>
            <GroupIcon />
            <Text style={s.promoBadgeText}>Gotong Royong Edukasi</Text>
          </View>
          <Text style={s.promoTitle}>Dukung Pengajar Lokal & Bimbel Rumahan Berdaya</Text>
          <Text style={s.promoSub}>Belajar lebih dekat, akrab, dan terjangkau di sekitar rumah.</Text>
          <TouchableOpacity style={s.promoButton}>
            <Text style={s.promoButtonText}>Diskon Biaya Trial 50%</Text>
            <ArrowRightIcon size={15} color="#1A2B2A" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Pilih Kategori Les</Text>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Text style={s.sectionLink}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categoryRow}>
          {CATEGORIES.map((cat) => {
            const active = cat.id === 'calistung';
            return (
              <TouchableOpacity key={cat.id} style={s.categoryItem}>
                <View style={[s.categoryCircle, active && s.categoryCircleActive]}>
                  <cat.Icon size={22} color={active ? '#F39A1F' : '#1F6F5C'} />
                </View>
                <Text style={s.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Nearby Feature */}
        <View style={s.sectionHeader}>
          <View style={s.sectionTitleRow}>
            <PinIcon size={16} color="#1A2B2A" />
            <Text style={s.sectionTitle}>Bimbel Rumahan Paling Dekat</Text>
          </View>
          <View style={s.distancePill}>
            <Text style={s.distancePillText}>{'< 1.5 km'}</Text>
          </View>
        </View>

        {NEARBY.map((item) => (
          <View key={item.id} style={s.nearbyCard}>
            <View style={s.nearbyImage} />
            <View style={s.nearbyInfo}>
              <View style={s.nearbyTopRow}>
                <View style={s.distanceTag}>
                  <Text style={s.distanceTagText}>{item.distance}</Text>
                </View>
                <View style={s.ratingRow}>
                  <StarIcon />
                  <Text style={s.ratingText}>
                    {item.rating} ({item.reviews})
                  </Text>
                </View>
              </View>
              <Text style={s.cardTitle}>{item.name}</Text>
              <Text style={s.cardSubtitle}>{item.subject}</Text>
              <View style={s.priceRow}>
                {item.verified && <VerifiedIcon size={14} />}
                <Text style={s.priceLabel}>Mulai </Text>
                <Text style={s.priceValue}>{item.price}</Text>
                <Text style={s.priceUnit}> {item.priceUnit}</Text>
                {item.note && <Text style={s.priceNote}> ({item.note})</Text>}
              </View>
              <View style={s.tagRow}>
                {item.tags.map((tag) => (
                  <View key={tag} style={s.tagChip}>
                    <Text style={s.tagChipText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Recommended */}
        <View style={s.sectionHeader}>
          <View>
            <Text style={s.sectionTitle}>Rekomendasi Hemat & Berkualitas</Text>
            <Text style={s.sectionSub}>Pilihan terfavorit orang tua di sekitar Sukolilo</Text>
          </View>
          <ChevronRightIcon />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.recommendRow}>
          {RECOMMENDED.map((item) => (
            <View key={item.id} style={s.recommendCard}>
              <View style={s.recommendImage}>
                <View style={s.recommendBadge}>
                  <Text style={s.recommendBadgeText}>{item.badge}</Text>
                </View>
                <TouchableOpacity style={s.bookmarkButton}>
                  <View />
                </TouchableOpacity>
              </View>
              <View style={s.recommendTopRow}>
                <View style={s.distanceInline}>
                  <PinIcon size={12} />
                  <Text style={s.distanceInlineText}>{item.distance}</Text>
                </View>
                <View style={s.ratingRow}>
                  <StarIcon size={12} />
                  <Text style={s.ratingTextSmall}>{item.rating}</Text>
                </View>
              </View>
              <Text style={s.recommendTitle} numberOfLines={1}>{item.name}</Text>
              <Text style={s.recommendSubtitle} numberOfLines={1}>{item.subject}</Text>
              <Text style={s.recommendPrice}>
                {item.price} <Text style={s.priceUnit}>{item.priceUnit}</Text>
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Become a tutor??? */}
        <View style={s.ctaCard}>
          <View style={s.ctaIcon}>
            <HouseKeyIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.ctaTitle}>Punya ruang belajar di rumah?</Text>
            <Text style={s.ctaSub}>
              Buka kelas bimbel sendirimu & bantu anak-anak belajar dengan keceriaan.
            </Text>
          </View>
          <TouchableOpacity style={s.ctaButton} onPress={() => router.push('/profile')}>
            <Text style={s.ctaButtonText}>Daftar Tutor</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom navigation bar */}
      <View style={s.bottomNav}>
        <View style={s.navItem}>
          <HomeIcon color="#1F6F5C" />
          <Text style={[s.navLabel, s.navLabelActive]}>Beranda</Text>
        </View>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/search')}>
          <SearchTabIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Cari Bimbel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/notification')}>
          <BellIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Notifikasi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/profile')}>
          <PersonIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Profil Saya</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F6F6' },
  scroll: { paddingHorizontal: 18, paddingTop: 16 },

  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 17, fontWeight: '700', color: '#1F6F5C' },
  brandSub: { fontSize: 12, color: '#6B7280', marginTop: -2 },
  topBarActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarSmall: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#E6F0EE',
    alignItems: 'center', justifyContent: 'center',
  },

  locationRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16,
  },
  locationLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 13, fontWeight: '600', color: '#1A2B2A' },
  locationChange: { fontSize: 12, color: '#1F6F5C', fontWeight: '600' },
  levelBadge: { backgroundColor: '#FDEBD2', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  levelBadgeText: { fontSize: 11, fontWeight: '700', color: '#B4760E' },

  greetingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  greetingSmall: { fontSize: 13, color: '#6B7280' },
  greetingTitle: { fontSize: 22, fontWeight: '700', color: '#1A2B2A', marginTop: 2 },
  greetingSub: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  avatarLargeWrap: { marginLeft: 12 },
  avatarLarge: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#E6F0EE',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarCheck: {
    position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
  },

  searchRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  searchPlaceholder: { flex: 1, fontSize: 13, color: '#9AA5A3' },
  filterButton: {
    width: 46, height: 46, borderRadius: 14, backgroundColor: '#1F6F5C',
    alignItems: 'center', justifyContent: 'center',
  },

  promoCard: {
    marginTop: 18, backgroundColor: '#1A5C52', borderRadius: 20, padding: 20, overflow: 'hidden',
  },
  promoDecoCircle: {
    position: 'absolute', right: -30, top: -10, width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  promoBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
    marginBottom: 10,
  },
  promoBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  promoTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', lineHeight: 24, maxWidth: '85%' },
  promoSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 8, maxWidth: '80%' },
  promoButton: {
    flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
    backgroundColor: '#F39A1F', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 11, marginTop: 16,
  },
  promoButtonText: { color: '#1A2B2A', fontSize: 13, fontWeight: '700' },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 24, marginBottom: 12,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1A2B2A' },
  sectionSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  sectionLink: { fontSize: 13, fontWeight: '600', color: '#1F6F5C' },
  distancePill: { backgroundColor: '#E6F0EE', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  distancePillText: { fontSize: 11, fontWeight: '700', color: '#1F6F5C' },

  categoryRow: { gap: 18, paddingRight: 12 },
  categoryItem: { alignItems: 'center', width: 64 },
  categoryCircle: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#E6F0EE',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  categoryCircleActive: { backgroundColor: '#FCE3C6' },
  categoryLabel: { fontSize: 11, color: '#1A2B2A', textAlign: 'center', fontWeight: '600' },

  nearbyCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 10, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  nearbyImage: { width: 84, height: 96, borderRadius: 12, backgroundColor: '#DCE7E4' },
  nearbyInfo: { flex: 1, marginLeft: 12 },
  nearbyTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  distanceTag: { backgroundColor: '#E6F0EE', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  distanceTagText: { fontSize: 11, fontWeight: '700', color: '#1F6F5C' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#1A2B2A' },
  ratingTextSmall: { fontSize: 11, fontWeight: '700', color: '#1A2B2A' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1A2B2A', marginTop: 6 },
  cardSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 2 },
  priceLabel: { fontSize: 12, color: '#6B7280' },
  priceValue: { fontSize: 13, fontWeight: '700', color: '#1F6F5C' },
  priceUnit: { fontSize: 11, color: '#6B7280' },
  priceNote: { fontSize: 11, color: '#F39A1F', fontWeight: '600' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tagChip: { backgroundColor: '#F3F6F6', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  tagChipText: { fontSize: 10, color: '#1A2B2A', fontWeight: '600' },

  recommendRow: { gap: 12, paddingRight: 12 },
  recommendCard: { width: 170 },
  recommendImage: { width: 170, height: 110, borderRadius: 14, backgroundColor: '#DCE7E4', justifyContent: 'space-between' },
  recommendBadge: {
    alignSelf: 'flex-start', backgroundColor: '#F39A1F', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4, margin: 8,
  },
  recommendBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  bookmarkButton: {
    alignSelf: 'flex-end', width: 28, height: 28, borderRadius: 14, backgroundColor: '#1F6F5C',
    alignItems: 'center', justifyContent: 'center', margin: 8,
  },
  recommendTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  distanceInline: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  distanceInlineText: { fontSize: 11, color: '#6B7280' },
  recommendTitle: { fontSize: 13, fontWeight: '700', color: '#1A2B2A', marginTop: 4 },
  recommendSubtitle: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  recommendPrice: { fontSize: 13, fontWeight: '700', color: '#1F6F5C', marginTop: 4 },

  ctaCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E8F0FE',
    borderRadius: 16, padding: 16, marginTop: 24,
  },
  ctaIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FDEBD2',
    alignItems: 'center', justifyContent: 'center',
  },
  ctaTitle: { fontSize: 14, fontWeight: '700', color: '#1A2B2A' },
  ctaSub: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  ctaButton: { backgroundColor: '#1F6F5C', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  ctaButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  bottomNav: {
    position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF',
    flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: '#E2E8EE',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navLabel: { fontSize: 11, color: '#9AA5A3', fontWeight: '600' },
  navLabelActive: { color: '#1F6F5C' },
});