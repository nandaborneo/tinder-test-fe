import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  total: number;
  current: number; // zero-based index
}

export const PhotoIndicator: React.FC<Props> = ({ total, current }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === current ? colors.indicatorActive : colors.indicatorInactive },
            i !== total - 1 ? styles.dotSpacing : null,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
  },
  dot: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  dotSpacing: {
    marginRight: 6,
  },
});