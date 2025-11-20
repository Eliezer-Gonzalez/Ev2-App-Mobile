import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AuthProvider from '../components/context/auth-context';


export const unstable_settings = {
  anchor: "login",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
