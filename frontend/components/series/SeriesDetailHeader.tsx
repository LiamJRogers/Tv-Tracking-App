import React from "react";
import { View, Image, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles } from "../../styles/seriesDetailHeader.styles";
import { Series } from "../../types/series";

type SeriesDetailHeaderProps = {
  series: Series;
};

const getYear = (date?: string) =>
  date ? new Date(date).getFullYear() : undefined;

const SeriesDetailHeader: React.FC<SeriesDetailHeaderProps> = ({ series }) => (
  <View style={styles.container}>
    {series.poster_url && (
      <Image
        source={{ uri: series.poster_url }}
        style={styles.poster}
        resizeMode="cover"
      />
    )}
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={2}>
        {series.name}
      </Text>
      <View style={styles.metaRow}>
        {series.rating && (
          <View style={styles.rating}>
            <MaterialIcons
              name="star-border"
              size={16}
              color="#FFD700"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.ratingText}>{series.rating}</Text>
          </View>
        )}
        {series.rating && series.release_date && (
          <MaterialIcons
            name="circle"
            size={6}
            color="#888"
            style={{ marginHorizontal: 8 }}
          />
        )}
        {series.release_date && (
          <Text style={styles.yearText}>{getYear(series.release_date)}</Text>
        )}
        {(series.rating || series.release_date) && series.genres.length > 0 && (
          <MaterialIcons
            name="circle"
            size={6}
            color="#888"
            style={{ marginHorizontal: 8 }}
          />
        )}
        {series.genres.length > 0 && (
          <Text style={styles.genresText}>{series.genres.join(", ")}</Text>
        )}
      </View>
      {series.description && (
        <Text style={styles.description} numberOfLines={6} ellipsizeMode="tail">
          {series.description}
        </Text>
      )}
    </View>
  </View>
);

export default SeriesDetailHeader;
