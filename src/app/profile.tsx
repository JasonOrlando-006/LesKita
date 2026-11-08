import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BellIcon,
  BookOpenIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  GroupIcon,
  HomeIcon,
  HouseKeyIcon,
  LogoutIcon,
  MessageIcon,
  PersonIcon,
  PinIcon,
  SearchTabIcon,
  SlidersIcon,
  TargetIcon,
  VerifiedIcon,
} from '../components/iconComp';
import { StickyHeader } from '../components/stickyHeader';

const STATS = [
  { label: 'Anak Terdaftar', value: '2' },
  { label: 'Bimbel Aktif', value: '1' },
  { label: 'Tersimpan', value: '5' },
];

const LEARNING_MENU = [
  {
    id: 'saved',
    Icon: BookmarkIcon,
    title: 'Bimbel yang Disimpan',
    subtitle: '5 tempat les favorit tersimpan',
  },
  {
    id: 'schedule',
    Icon: CalendarIcon,
    title: 'Jadwal & Riwayat Les Anak',
    subtitle: 'Cek pertemuan bimbel minggu ini',
  },
];

const COMMUNITY_MENU = [
  {
    id: 'guide',
    Icon: BookOpenIcon,
    title: 'Syarat & Panduan Standar Bimbel',
    subtitle: 'Prosedur ruang belajar sehat & aman',
  },
  {
    id: 'help',
    Icon: MessageIcon,
    title: 'Pusat Bantuan & Komunitas Pengajar',
    subtitle: 'Grup sharing tutor & admin LesKita',
  },
];

const SETTINGS_MENU = [
  {
    id: 'settings',
    Icon: SlidersIcon,
    title: 'Pengaturan Notifikasi & Akun',
    subtitle: 'Keamanan, nomor HP & privasi',
    danger: false,
  },
  {
    id: 'logout',
    Icon: LogoutIcon,
    title: 'Keluar Akun',
    subtitle: 'Keluar dari sesi aplikasi LesKita',
    danger: true,
  },
];

