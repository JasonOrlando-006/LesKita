import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  BellIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ClockIcon,
  GroupIcon,
  HomeIcon,
  PersonIcon,
  PinIcon,
  SearchTabIcon,
  WalletIcon,
  WarningIcon,
  WhatsAppIcon,
} from '../components/iconComp';
import { StickyHeader } from '../components/stickyHeader';

const NOTIFICATIONS = [
  {
    id: '1',
    category: 'news',
    kind: 'jadwal',
    time: 'Besok, 15:30 WIB',
    title: 'Jadwal Trial Belajar Besok Pukul 15.30',
    description: 'Sesi uji coba Matematika untuk Rafa di Bimbel Bu Retno (Jl. Melati No. 12, Rungkut).',
    distance: '1.2 km dari lokasimu',
    unread: true,
  },
  {
    id: '2',
    category: 'news',
    kind: 'pesan',
    time: '10 menit yang lalu',
    title: 'Pemilik Bimbel Ceria Membalas Anda',
    description: '"Halo Bunda, untuk kelas Calistung TK-B sisa 2 slot lagi untuk kelompok sore hari Selasa & Kamis..."',
    unread: true,
  },
  {
    id: '3',
    category: 'warning',
    kind: 'tagihan',
    time: 'Kemarin',
    title: 'Pengingat Pembayaran Les Sesi Baru',
    description: 'Paket Les Bahasa Inggris (8 Pertemuan) untuk Nanda jatuh tempo 3 hari lagi. Pembayaran mudah via QRIS/Transfer.',
    total: 'Rp 240.000',
    unread: false,
  },
];

