import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Animated, Text, ActivityIndicator, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MainTabs } from './src/navigation/MainTabs';
import { fetchPeople } from './src/api/people';
import { colors } from './src/theme/colors';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [booting, setBooting] = useState(true);
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const first = await fetchPeople(1, 10);
        queryClient.setQueryData(['people', 10], { pages: [first], pageParams: [1] });
        const urls = first.data.slice(0, 10).map((p) => p.photos?.[0]?.url).filter(Boolean) as string[];
        await Promise.all(urls.map((u) => Image.prefetch(u)));
      } catch (e) {
      } finally {
        Animated.timing(fade, { toValue: 0, duration: 320, useNativeDriver: true }).start(() => {
          if (mounted) setBooting(false);
        });
      }
    })();
    return () => { mounted = false; };
  }, [fade]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
              <MainTabs />
              {booting && (
                <Animated.View style={[styles.splash, { opacity: fade }] }>
                  <View style={styles.splashContent}>
                    <Text style={styles.splashIcon}>💕</Text>
                    <Text style={styles.splashTitle}>Discover</Text>
                    <Text style={styles.splashSubtitle}>Find your perfect match</Text>
                    <ActivityIndicator color={colors.primary} style={styles.loader} size="large" />
                  </View>
                </Animated.View>
              )}
            </View>
          </QueryClientProvider>
        </RecoilRoot>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  splash: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  splashTitle: { 
    color: colors.text, 
    fontSize: 32, 
    fontWeight: '700',
    marginBottom: 8,
  },
  splashSubtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 32,
  },
  loader: {
    marginTop: 8,
  },
});

export default App;
