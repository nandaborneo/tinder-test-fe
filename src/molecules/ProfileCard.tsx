import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Pressable, UIManager } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { Person } from '../types';
import { PhotoIndicator } from '../atoms/PhotoIndicator';
import { colors } from '../theme/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 24;
const SWIPE_THRESHOLD = 120;

export type SwipeDirection = 'left' | 'right' | 'none';

interface Props {
  person: Person;
  onSwiped?: (dir: SwipeDirection, person: Person) => void;
  disableActions?: boolean;
  extraTransforms?: any[];
  style?: any;
  zIndex?: number;
  onSwipeProgress?: (progress: number) => void;
}

export const ProfileCard: React.FC<Props> = ({
  person,
  onSwiped,
  disableActions,
  extraTransforms,
  style,
  zIndex = 0,
  onSwipeProgress,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

 
  useEffect(() => {
    if (!disableActions) {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
    }
  }, [disableActions, translateX, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-CARD_WIDTH, 0, CARD_WIDTH],
      [-10, 0, 10]
    );
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
    };
  });

  const currentPhoto = person.photos?.[photoIndex]?.url;
  const totalPhotos = person.photos?.length ?? 0;

  const handleSwipeEnd = (dir: SwipeDirection) => {
    onSwiped?.(dir, person);
    setPhotoIndex(0);
  };

  const panGesture = Gesture.Pan()
    .enabled(!disableActions)
    .onStart(() => {
      scale.value = withTiming(1.05, { duration: 150 });
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.1;
      
      if (onSwipeProgress) {
        const progress = Math.min(1, Math.abs(event.translationX) / SWIPE_THRESHOLD);
        runOnJS(onSwipeProgress)(progress);
      }
    })
    .onEnd((event) => {
      scale.value = withTiming(1, { duration: 150 });
      
      if (event.translationX > SWIPE_THRESHOLD) {
       
        translateX.value = withTiming(CARD_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(event.translationY * 0.2, { duration: 300 });
        if (onSwipeProgress) {
          runOnJS(onSwipeProgress)(1);
        }
        runOnJS(handleSwipeEnd)('right');
      } else if (event.translationX < -SWIPE_THRESHOLD) {
       
        translateX.value = withTiming(-CARD_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(event.translationY * 0.2, { duration: 300 });
        if (onSwipeProgress) {
          runOnJS(onSwipeProgress)(1);
        }
        runOnJS(handleSwipeEnd)('left');
      } else {
       
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
        if (onSwipeProgress) {
          runOnJS(onSwipeProgress)(0);
        }
      }
    });

  const onTap = () => {
    if (!totalPhotos) return;
    setPhotoIndex((i) => (i + 1) % totalPhotos);
  };



  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.card, 
          animatedStyle, 
          { zIndex }, 
          extraTransforms && { transform: extraTransforms },
          style
        ]}
        pointerEvents={disableActions ? 'none' : 'auto'}
      >
      <Pressable onPress={onTap} style={{ flex: 1 }}>
          {currentPhoto ? (
            <Image source={{ uri: currentPhoto }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.placeholder]} />
          )}
          {totalPhotos > 0 && <PhotoIndicator total={totalPhotos} current={photoIndex} />}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.7)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
            pointerEvents="none"
          >
            <View style={styles.textWrap}>
              <Text style={styles.nameOverlay}>
                {person.name} <Text style={styles.ageOverlay}>{person.age}</Text>
              </Text>
              {person.location ? <Text style={styles.locationOverlay}>{person.location}</Text> : null}
            </View>
          </LinearGradient>
      </Pressable>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.cardBg,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#333',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '40%',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  textWrap: {
    padding: 12,
  },
  nameOverlay: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  ageOverlay: {
    color: 'rgba(255,255,255,0.85)',
  },
  locationOverlay: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
});