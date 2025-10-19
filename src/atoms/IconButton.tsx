import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
  size?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const IconButton: React.FC<Props> = ({ size = 56, color = '#fff', backgroundColor = '#ffffff', onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.btn, { width: size, height: size, borderRadius: size / 2, backgroundColor }] }>
      <View style={styles.center}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});