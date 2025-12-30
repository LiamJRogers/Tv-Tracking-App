import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { styles } from "../../styles/castList.styles";
import { CastMember } from "../../types/cast";

type CastListProps = {
  cast: CastMember[];
};

const CastList: React.FC<CastListProps> = ({ cast }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Cast</Text>
    <FlatList
      data={cast}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="clip">
            {item.name}
          </Text>
          {item.characterName && (
            <Text
              style={styles.character}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.characterName}
            </Text>
          )}
        </View>
      )}
    />
  </View>
);

export default CastList;
