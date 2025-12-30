import React from "react";
import { View, FlatList } from "react-native";
import TopBar from "../../components/TopBar";
import SeriesCardPortrait from "../../components/series/SeriesCardPortrait";
import DiscoverHeader from "../../components/discover/DiscoverHeader";
import { styles } from "../../styles/discover.styles";
import { useSeriesNavigation } from "../../hooks/useSeriesNavigation";
import { useDiscoverData } from "../../hooks/useDiscoverData";

export default function DiscoverScreen() {
  const {
    selectedGenre,
    setSelectedGenre,
    newlyAdded,
    allGenres,
    filteredTopRated,
  } = useDiscoverData();

  const handleSeriesPress = useSeriesNavigation();

  return (
    <View style={styles.container}>
      <TopBar onSearch={() => {}} onNotifications={() => {}} />
      <FlatList
        data={filteredTopRated}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={
          <DiscoverHeader
            newlyAdded={newlyAdded}
            allGenres={allGenres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            onSeriesPress={handleSeriesPress}
          />
        }
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <SeriesCardPortrait
              name={item.name}
              posterUrl={item.poster_url}
              genres={item.genres || []}
              onPress={() => handleSeriesPress(item)}
            />
          </View>
        )}
      />
    </View>
  );
}