export default function NotificationsScreen() {
  return (
    <View style={s.screen}>
      {/* HEADER */}
      <StickyHeader>
        <View style={s.brandRow}>
          <View style={{ marginLeft: 8 }}>
            <Text style={s.brand}>LesKita</Text>
            <Text style={s.brandSub}>Notifikasi</Text>
          </View>
        </View>
        <View style={s.topBarActions}>
          <TouchableOpacity style={s.iconButton} onPress={() => {}}>
            <BellIcon />
          </TouchableOpacity>
          <TouchableOpacity style={s.avatarSmall} onPress={() => router.push('/profile')}>
            <PersonIcon size={18} color="#1F6F5C" />
          </TouchableOpacity>
        </View>
      </StickyHeader>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* NEWS SUMMARY */}
        <View style={s.summaryBanner}>
          <View style={s.summaryIcon}>
            <ClockIcon size={16} />
          </View>
          <Text style={s.summaryText}>
            Ada <Text style={s.summaryBold}>3 pembaruan penting</Text> minggu ini
          </Text>
          <TouchableOpacity>
            <Text style={s.summaryLink}>Tandai Dibaca</Text>
          </TouchableOpacity>
        </View>

        {/* NOTIF BOX */}
        {NOTIFICATIONS.map((item) => {
          const isWarning = item.category === 'warning';
          return (
            <View
              key={item.id}
              style={[s.card, isWarning ? s.cardBorderOrange : s.cardBorderTeal]}
            >
              <View style={s.cardTopRow}>
                <View style={[s.badgePill, isWarning && s.badgePillOrange]}>
                  {isWarning ? (
                    <WarningIcon size={12} color="#B4760E" />
                  ) : (
                    <BookOpenIcon size={12} color="#1F6F5C" />
                  )}
                  <Text style={[s.badgePillText, isWarning && s.badgePillTextOrange]}>
                    {isWarning ? 'Warning' : 'News'}
                  </Text>
                </View>
                <Text style={s.cardTime}>{item.time}</Text>
                {item.unread && <View style={s.unreadDot} />}
              </View>

              <View style={s.cardBody}>
                {item.kind !== 'tagihan' ? (
                  <View style={s.avatar} />
                ) : (
                  <View style={s.walletIconWrap}>
                    <WalletIcon size={22} />
                  </View>
                )}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.cardTitle}>{item.title}</Text>
                  <Text style={s.cardDescription}>{item.description}</Text>
                </View>
              </View>

              {item.kind === 'jadwal' && (
                <View style={s.cardFooter}>
                  <View style={s.distanceRow}>
                    <PinIcon size={12} />
                    <Text style={s.distanceText}>{item.distance}</Text>
                  </View>
                  <View style={s.footerButtons}>
                    <TouchableOpacity style={s.secondaryButton}>
                      <Text style={s.secondaryButtonText}>Rute</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.primaryButton}>
                      <Text style={s.primaryButtonText}>Detail Sesi</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {item.kind === 'pesan' && (
                <View style={s.cardFooterSingle}>
                  <View style={s.connectedRow}>
                    <WhatsAppIcon size={13} color="#6B7280" />
                    <Text style={s.connectedText}>Terhubung ke WhatsApp</Text>
                  </View>
                  <TouchableOpacity style={s.whatsappButton}>
                    <WhatsAppIcon size={15} />
                    <Text style={s.whatsappButtonText}>Buka WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.kind === 'tagihan' && (
                <View style={s.billFooter}>
                  <View>
                    <Text style={s.billLabel}>Total Tagihan:</Text>
                    <Text style={s.billValue}>{item.total}</Text>
                  </View>
                  <TouchableOpacity style={s.payButton}>
                    <Text style={s.payButtonText}>Bayar Sekarang</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        {/* COMMUNITY SECTION */}
        <TouchableOpacity style={s.communityCard}>
          <View style={s.communityIcon}>
            <GroupIcon size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.communityTitle}>Grup Diskusi Wali Murid Sekitarmu</Text>
            <Text style={s.communitySub}>Tanyakan rekomendasi les privat langsung ke tetangga.</Text>
          </View>
          <View style={s.communityArrow}>
            <ChevronRightIcon size={16} color="#1F6F5C" />
          </View>
        </TouchableOpacity>

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
        <View style={s.navItem}>
          <BellIcon color="#1F6F5C" />
          <Text style={[s.navLabel, s.navLabelActive]}>Notifikasi</Text>
        </View>
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

  summaryBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#E6F0EE',
    borderRadius: 14, padding: 14, marginTop: 16,
  },
  summaryIcon: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  summaryText: { flex: 1, fontSize: 12, color: '#1A2B2A' },
  summaryBold: { fontWeight: '700' },
  summaryLink: { fontSize: 12, fontWeight: '700', color: '#1F6F5C' },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginTop: 14,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  cardBorderTeal: { borderLeftColor: '#1F6F5C' },
  cardBorderOrange: { borderLeftColor: '#F39A1F' },

  cardTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badgePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E6F0EE',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  badgePillOrange: { backgroundColor: '#FDEBD2' },
  badgePillText: { fontSize: 10, fontWeight: '700', color: '#1F6F5C' },
  badgePillTextOrange: { color: '#B4760E' },
  cardTime: { fontSize: 11, color: '#9AA5A3', flex: 1 },
  unreadDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#F39A1F' },

  cardBody: { flexDirection: 'row', marginTop: 10 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DCE7E4' },
  walletIconWrap: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#FDEBD2',
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1A2B2A' },
  cardDescription: { fontSize: 12, color: '#6B7280', marginTop: 4, lineHeight: 17 },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12,
  },
  distanceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1 },
  distanceText: { fontSize: 11, color: '#6B7280' },
  footerButtons: { flexDirection: 'row', gap: 8 },
  secondaryButton: { backgroundColor: '#F0F3F3', borderRadius: 9, paddingHorizontal: 12, paddingVertical: 9 },
  secondaryButtonText: { fontSize: 11, fontWeight: '700', color: '#1A2B2A' },
  primaryButton: { backgroundColor: '#1F6F5C', borderRadius: 9, paddingHorizontal: 14, paddingVertical: 9 },
  primaryButtonText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },

  cardFooterSingle: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12,
  },
  connectedRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  connectedText: { fontSize: 11, color: '#6B7280' },
  whatsappButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#1F6F5C',
    borderRadius: 9, paddingHorizontal: 14, paddingVertical: 9,
  },
  whatsappButtonText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },

  billFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12,
    paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F3F3',
  },
  billLabel: { fontSize: 11, color: '#6B7280' },
  billValue: { fontSize: 16, fontWeight: '700', color: '#1F6F5C', marginTop: 2 },
  payButton: { backgroundColor: '#F39A1F', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  payButtonText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },

  communityCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#E6F0EE',
    borderRadius: 16, padding: 16, marginTop: 16,
  },
  communityIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#1F6F5C',
    alignItems: 'center', justifyContent: 'center',
  },
  communityTitle: { fontSize: 13, fontWeight: '700', color: '#1A2B2A' },
  communitySub: { fontSize: 11, color: '#6B7280', marginTop: 3 },
  communityArrow: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },

  bottomNav: {
    position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF',
    flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: '#E2E8EE',
  },
  navItem: { alignItems: 'center', gap: 4 },
  navLabel: { fontSize: 11, color: '#9AA5A3', fontWeight: '600' },
  navLabelActive: { color: '#1F6F5C' },
});