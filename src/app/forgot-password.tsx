import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Message, Msg } from '../components/message';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<Msg>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = () => {
    const mail = email.trim();
    if (!mail) {
      setMsg({ text: 'Please enter your email address.', ok: false });
      return;
    }
    if (!mail.includes('@')) {
      setMsg({ text: 'Invalid email format.', ok: false });
      return;
    }

    setLoading(true);
    setMsg(null);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setMsg({ text: 'Reset link sent! Please check your inbox.', ok: true });
    }, 400);
  };

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          <TouchableOpacity style={s.backButton} onPress={() => router.push('/')}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>

          <Image source={require('../../assets/images/logo-jeje.png')} style={s.logo} resizeMode="contain" />

          <Text style={s.title}>Forgot Password?</Text>
          <Text style={s.subtitle}>
            No worries! Enter your registered email and we'll send you a link to reset your password.
          </Text>

          <Message msg={msg} />

          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            placeholder="name@email.com"
            placeholderTextColor="#9AA5A3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!sent}
          />

          <TouchableOpacity
            style={[s.button, (loading || sent) && { opacity: 0.6 }]}
            onPress={handleReset}
            disabled={loading || sent}
          >
            <Text style={s.buttonText}>
              {loading ? 'Sending...' : sent ? 'Link Sent' : 'Send Reset Link'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F6F6' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: {
    width: '100%', maxWidth: 420, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  backButton: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F3F3',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  backArrow: { fontSize: 18, color: '#1A2B2A', marginTop: -2 },
  logo: { alignSelf: 'center', width: 72, height: 72, marginBottom: 16 },
  title: { textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#1A2B2A', marginBottom: 8 },
  subtitle: { textAlign: 'center', fontSize: 13, color: '#6B7280', lineHeight: 19, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#1A2B2A', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#E2E8EE', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: '#1A2B2A', backgroundColor: '#FAFBFC',
  },
  button: { backgroundColor: '#1F6F5C', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});