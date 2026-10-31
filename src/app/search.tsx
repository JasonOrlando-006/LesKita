import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BellIcon,
  FilterIcon,
  HomeIcon,
  ListIcon,
  MapIcon,
  MapPinFillIcon,
  PersonIcon,
  PinIcon,
  SearchIcon,
  SearchTabIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
} from '../components/iconComp';

// Dummy data — replace with real search/filter logic once backend data exists.
const DISTANCE_FILTERS = ['< 1 km', '1 - 3 km', '3 - 5 km', 'Seluruh Kota'];

const QUICK_FILTERS = [
  { id: 'tarif', label: 'Tarif Terjangkau' },
  { id: 'trial', label: 'Bisa Trial Gratis' },
  { id: 'datang', label: 'Guru Datang ke Rumah' },
];

const RESULTS = [
  {
    id: '1',
    rating: 4.9,
    badge: 'Bimbel Rumahan Terverifikasi',
    name: 'Bimbel Prestasi Bunda Ina',
    distance: '800 m',
    area: 'Tebet Barat Dalam',
    subjects: ['Matematika SD', 'Calistung', 'IPA Dasar'],
    tags: ['Trial Gratis 1x Pertemuan', 'Maks. 5 Anak / Kelompok'],
    priceLabel: 'Biaya per sesi',
    price: 'Rp 35.000',
    priceNote: '/ 90 mnt',
  },
  {
    id: '2',
    rating: 4.8,
    badge: 'Tutor Tersertifikasi',
    name: 'Rumah Les Cerdas Mandiri',
    distance: '1.8 km',
    area: 'Pancoran Timur',
    subjects: ['B. Inggris SD-SMP', 'Matematika'],
    tags: ['Modul & LKS Disediakan', 'Kelas Sore (16.00 - 18.00)'],
    priceLabel: 'Paket bulanan',
    price: 'Rp 280.000',
    priceNote: '/ 8 sesi',
  },
  {
    id: '3',
    rating: 5.0,
    badge: 'Komunitas Terpercaya',
    name: 'Sanggar Belajar Al-Fatih',
    distance: '3.2 km',
    area: 'Manggarai Selatan',
    subjects: ['Ngaji & Tahsin', 'Bimbel PR SD'],
    tags: ['Infaq Terjangkau', "Senin - Jum'at Ba'da Ashar"],
    priceLabel: 'Paket per bulan',
    price: 'Rp 220.000',
    priceNote: '/ bulan',
  },
  {
    id: '4',
    rating: 4.9,
    badge: 'Guru Privat Datang ke Rumah',
    name: 'Bimbel Privat Kak Rizky',
    distance: '4.5 km',
    area: 'Melayani Area Jaksel',
    subjects: ['Fisika SMP/SMA', 'Matematika Wajib'],
    tags: ['Bebas Biaya Transportasi', 'Jadwal Fleksibel'],
    priceLabel: 'Tarif per jam',
    price: 'Rp 65.000',
    priceNote: '/ 60 mnt',
  },
];

