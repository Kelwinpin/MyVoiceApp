import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="activity"
            options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#09c7e0' },
              // Customizando o botão de voltar
              headerLeft: () => <CustomBackButton />,
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function CustomBackButton() {
  const router = useRouter(); // Hook do expo-router para navegação
  return (
    <TouchableOpacity
      onPress={() => router.back()} // Voltar à tela anterior
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
      <Text style={{ color: 'white', marginLeft: 5 }}>Voltar</Text>
    </TouchableOpacity>
  );
}
