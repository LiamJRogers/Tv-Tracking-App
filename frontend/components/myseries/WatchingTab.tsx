import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SeriesCardPortrait from "../series/SeriesCardPortrait";
import { useRouter } from "expo-router";
import { styles } from "../../styles/watchingTab.styles";

export function WatchingTab({
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
        <MaterialIcons
          name="local-movies"
          size={82}
          color="#CBD5E1"
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyTitle}>Nothing being watched</Text>
        <Text style={styles.emptyText}>
          Start watching a series to see it here and keep track of your
          progress.
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
      <Text style={styles.listTitle}>Currently Watching</Text>
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
              lastWatched={
                item.lastWatched
                  ? {
                      seasonNumber: item.lastWatched.seasonNumber,
                      episodeNumber: item.lastWatched.episodeNumber,
                    }
                  : undefined
              }
            />
          </View>
        )}
      />
    </View>
  );
}
