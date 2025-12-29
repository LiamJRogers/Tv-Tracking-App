import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { styles } from "../../styles/seriesCardLandscape.styles";

type SeriesCardLandscapeProps = {
  name: string;
  posterUrl?: string;
  onPress?: () => void;
};

const SeriesCardLandscape: React.FC<SeriesCardLandscapeProps> = ({
  name,
  posterUrl,
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
    </View>
  </Pressable>
);

export default SeriesCardLandscape;
