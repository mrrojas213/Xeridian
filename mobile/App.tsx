import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { VideoView, useVideoPlayer } from 'expo-video';
import TrackerScreen from './src/screens/TrackerScreen';

type Mode = 'login' | 'signup';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const player = useVideoPlayer(require('./assets/workout_login_background.mp4'), (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const isSignup = mode === 'signup';

  const submit = () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing info', 'Please enter your email and password.');
      return;
    }
    if (isSignup) {
      if (!name.trim()) {
        Alert.alert('Missing info', 'Please enter your name.');
        return;
      }
      if (password !== confirm) {
        Alert.alert('Passwords do not match');
        return;
      }
    }
    // TODO: connect to your auth backend
    setSignedIn(true);
  };

  const googleLogin = () => {
    // TODO: wire up Google auth (e.g. expo-auth-session) with your client IDs
    Alert.alert('Google login', 'Google sign-in is not configured yet.');
  };

  if (signedIn) {
    return <TrackerScreen />;
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Xeridian</Text>
          <Text style={styles.subtitle}>
            {isSignup ? 'Create your account' : 'Welcome back'}
          </Text>

          <View style={styles.card}>
            {isSignup && (
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#bbb"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {isSignup && (
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#bbb"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                autoCapitalize="none"
              />
            )}

            <Pressable style={styles.primaryBtn} onPress={submit}>
              <Text style={styles.primaryText}>{isSignup ? 'Sign Up' : 'Log In'}</Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.or}>or</Text>
              <View style={styles.line} />
            </View>

            <Pressable style={styles.googleBtn} onPress={googleLogin}>
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.googleText}>Continue with Google</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => setMode(isSignup ? 'login' : 'signup')}>
            <Text style={styles.switchText}>
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <Text style={styles.switchLink}>{isSignup ? 'Log In' : 'Sign Up'}</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.5)' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 40, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#ddd', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  card: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: '#ff5a1f',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#aaa' },
  or: { color: '#ccc' },
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  googleG: { color: '#4285F4', fontSize: 18, fontWeight: '800' },
  googleText: { color: '#222', fontSize: 16, fontWeight: '600' },
  switchText: { color: '#ddd', textAlign: 'center', marginTop: 20 },
  switchLink: { color: '#ff8a5c', fontWeight: '700' },
});
