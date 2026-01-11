import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TopBar from "../../../components/TopBar";
import SeriesSearchResult from "../../../components/series/SeriesSearchResult";
import NoResults from "../../../components/NoResults";
import RecentSearches from "../../../components/RecentSearches";
import TrendingSearches from "../../../components/TrendingSearches";
import { useSeriesNavigation } from "../../../hooks/useSeriesNavigation";
import { styles } from "../../../styles/searchScreen.styles";
import { useSeriesSearch } from "../../../hooks/useSeriesSearch";

export default function SearchScreen() {
  const {
    query,
    setQuery,
    results,
    loading,
    history,
    hasSearched,
    trendingSearches,
    handleSubmitSearch,
    handleSeriesResultPress,
    handleHistoryPress,
    handleClearSearch,
    handleRemoveHistory,
  } = useSeriesSearch();

  const handleSeriesPress = useSeriesNavigation();

  return (
    <View style={styles.container}>
      <TopBar showBackButton showBorder={false} showSearch={false} />
      <View style={styles.searchBarWrapper}>
        <MaterialIcons
          name="search"
          size={24}
          color="#64748B"
          style={{ marginRight: 8 }}
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for a series..."
          style={styles.searchInput}
          autoFocus
          placeholderTextColor="#B0B0B0"
          onSubmitEditing={handleSubmitSearch}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={{ marginLeft: 8 }}
            accessibilityLabel="Clear search"
          >
            <MaterialIcons name="close" size={24} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.section}>
        {query === "" && (
          <>
            <RecentSearches
              history={history}
              onSelect={handleHistoryPress}
              onRemove={handleRemoveHistory}
            />
            <TrendingSearches
              trending={trendingSearches}
              onSelect={handleHistoryPress}
            />
          </>
        )}
        {loading && <Text style={styles.loadingText}>Searching...</Text>}
        {!loading && results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SeriesSearchResult
                name={item.name}
                posterUrl={item.poster_url}
                genres={item.genres || []}
                description={item.description}
                onPress={() => handleSeriesResultPress(item, handleSeriesPress)}
              />
            )}
          />
        )}
        {!loading && hasSearched && query && results.length === 0 && (
          <NoResults />
        )}
      </View>
    </View>
  );
}
