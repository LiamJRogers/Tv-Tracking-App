import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../../styles/seriesCardPortrait.styles";

type SeriesCardPortraitProps = {
  name: string;
  posterUrl?: string;
  genres: string[];
  onPress?: () => void;
};

const SeriesCardPortrait: React.FC<SeriesCardPortraitProps> = ({
  name,
  posterUrl,
  genres = [],
  onPress,
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
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <View style={styles.genresContainer}>
        {genres.map((genre) => (
          <Text key={genre} style={styles.genre}>
            {genre}
          </Text>
        ))}
      </View>
    </View>
  </Pressable>
);

export default SeriesCardPortrait;
