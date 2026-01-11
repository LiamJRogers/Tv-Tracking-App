import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SeriesCardPortrait from "../series/SeriesCardPortrait";
import { useRouter } from "expo-router";
import { styles } from "../../styles/watchlistTab.styles";

export function WatchlistTab({
  loading,
  data,
  onSeriesPress,
}: {
  loading: boolean;
  data: any[];
  onSeriesPress: (series: any) => void;
}) {
  const router = useRouter();
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: "#888" }}>Loading...</Text>
      </View>
    );
  }
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="bookmark-border" size={82} color="#CBD5E1" />
        <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
        <Text style={styles.emptyText}>
          Discover new series to add to your watchlist to keep track of what you
          want to watch next.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/discover")}
          style={styles.discoverButton}
        >
          <Text style={styles.discoverButtonText}>Discover Series</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>My Watchlists</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatListColumn}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <SeriesCardPortrait
              name={item.name}
              posterUrl={item.poster_url}
              genres={item.genres || []}
              onPress={() => onSeriesPress(item)}
              showGenres={false}
            />
          </View>
        )}
      />
    </View>
  );
}
