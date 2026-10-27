import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleIcon } from '../components/googleIcon';
import { Message, Msg } from '../components/message';
import { PasswordInput } from '../components/passwordInput';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState<Msg>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    const fullName = name.trim();
    const mail = email.trim();

    if (!fullName || !mail || !password || !confirm) {
      setMsg({ text: 'All fields are required.', ok: false });
      return;
    }
    if (!mail.includes('@')) {
      setMsg({ text: 'Invalid email format.', ok: false });
      return;
    }
    if (password.length < 6) {
      setMsg({ text: 'Password must be at least 6 characters.', ok: false });
      return;
    }
    if (password !== confirm) {
      setMsg({ text: 'Passwords do not match.', ok: false });
      return;
    }

    setLoading(true);
    setMsg(null);
    setTimeout(() => {
      setLoading(false);
      router.replace('/');
    }, 400);
  };

  const handleGoogleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/home');
    }, 400);
  };

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          <Image source={require('../../assets/images/logo-jeje.png')} style={s.logo} resizeMode="contain" />

          <Text style={s.appName}>LesKita</Text>

          <View style={s.tabRow}>
            <TouchableOpacity style={s.tab} onPress={() => router.push('/')}>
              <Text style={s.tabText}>Login</Text>
            </TouchableOpacity>
            <View style={[s.tab, s.tabActive]}>
              <Text style={s.tabTextActive}>Register</Text>
            </View>
          </View>

          <Message msg={msg} />

          <Text style={s.label}>Full Name</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Sarah Amelia"
            placeholderTextColor="#9AA5A3"
            value={name}
            onChangeText={setName}
          />

          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            placeholder="name@email.com"
            placeholderTextColor="#9AA5A3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={s.label}>Password</Text>
          <PasswordInput value={password} onChangeText={setPassword} placeholder="At least 6 characters" />

          <Text style={s.label}>Confirm Password</Text>
          <PasswordInput value={confirm} onChangeText={setConfirm} placeholder="Re-enter your password" />

          <TouchableOpacity
            style={[s.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={s.buttonText}>{loading ? 'Please wait...' : 'Create Account'}</Text>
          </TouchableOpacity>

          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>OR</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity
            style={[s.googleButton, loading && { opacity: 0.6 }]}
            onPress={handleGoogleRegister}
            disabled={loading}
          >
            <GoogleIcon size={20} />
            <Text style={s.googleButtonText}>Continue with Google</Text>
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
  logo: { alignSelf: 'center', width: 72, height: 72, marginBottom: 12 },
  appName: { textAlign: 'center', fontSize: 22, fontWeight: '700', color: '#1A2B2A', marginBottom: 20 },
  tabRow: { flexDirection: 'row', backgroundColor: '#F0F3F3', borderRadius: 12, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center' },
  tabActive: {
    backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  tabText: { color: '#6B7280', fontWeight: '600' },
  tabTextActive: { color: '#1A2B2A', fontWeight: '700' },
  label: { fontSize: 13, fontWeight: '600', color: '#1A2B2A', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#E2E8EE', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: '#1A2B2A', backgroundColor: '#FAFBFC',
  },
  button: { backgroundColor: '#1F6F5C', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 18 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8EE' },
  dividerText: { marginHorizontal: 10, color: '#9AA5A3', fontSize: 12, fontWeight: '600' },
  googleButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1,
    borderColor: '#E2E8EE', borderRadius: 10, paddingVertical: 13, backgroundColor: '#FFFFFF',
  },
  googleButtonText: { marginLeft: 10, color: '#1A2B2A', fontSize: 14, fontWeight: '600' },
});