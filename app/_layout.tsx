import '../firebase.config'; // Ensure this is at the top
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
export { ErrorBoundary } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ServerProvider from '@/contexts/ServerProvider';
import { AuthProvider } from '@/contexts/AuthProvider';
import { AppState, AppStateStatus, View } from 'react-native';
import { PedometerProvider } from '@/contexts/PedometerProvider';
import { FirestoreProvider } from '@/contexts/FirestoreProvider';
import { AppStateProvider } from '@/contexts/AppStateProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 60 * 1000,
      retry: 2,
      staleTime: 60 * 1000,
    },
  },
});

function RootLayoutNav() {
  return (
    <FirestoreProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ServerProvider>
            <AppStateProvider>
              <PedometerProvider>
                <View className="h-[110vh] w-[100vw] bg-green-900">
                  <Slot />
                </View>
              </PedometerProvider>
            </AppStateProvider>
          </ServerProvider>
        </QueryClientProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}
