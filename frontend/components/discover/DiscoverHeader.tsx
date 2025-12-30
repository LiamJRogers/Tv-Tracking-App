import React from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import SeriesCardLandscape from "../series/SeriesCardLandscape";
import GenreChips from "./GenreChips";
import { Series } from "../../types/series";
import { styles } from "../../styles/discoverHeader.styles";

type DiscoverHeaderProps = {
  newlyAdded: Series[];
  allGenres: string[];
  selectedGenre?: string;
  setSelectedGenre: (genre?: string) => void;
  onSeriesPress: (series: Series) => void;
};

export default function DiscoverHeader({
  newlyAdded,
  allGenres,
  selectedGenre,
  setSelectedGenre,
  onSeriesPress,
}: DiscoverHeaderProps) {
  const { width } = useWindowDimensions();

  return (
    <View>
      <Text style={styles.sectionTitle}>Newly Added</Text>
      <View style={{ width }}>
        <FlatList
          data={newlyAdded}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <SeriesCardLandscape
                name={item.name}
                posterUrl={item.background_url}
                onPress={() => onSeriesPress(item)}
              />
            </View>
          )}
        />
      </View>
      <Text style={styles.genreTitle}>Explore by Genre</Text>
      <View>
        <GenreChips
          genres={allGenres}
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />
      </View>
      <Text style={styles.genreTitle}>Top Rated</Text>
    </View>
  );
}
