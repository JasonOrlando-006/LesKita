import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CheckCircleIcon,
  ClockIcon,
  GraduationCapIcon,
  PinIcon,
  StarIcon,
  VerifiedIcon,
  WhatsAppIcon,
} from '../../components/iconComp';
import { formatRupiah, getBimbelById } from '../../data/bimbelDetail';

export default function BimbelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bimbel = getBimbelById(id);

  if (!bimbel) {
    return (
      <View style={s.center}>
        <Text style={s.notFound}>Bimbel tidak ditemukan.</Text>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backBtnText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openWhatsApp = () => {
    Linking.openURL(`https://wa.me/62${bimbel.whatsapp.replace(/^0/, '')}`).catch(() =>
      Alert.alert('Gagal', 'WhatsApp tidak dapat dibuka.')
    );
  };

  const registerTrial = () => {
    Alert.alert('Pendaftaran Trial', `Permintaan trial ke ${bimbel.name} berhasil dikirim (simulasi).`);
  };

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Hero */}
        <View style={s.hero}>
          <TouchableOpacity style={s.heroBack} onPress={() => router.back()}>
            <Text style={s.heroBackText}>‹</Text>
          </TouchableOpacity>
          <View style={s.heroIcon}>
            <GraduationCapIcon size={44} color="#FFFFFF" />
          </View>
        </View>

        <View style={s.body}>
          {/* HEADER */}
          <View style={s.nameRow}>
            <Text style={s.name}>{bimbel.name}</Text>
            {bimbel.verified && <VerifiedIcon size={18} color="#1F6F5C" />}
          </View>

          <View style={s.metaRow}>
            <StarIcon size={14} color="#F39A1F" />
            <Text style={s.metaText}>
              {bimbel.rating} ({bimbel.reviewCount} ulasan)
            </Text>
          </View>
          <View style={s.metaRow}>
            <PinIcon size={14} color="#6B7280" />
            <Text style={s.metaText}>
              {bimbel.address} · {bimbel.distanceKm} km
            </Text>
          </View>

          {/* Harga & format */}
          <View style={s.priceCard}>
            <View>
              <Text style={s.priceLabel}>Biaya</Text>
              <Text style={s.price}>
                {formatRupiah(bimbel.price)} <Text style={s.priceUnitText}>{bimbel.priceUnit}</Text>
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={s.priceLabel}>Format kelas</Text>
              <Text style={s.formatText}>{bimbel.format}</Text>
            </View>
          </View>

          {/* Jenjang & mapel */}
          <Text style={s.section}>Jenjang & Mata Pelajaran</Text>
          <View style={s.chipRow}>
            {bimbel.levels.map((l) => (
              <View key={l} style={[s.chip, s.chipLevel]}>
                <Text style={[s.chipText, { color: '#FFFFFF' }]}>{l}</Text>
              </View>
            ))}
            {bimbel.subjects.map((sub) => (
              <View key={sub} style={s.chip}>
                <Text style={s.chipText}>{sub}</Text>
              </View>
            ))}
          </View>

          {/* Tentang */}
          <Text style={s.section}>Tentang Bimbel</Text>
          <Text style={s.paragraph}>{bimbel.about}</Text>

          {/* Tutor */}
          <Text style={s.section}>Tutor</Text>
          <View style={s.tutorCard}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{bimbel.tutor.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.tutorName}>{bimbel.tutor.name}</Text>
              <Text style={s.tutorRole}>{bimbel.tutor.role}</Text>
              <Text style={s.tutorExp}>{bimbel.tutor.experience}</Text>
            </View>
          </View>

          {/* Jadwal */}
          <Text style={s.section}>Jadwal</Text>
          {bimbel.schedule.map((item) => (
            <View key={item} style={s.listRow}>
              <ClockIcon size={16} color="#1F6F5C" />
              <Text style={s.listText}>{item}</Text>
            </View>
          ))}

          {/* Fasilitas */}
          <Text style={s.section}>Fasilitas</Text>
          {bimbel.facilities.map((item) => (
            <View key={item} style={s.listRow}>
              <CheckCircleIcon size={16} color="#1F6F5C" />
              <Text style={s.listText}>{item}</Text>
            </View>
          ))}

          {/* Ulasan */}
          <Text style={s.section}>Ulasan Orang Tua</Text>
          {bimbel.reviews.map((r) => (
            <View key={r.id} style={s.reviewCard}>
              <View style={s.reviewHeader}>
                <Text style={s.reviewName}>{r.name}</Text>
                <View style={s.metaRow}>
                  <StarIcon size={12} color="#F39A1F" />
                  <Text style={s.metaText}>{r.rating}</Text>
                </View>
              </View>
              <Text style={s.reviewComment}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action bar */}
      <View style={s.actionBar}>
        <TouchableOpacity style={s.waButton} onPress={openWhatsApp}>
          <WhatsAppIcon size={18} color="#1F6F5C" />
          <Text style={s.waText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.trialButton} onPress={registerTrial}>
          <Text style={s.trialText}>Daftar Trial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F6F6' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F6F6' },
  notFound: { fontSize: 15, color: '#1A2B2A', marginBottom: 12 },
  backBtn: { backgroundColor: '#1F6F5C', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  backBtnText: { color: '#FFFFFF', fontWeight: '700' },

  hero: { height: 180, backgroundColor: '#1A5C52', alignItems: 'center', justifyContent: 'center' },
  heroBack: {
    position: 'absolute', top: 48, left: 16, width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  heroBackText: { color: '#FFFFFF', fontSize: 20, marginTop: -2 },
  heroIcon: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },

  body: {
    marginTop: -20, backgroundColor: '#F3F6F6', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: '700', color: '#1A2B2A', flexShrink: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  metaText: { fontSize: 13, color: '#6B7280', flexShrink: 1 },

  priceCard: {
    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginTop: 14,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  priceLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  price: { fontSize: 18, fontWeight: '700', color: '#F39A1F' },
  priceUnitText: { fontSize: 12, color: '#6B7280', fontWeight: '400' },
  formatText: { fontSize: 13, fontWeight: '600', color: '#1A2B2A' },

  section: { fontSize: 15, fontWeight: '700', color: '#1A2B2A', marginTop: 22, marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#E6F0EE', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  chipLevel: { backgroundColor: '#1F6F5C' },
  chipText: { fontSize: 12, fontWeight: '600', color: '#1F6F5C' },
  paragraph: { fontSize: 13, color: '#4B5563', lineHeight: 20 },

  tutorCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8EE',
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: '#1F6F5C',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  tutorName: { fontSize: 14, fontWeight: '700', color: '#1A2B2A' },
  tutorRole: { fontSize: 12, color: '#1F6F5C', marginTop: 2 },
  tutorExp: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  listRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  listText: { fontSize: 13, color: '#1A2B2A', flexShrink: 1 },

  reviewCard: {
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#E2E8EE',
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewName: { fontSize: 13, fontWeight: '700', color: '#1A2B2A' },
  reviewComment: { fontSize: 13, color: '#4B5563', lineHeight: 19 },

  actionBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', gap: 12,
    padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8EE',
  },
  waButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 1.5, borderColor: '#1F6F5C', borderRadius: 12, paddingVertical: 13,
  },
  waText: { color: '#1F6F5C', fontWeight: '700', fontSize: 14 },
  trialButton: {
    flex: 1.3, backgroundColor: '#F39A1F', borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  trialText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
