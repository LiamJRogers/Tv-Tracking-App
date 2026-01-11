import React from "react";
import { View, Text, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SeriesCardPortrait from "../series/SeriesCardPortrait";
import { styles } from "../../styles/completedTab.styles";

export function CompletedTab({
  loading,
  data,
  onSeriesPress,
}: {
  loading: boolean;
  data: any[];
  onSeriesPress: (series: any) => void;
}) {
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
        <MaterialIcons name="checklist-rtl" size={82} color="#CBD5E1" />
        <Text style={styles.emptyTitle}>No completed series</Text>
        <Text style={styles.emptyText}>
          Once you finish a series, it will appear here so you can look back on
          what you’ve watched.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Completed Series</Text>
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
