import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/episodesList.styles";
import { Episode, Season } from "../../types/series";

type EpisodesListProps = {
  episodes: Episode[];
  seasons: Season[];
};

const EpisodesList: React.FC<EpisodesListProps> = ({ episodes, seasons }) => {
  const [checkedEpisodes, setCheckedEpisodes] = useState<number[]>([]);

  const toggleCheckbox = (id: number) => {
    setCheckedEpisodes((prev) =>
      prev.includes(id) ? prev.filter((epId) => epId !== id) : [...prev, id]
    );
  };

  const handlePersonAdd = (id: number) => {
    console.log(`Person add clicked for episode ${id}`);
  };

  return (
    <View style={styles.container}>
      {episodes.map((ep, idx) => (
        <View key={ep.id}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.episodeTitle}>
                {ep.episodeNumber === 0 ? "SP" : ep.episodeNumber}. {ep.name}
              </Text>
              {ep.description && (
                <Text
                  style={styles.episodeDescription}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  {ep.description}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => toggleCheckbox(ep.id)}
              style={styles.iconButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name={
                  checkedEpisodes.includes(ep.id)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={24}
                color={checkedEpisodes.includes(ep.id) ? "#13A4EC" : "#B0B0B0"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePersonAdd(ep.id)}
              style={styles.iconButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons name="person-add-alt" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
          {idx !== episodes.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

export default EpisodesList;
