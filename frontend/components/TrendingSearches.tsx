import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/searchScreen.styles";

type Props = {
  trending: string[];
  onSelect: (query: string) => void;
};

export default function TrendingSearches({ trending, onSelect }: Props) {
  if (trending.length === 0) return null;
  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.sectionTitle}>Trending Searches</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {trending.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => onSelect(t)}
            style={styles.trendingButton}
          >
            <Text style={styles.trendingText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
