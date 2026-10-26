import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleIcon } from '../components/googleIcon';
import { Message, Msg } from '../components/message';
import { PasswordInput } from '../components/passwordInput';
import { auth } from '../lib/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<Msg>(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '826915862685-10n728nf6n1aqiveo1nb4o40bj9b8up4.apps.googleusercontent.com',
    responseType: 'id_token',
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        setLoading(true);
        try {
          await signInWithCredential(auth, credential);
          setMsg({ text: 'Signed in with Google successfully!', ok: true });
        } catch (error) {
          setMsg({ text: 'Failed to sign in with Google.', ok: false });
        } finally {
          setLoading(false);
        }
      }
    };
    handleGoogleResponse();
  }, [response]);

  const handleLogin = async () => {
    if (email.trim() === '' || password === '') {
      setMsg({ text: 'Email and password are required.', ok: false });
      return;
    }

    setLoading(true);
    setMsg(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setMsg({ text: 'Login successful. Welcome back!', ok: true });
      // router.replace('/home');
    } catch (error: any) {
      let text = 'Something went wrong. Please try again.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        text = 'Incorrect email or password.';
      } else if (error.code === 'auth/user-not-found') {
        text = 'No account found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        text = 'Invalid email format.';
      } else if (error.code === 'auth/too-many-requests') {
        text = 'Too many attempts. Please try again later.';
      }
      setMsg({ text, ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.screen}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          {/* Logo placeholder — swap with the finished logo later */}
          <View style={s.logoPlaceholder} />

          <Text style={s.appName}>LesKita</Text>

          <View style={s.tabRow}>
            <View style={[s.tab, s.tabActive]}>
              <Text style={s.tabTextActive}>Login</Text>
            </View>
            <TouchableOpacity style={s.tab} onPress={() => router.push('/register')}>
              <Text style={s.tabText}>Register</Text>
            </TouchableOpacity>
          </View>

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
          />

          <Text style={s.label}>Password</Text>
          <PasswordInput value={password} onChangeText={setPassword} placeholder="Enter your password" />

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={s.forgotLink}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.button, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={s.buttonText}>{loading ? 'Please wait...' : 'Login'}</Text>
          </TouchableOpacity>

          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>OR</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity
            style={[s.googleButton, loading && { opacity: 0.6 }]}
            onPress={() => promptAsync()}
            disabled={!request || loading}
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
  screen: {
    flex: 1,
    backgroundColor: '#F3F6F6',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  logoPlaceholder: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#EDF2F1',
    marginBottom: 12,
  },
  appName: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: '#1A2B2A',
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F3F3',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1A2B2A',
    fontWeight: '700',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A2B2A',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8EE',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A2B2A',
    backgroundColor: '#FAFBFC',
  },
  forgotLink: {
    textAlign: 'right',
    color: '#1F6F5C',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#1F6F5C',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8EE',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#9AA5A3',
    fontSize: 12,
    fontWeight: '600',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8EE',
    borderRadius: 10,
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
  },
  googleButtonText: {
    marginLeft: 10,
    color: '#1A2B2A',
    fontSize: 14,
    fontWeight: '600',
  },
});