export default function SearchScreen() {
  const [activeDistance, setActiveDistance] = useState('< 1 km');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  const toggleQuickFilter = (id: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={s.topBar}>
          <View>
            <Text style={s.brand}>LesKita</Text>
            <Text style={s.brandSub}>Cari Bimbel</Text>
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

        {/* Search bar */}
        <View style={s.searchRow}>
          <View style={s.searchBar}>
            <SearchIcon />
            <Text style={s.searchPlaceholder} numberOfLines={1}>
              Cari bimbel matematika, ngaji, calistung...
            </Text>
          </View>
          <TouchableOpacity style={s.filterButton}>
            <FilterIcon />
          </TouchableOpacity>
        </View>

        {/* Distance filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.distanceRow}>
          {DISTANCE_FILTERS.map((d) => {
            const active = d === activeDistance;
            return (
              <TouchableOpacity
                key={d}
                style={[s.distanceChip, active && s.distanceChipActive]}
                onPress={() => setActiveDistance(d)}
              >
                {d === '< 1 km' && (
                  <PinIcon size={13} color={active ? '#FFFFFF' : '#1F6F5C'} />
                )}
                <Text style={[s.distanceChipText, active && s.distanceChipTextActive]}>{d}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Result count + view toggle */}
        <View style={s.resultRow}>
          <View style={s.resultPill}>
            <Text style={s.resultPillText}>Ditemukan</Text>
            <Text style={s.resultPillCount}> {RESULTS.length} Bimbel</Text>
          </View>
          <View style={s.viewToggle}>
            <TouchableOpacity
              style={[s.viewToggleBtn, view === 'list' && s.viewToggleBtnActive]}
              onPress={() => setView('list')}
            >
              <ListIcon size={14} color={view === 'list' ? '#1A2B2A' : '#9AA5A3'} />
              <Text style={[s.viewToggleText, view === 'list' && s.viewToggleTextActive]}>Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.viewToggleBtn, view === 'map' && s.viewToggleBtnActive]}
              onPress={() => setView('map')}
            >
              <MapIcon size={14} color={view === 'map' ? '#1A2B2A' : '#9AA5A3'} />
              <Text style={[s.viewToggleText, view === 'map' && s.viewToggleTextActive]}>Peta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map preview (static placeholder — no real map library wired up) */}
        <View style={s.mapBox}>
          <View style={[s.mapPricePin, { top: 14, left: 14 }]}>
            <MapPinFillIcon size={11} />
            <Text style={s.mapPricePinText}>Rp 35k/sesi</Text>
          </View>
          <View style={[s.mapPricePin, s.mapPricePinOrange, { bottom: 54, right: 10 }]}>
            <Text style={s.mapPricePinTextOrange}>Rp 280k/bln</Text>
          </View>
          <View style={[s.mapPricePin, { bottom: 14, left: 54 }]}>
            <Text style={s.mapPricePinText}>Rp 220k/bln</Text>
          </View>
          <View style={[s.mapPricePin, { bottom: 14, right: 70 }]}>
            <Text style={s.mapPricePinText}>Rp 65k/jam</Text>
          </View>
          <View style={s.mapCenterDot} />
          <View style={s.mapRadiusTag}>
            <Text style={s.mapRadiusTagText}>Radius aktif: {activeDistance}</Text>
          </View>
        </View>

        {/* Quick filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.quickRow}>
          {QUICK_FILTERS.map((f) => {
            const active = activeQuickFilters.includes(f.id);
            return (
              <TouchableOpacity
                key={f.id}
                style={[s.quickChip, active && s.quickChipActive]}
                onPress={() => toggleQuickFilter(f.id)}
              >
                <TagIcon size={13} color={active ? '#1F6F5C' : '#6B7280'} />
                <Text style={[s.quickChipText, active && s.quickChipTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results list */}
        {view === 'list' &&
          RESULTS.map((item) => (
            <View key={item.id} style={s.resultCard}>
              <View style={s.resultCardImage}>
                <View style={s.ratingBadge}>
                  <StarIcon size={11} />
                  <Text style={s.ratingBadgeText}>{item.rating}</Text>
                </View>
              </View>
              <View style={s.resultCardInfo}>
                <View style={s.badgePill}>
                  <Text style={s.badgePillText}>{item.badge}</Text>
                </View>
                <Text style={s.resultTitle}>{item.name}</Text>
                <View style={s.locationRow}>
                  <PinIcon size={12} />
                  <Text style={s.locationText}>
                    {item.distance} · {item.area}
                  </Text>
                </View>

                <View style={s.subjectRow}>
                  {item.subjects.map((subj) => (
                    <View key={subj} style={s.subjectChip}>
                      <Text style={s.subjectChipText}>{subj}</Text>
                    </View>
                  ))}
                </View>

                <View style={s.tagRow}>
                  {item.tags.map((tag) => (
                    <View key={tag} style={s.featureTag}>
                      <Text style={s.featureTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={s.priceActionRow}>
                  <View>
                    <Text style={s.priceLabel}>{item.priceLabel}:</Text>
                    <Text style={s.priceValue}>
                      {item.price} <Text style={s.priceNote}>{item.priceNote}</Text>
                    </Text>
                  </View>
                  <View style={s.actionButtons}>
                    <TouchableOpacity style={s.whatsappButton}>
                      <Text style={s.whatsappButtonText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.detailButton}>
                      <Text style={s.detailButtonText}>Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

        {view === 'map' && (
          <Text style={s.mapHint}>
            Tampilan peta penuh belum tersedia di versi ini — gunakan tab "Daftar" untuk melihat semua hasil.
          </Text>
        )}

        {/* Trust note */}
        <View style={s.trustCard}>
          <View style={s.trustIcon}>
            <ShieldIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.trustTitle}>Jaminan Belajar Aman & Ramah</Text>
            <Text style={s.trustSub}>
              Semua bimbel rumahan dan guru privat di LesKita telah melalui verifikasi identitas,
              lokasi tempat tinggal, serta evaluasi review dari sesama orang tua sekitar.
            </Text>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom navigation */}
      <View style={s.bottomNav}>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/home')}>
          <HomeIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Beranda</Text>
        </TouchableOpacity>
        <View style={s.navItem}>
          <SearchTabIcon color="#1F6F5C" />
          <Text style={[s.navLabel, s.navLabelActive]}>Cari Bimbel</Text>
        </View>
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

  searchRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
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

  distanceRow: { gap: 8, marginTop: 14, paddingRight: 12 },
  distanceChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  distanceChipActive: { backgroundColor: '#1F6F5C', borderColor: '#1F6F5C' },
  distanceChipText: { fontSize: 12, fontWeight: '600', color: '#1A2B2A' },
  distanceChipTextActive: { color: '#FFFFFF' },

  resultRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16,
  },
  resultPill: { flexDirection: 'row', alignItems: 'baseline' },
  resultPillText: { fontSize: 13, color: '#1A2B2A', fontWeight: '600' },
  resultPillCount: { fontSize: 13, color: '#1F6F5C', fontWeight: '700' },
  viewToggle: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 3,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  viewToggleBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
  },
  viewToggleBtnActive: { backgroundColor: '#EDF2F1' },
  viewToggleText: { fontSize: 12, fontWeight: '600', color: '#9AA5A3' },
  viewToggleTextActive: { color: '#1A2B2A' },

  mapBox: {
    marginTop: 14, height: 170, borderRadius: 18, backgroundColor: '#B9C7CE',
    overflow: 'hidden',
  },
  mapCenterDot: {
    position: 'absolute', top: '50%', left: '50%', width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#1F6F5C', marginTop: -7, marginLeft: -7, borderWidth: 3, borderColor: '#FFFFFF',
  },
  mapPricePin: {
    position: 'absolute', flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FFFFFF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5,
  },
  mapPricePinOrange: { backgroundColor: '#F39A1F' },
  mapPricePinText: { fontSize: 10, fontWeight: '700', color: '#1A2B2A' },
  mapPricePinTextOrange: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  mapRadiusTag: {
    position: 'absolute', top: 12, left: '50%', marginLeft: -62,
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
  },
  mapRadiusTagText: { fontSize: 10, fontWeight: '700', color: '#1A2B2A' },
  mapHint: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 20 },

  quickRow: { gap: 8, marginTop: 14, paddingRight: 12 },
  quickChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  quickChipActive: { backgroundColor: '#E6F0EE', borderColor: '#1F6F5C' },
  quickChipText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  quickChipTextActive: { color: '#1F6F5C' },

  resultCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginTop: 14, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  resultCardImage: { height: 90, backgroundColor: '#DCE7E4', justifyContent: 'flex-start' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4, margin: 10,
  },
  ratingBadgeText: { fontSize: 11, fontWeight: '700', color: '#1A2B2A' },
  resultCardInfo: { padding: 14 },
  badgePill: {
    alignSelf: 'flex-start', backgroundColor: '#E6F0EE', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3, marginBottom: 6,
  },
  badgePillText: { fontSize: 10, fontWeight: '700', color: '#1F6F5C' },
  resultTitle: { fontSize: 15, fontWeight: '700', color: '#1A2B2A' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 12, color: '#6B7280' },
  subjectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  subjectChip: { backgroundColor: '#F3F6F6', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  subjectChipText: { fontSize: 10, color: '#1A2B2A', fontWeight: '600' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  featureTag: { backgroundColor: '#FDEBD2', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  featureTagText: { fontSize: 10, color: '#B4760E', fontWeight: '600' },
  priceActionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12,
  },
  priceLabel: { fontSize: 11, color: '#6B7280' },
  priceValue: { fontSize: 15, fontWeight: '700', color: '#1F6F5C', marginTop: 2 },
  priceNote: { fontSize: 11, color: '#6B7280', fontWeight: '400' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  whatsappButton: { backgroundColor: '#F39A1F', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  whatsappButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  detailButton: { backgroundColor: '#1F6F5C', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 9 },
  detailButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },

  trustCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E6F0EE',
    borderRadius: 16, padding: 16, marginTop: 20,
  },
  trustIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  trustTitle: { fontSize: 13, fontWeight: '700', color: '#1A2B2A' },
  trustSub: { fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 17 },

  bottomNav: {
    position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF',
    flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: '#E2E8EE',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navLabel: { fontSize: 11, color: '#9AA5A3', fontWeight: '600' },
  navLabelActive: { color: '#1F6F5C' },
});