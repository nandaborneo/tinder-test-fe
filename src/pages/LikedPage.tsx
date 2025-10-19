import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLiked } from '../hooks/useOpponents';
import { ProfileCard } from '../molecules/ProfileCard';
import { colors } from '../theme/colors';

export default function LikedPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useLiked(10);
  const people = data?.pages.flatMap((p) => p.data) ?? [];

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <ProfileCard 
        person={item} 
        disableActions 
        onSwiped={() => {}} 
        style={styles.card}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={() => hasNextPage && fetchNextPage()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background || '#f5f5f5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'relative',
    marginHorizontal: 4,
  },
  separator: {
    height: 16,
  },
});