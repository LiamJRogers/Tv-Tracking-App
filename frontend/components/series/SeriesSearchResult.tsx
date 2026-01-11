import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../../styles/seriesSearchResult.styles";

type SeriesSearchResultProps = {
  name: string;
  posterUrl?: string;
  genres: string[];
  onPress?: () => void;
  description?: string;
};

const SeriesSearchResult: React.FC<SeriesSearchResultProps> = ({
  name,
  posterUrl,
  genres = [],
  onPress,
  description,
}) => (
  <Pressable onPress={onPress} style={styles.card}>
    <View style={styles.container}>
      {posterUrl && (
        <Image
          source={{ uri: posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        <View style={styles.genresContainer}>
          {genres.map((genre) => (
            <Text key={genre} style={styles.genre}>
              {genre}
            </Text>
          ))}
        </View>
      </View>
    </View>
  </Pressable>
);

export default SeriesSearchResult;
