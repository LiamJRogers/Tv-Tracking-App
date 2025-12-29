import React from "react";
import { View, Text, Pressable } from "react-native";

type GenreChipsProps = {
  genres: string[];
  selectedGenre?: string;
  onSelect: (genre?: string) => void;
};

export const GenreChips: React.FC<GenreChipsProps> = ({
  genres,
  selectedGenre,
  onSelect,
}) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 8 }}>
    {genres.map((genre) => (
      <Pressable
        key={genre}
        onPress={() =>
          selectedGenre === genre ? onSelect(undefined) : onSelect(genre)
        }
        style={{
          backgroundColor:
            selectedGenre === genre
              ? "rgba(19,164,236,0.1)"
              : "rgba(230,230,230,0.7)",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
          marginRight: 8,
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: selectedGenre === genre ? "#13A4EC" : "#444",
            fontSize: 13,
            fontWeight: selectedGenre === genre ? "bold" : "normal",
          }}
        >
          {genre}
        </Text>
      </Pressable>
    ))}
  </View>
);

export default GenreChips;
