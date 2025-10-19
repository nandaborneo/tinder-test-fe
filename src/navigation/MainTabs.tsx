import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { View, Text, StyleSheet } from 'react-native';
import DiscoverPage from '../pages/DiscoverPage';
import LikedPage from '../pages/LikedPage';

const Tab = createBottomTabNavigator();

function DisabledScreen() {
  return (
    <View style={styles.center}>
      <Text style={{ color: colors.text }}>Disabled</Text>
    </View>
  );
}

export function MainTabs() {
  return (
    <NavigationContainer theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.bg,
        text: colors.text,
        card: colors.cardBg,
        border: '#dddddd',
        primary: '#000000',
      },
    }}>
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.bg,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
          },
          headerTitleAlign: 'center',
          tabBarStyle: { 
            backgroundColor: colors.tabBar,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
          }, 
          tabBarActiveTintColor: colors.text 
        }}
      >
        <Tab.Screen 
          name="Discover" 
          component={DiscoverPage}
          options={{
            headerTitle: "💕 Discover",
            tabBarIcon: ({ focused, color, size }) => (
              <Text style={{ fontSize: size, color: focused ? colors.primary : colors.textSecondary }}>
                🔍
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Liked" 
          component={LikedPage}
          options={{
            headerTitle: "♥ Liked",
            tabBarIcon: ({ focused, color, size }) => (
              <Text style={{ fontSize: size, color: focused ? colors.primary : colors.textSecondary }}>
                ♥
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});