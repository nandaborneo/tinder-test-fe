import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { useOpponents, useLikeMutation, useDislikeMutation } from '../hooks/useOpponents';
import type { Person } from '../types';
import { ProfileCard, SwipeDirection } from '../molecules/ProfileCard';
import { IconButton } from '../atoms/IconButton';

interface Props {
  enableActions?: boolean;
}

const PREFETCH_COUNT = 10;

export const CardStack: React.FC<Props> = ({ enableActions = true }) => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } = useOpponents(PREFETCH_COUNT);
  const likeMutation = useLikeMutation();
  const dislikeMutation = useDislikeMutation();

  const people: Person[] = useMemo(() => {
    const items = data?.pages.flatMap((p) => p.data) ?? [];
    return items;
  }, [data]);

  const [index, setIndex] = useState(0);
  const current = people[index];
  const nextCardProgress = useSharedValue(0);

  const secondCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(nextCardProgress.value, [0, 1], [0.95, 1]);
    const translateY = interpolate(nextCardProgress.value, [0, 1], [12, 0]);
    
    return {
      transform: [
        { scale },
        { translateY },
      ],
    };
  });

  const thirdCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(nextCardProgress.value, [0, 1], [0.9, 0.95]);
    const translateY = interpolate(nextCardProgress.value, [0, 1], [24, 12]);
    
    return {
      transform: [
        { scale },
        { translateY },
      ],
    };
  });

  useEffect(() => {
    const nextPeople = people.slice(index, index + PREFETCH_COUNT);
    const urls = nextPeople.map((p) => p.photos?.[0]?.url).filter(Boolean) as string[];
    urls.forEach((u) => Image.prefetch(u));
  }, [index, people]);

  const onSwiped = (dir: SwipeDirection, person: Person) => {
    if (dir === 'right') {
      likeMutation.mutate(person);
    } else if (dir === 'left') {
      dislikeMutation.mutate(person);
    }
    
    const nextIndex = index + 1;
    setIndex(nextIndex);
    nextCardProgress.value = 0;
    if (nextIndex >= people.length - 2 && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}><ActivityIndicator color={colors.text} /></View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Failed to load. Tap to retry.</Text>
        <IconButton onPress={() => refetch()} backgroundColor={colors.cardBg}><Text style={styles.text}>Retry</Text></IconButton>
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No more cards</Text>
      </View>
    );
  }

  const second = people[index + 1];
  const third = people[index + 2];

  return (
    <View style={styles.wrap}>
      <View style={styles.cardContainer}>
        {enableActions && (
          <View style={styles.actions}>
            <IconButton onPress={() => onSwiped('left', current)} backgroundColor={colors.cardBg}>
              <Text style={styles.btnText}>✕</Text>
            </IconButton>
            <IconButton onPress={() => onSwiped('right', current)} backgroundColor={colors.cardBg}>
              <Text style={styles.btnText}>♥</Text>
            </IconButton>
          </View>
        )}

        {people[index + 2] && (
          <Animated.View style={[styles.stackedCard, thirdCardStyle]}>
            <ProfileCard
              person={people[index + 2]}
              disableActions
              zIndex={1}
            />
          </Animated.View>
        )}

        {people[index + 1] && (
          <Animated.View style={[styles.stackedCard, secondCardStyle]}>
            <ProfileCard
              person={people[index + 1]}
              disableActions
              zIndex={2}
            />
          </Animated.View>
        )}

        <ProfileCard
          key={`current-${current.id}`}
          person={current}
          onSwiped={onSwiped}
          disableActions={!enableActions}
          zIndex={3}
          onSwipeProgress={(p) => {
            nextCardProgress.value = withTiming(p, { duration: 80 });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: colors.text },
  cardContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  stackedCard: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  btnText: { color: '#000', fontSize: 18, fontWeight: '600' },
});