export default function ProfileScreen() {
  return (
    <View style={s.screen}>
      {/* HEADER */}
      <StickyHeader>
        <View style={s.brandRow}>
          <View style={{ marginLeft: 8 }}>
            <Text style={s.brand}>LesKita</Text>
            <Text style={s.brandSub}>Profil Saya</Text>
          </View>
        </View>
        <View style={s.topBarActions}>
          <TouchableOpacity style={s.iconButton} onPress={() => router.push('/notification')}>
            <BellIcon />
          </TouchableOpacity>
          <View style={s.avatarSmall}>
            <PersonIcon size={18} color="#1F6F5C" />
          </View>
        </View>
      </StickyHeader>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* PROFILE DATA */}
        <View style={s.profileCard}>
          <View style={s.profileTopRow}>
            <View style={s.avatarWrap}>
              <View style={s.avatarLarge}>
                <PersonIcon size={28} color="#1F6F5C" />
              </View>
              <View style={s.avatarCheck}>
                <VerifiedIcon size={14} />
              </View>
            </View>
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={s.profileName}>Ibu Sarah Amelia</Text>
              <View style={s.roleBadge}>
                <Text style={s.roleBadgeText}>Orang Tua Murid</Text>
              </View>
              <View style={s.locationRow}>
                <PinIcon size={13} />
                <Text style={s.locationText}>Rungkut, Surabaya</Text>
              </View>
            </View>
          </View>

          <View style={s.statsRow}>
            {STATS.map((stat, i) => (
              <View key={stat.label} style={[s.statItem, i < STATS.length - 1 && s.statDivider]}>
                <Text style={s.statLabel}>{stat.label}</Text>
                <Text style={s.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* BECOME A TUTOR CHOICE */}
        <View style={s.ctaCard}>
          <View style={s.ctaDecoCircle} />
          <View style={s.ctaBadge}>
            <BriefcaseIcon />
            <Text style={s.ctaBadgeText}>Peluang Wirausaha Komunitas</Text>
          </View>
          <Text style={s.ctaTitle}>Punya Usaha Bimbel di Rumah?</Text>
          <Text style={s.ctaSub}>
            Gabung Jadi Mitra LesKita! Jangkau ratusan tetangga & murid sekitar tanpa repot
            cetak pamflet kertas lagi.
          </Text>
          <View style={s.ctaTagRow}>
            <View style={s.ctaTag}>
              <CheckCircleIcon size={12} />
              <Text style={s.ctaTagText}>100% Gratis Pendaftaran</Text>
            </View>
            <View style={s.ctaTag}>
              <TargetIcon size={12} />
              <Text style={s.ctaTagText}>Target Tetangga Terdekat</Text>
            </View>
          </View>
          <TouchableOpacity style={s.ctaButton}>
            <HouseKeyIcon size={16} color="#1A2B2A" />
            <Text style={s.ctaButtonText}>Daftarkan Bimbel Rumahan Saya</Text>
          </TouchableOpacity>
        </View>

        {/* ACTIVITIES/HISTORY */}
        <Text style={s.sectionLabel}>AKTIVITAS BELAJAR</Text>
        <View style={s.menuCard}>
          {LEARNING_MENU.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[s.menuRow, i < LEARNING_MENU.length - 1 && s.menuRowDivider]}
            >
              <View style={s.menuIcon}>
                <item.Icon size={18} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.menuTitle}>{item.title}</Text>
                <Text style={s.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
          ))}
        </View>

        {/* COMMUNITY THAT USER JOINED */}
        <Text style={s.sectionLabel}>KOMUNITAS & MITRA BIMBEL</Text>
        <View style={s.menuCard}>
          {COMMUNITY_MENU.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[s.menuRow, i < COMMUNITY_MENU.length - 1 && s.menuRowDivider]}
            >
              <View style={[s.menuIcon, s.menuIconOrange]}>
                <item.Icon size={18} color="#B4760E" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.menuTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={s.menuSubtitle} numberOfLines={1}>{item.subtitle}</Text>
              </View>
              <ChevronRightIcon />
            </TouchableOpacity>
          ))}
        </View>

        {/* SETTINGS */}
        <Text style={s.sectionLabel}>PENGATURAN UMUM</Text>
        <View style={s.menuCard}>
          {SETTINGS_MENU.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[s.menuRow, i < SETTINGS_MENU.length - 1 && s.menuRowDivider]}
              onPress={item.id === 'logout' ? () => router.replace('/') : undefined}
            >
              <View style={[s.menuIcon, item.danger && s.menuIconDanger]}>
                <item.Icon size={18} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[s.menuTitle, item.danger && s.menuTitleDanger]}>{item.title}</Text>
                <Text style={s.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRightIcon color={item.danger ? '#DC4A4A' : '#6B7280'} />
            </TouchableOpacity>
          ))}
        </View>

        {/* FOOTER */}
        <View style={s.footer}>
          <View style={s.footerTagRow}>
            <GroupIcon size={14} color="#1F6F5C" />
            <Text style={s.footerTag}>Maju Bersama Tetangga</Text>
          </View>
          <Text style={s.footerVersion}>
            LesKita v2.4.0 • Platform Les Privat & Bimbel Rumahan Terpercaya di Indonesia
          </Text>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* NAVBAR */}
      <View style={s.bottomNav}>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/home')}>
          <HomeIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/search')}>
          <SearchTabIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Cari Bimbel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.navItem} onPress={() => router.push('/notification')}>
          <BellIcon color="#9AA5A3" />
          <Text style={s.navLabel}>Notifikasi</Text>
        </TouchableOpacity>
        <View style={s.navItem}>
          <PersonIcon color="#1F6F5C" />
          <Text style={[s.navLabel, s.navLabelActive]}>Profil Saya</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F6F6' },
  scroll: { paddingHorizontal: 18, paddingTop: 0 },

  brandRow: { flexDirection: 'row', alignItems: 'center' },
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

  profileCard: {
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginTop: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  profileTopRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrap: {},
  avatarLarge: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: '#E6F0EE',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarCheck: {
    position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
  },
  profileName: { fontSize: 16, fontWeight: '700', color: '#1A2B2A' },
  roleBadge: {
    alignSelf: 'flex-start', backgroundColor: '#CDEFE9', borderRadius: 10,
    paddingHorizontal: 9, paddingVertical: 3, marginTop: 5,
  },
  roleBadgeText: { fontSize: 11, fontWeight: '700', color: '#146156' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  locationText: { fontSize: 12, color: '#6B7280' },

  statsRow: {
    flexDirection: 'row', backgroundColor: '#F3F6F6', borderRadius: 12, marginTop: 16, paddingVertical: 12,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { borderRightWidth: 1, borderRightColor: '#E2E8EE' },
  statLabel: { fontSize: 11, color: '#6B7280', textAlign: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#1F6F5C', marginTop: 4 },

  ctaCard: {
    marginTop: 18, backgroundColor: '#1A5C52', borderRadius: 20, padding: 20, overflow: 'hidden',
  },
  ctaDecoCircle: {
    position: 'absolute', right: -30, top: -20, width: 130, height: 130, borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  ctaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
    backgroundColor: '#F39A1F', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
    marginBottom: 12,
  },
  ctaBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  ctaTitle: { color: '#FFFFFF', fontSize: 19, fontWeight: '700', lineHeight: 25 },
  ctaSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 8, lineHeight: 19 },
  ctaTagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  ctaTag: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6,
  },
  ctaTagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  ctaButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#F39A1F', borderRadius: 12, paddingVertical: 14, marginTop: 18,
  },
  ctaButtonText: { color: '#1A2B2A', fontSize: 13, fontWeight: '700' },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#6B7280', letterSpacing: 0.5,
    marginTop: 22, marginBottom: 10,
  },
  menuCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  menuRowDivider: { borderBottomWidth: 1, borderBottomColor: '#F0F3F3' },
  menuIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#E6F0EE',
    alignItems: 'center', justifyContent: 'center',
  },
  menuIconOrange: { backgroundColor: '#FDEBD2' },
  menuIconDanger: { backgroundColor: '#FBE2E2' },
  menuTitle: { fontSize: 14, fontWeight: '700', color: '#1A2B2A' },
  menuTitleDanger: { color: '#DC4A4A' },
  menuSubtitle: { fontSize: 11, color: '#6B7280', marginTop: 2 },

  footer: { alignItems: 'center', marginTop: 28 },
  footerTagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerTag: { fontSize: 12, fontWeight: '700', color: '#1F6F5C' },
  footerVersion: { fontSize: 11, color: '#9AA5A3', textAlign: 'center', marginTop: 6, lineHeight: 16 },

  bottomNav: {
    position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF',
    flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: '#E2E8EE',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navLabel: { fontSize: 11, color: '#9AA5A3', fontWeight: '600' },
  navLabelActive: { color: '#1F6F5C' },
});