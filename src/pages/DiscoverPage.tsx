import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardStack } from '../organisms/CardStack';

export default function DiscoverPage() {
  return (
    <View style={styles.container}>
      <CardStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});