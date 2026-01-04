import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/episodesList.styles";
import { Episode, Season } from "../../types/series";

type EpisodesListProps = {
  episodes: Episode[];
  seasons: Season[];
  seriesId: number;
  watched: number[];
  loading: boolean;
  markWatched: (id: number) => void;
  unmarkWatched: (id: number) => void;
};

function formatEpisodeTitle(ep: Episode) {
  return `${ep.episodeNumber === 0 ? "SP" : `Ep${ep.episodeNumber}`}. ${
    ep.name
  }`;
}

export const EpisodesList: React.FC<EpisodesListProps> = ({
  episodes,
  watched,
  loading,
  markWatched,
  unmarkWatched,
}) => {
  const handleCheckbox = useCallback(
    (id: number) => {
      if (watched.includes(id)) unmarkWatched(id);
      else markWatched(id);
    },
    [watched, markWatched, unmarkWatched]
  );

  const handlePersonAdd = useCallback((id: number) => {
    // TODO: Implement "watched together" feature
    console.log(`Person add clicked for episode ${id}`);
  }, []);

  return (
    <View style={styles.container}>
      {episodes.map((ep, idx) => (
        <View key={ep.id}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.episodeTitle}>{formatEpisodeTitle(ep)}</Text>
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
              onPress={() => handleCheckbox(ep.id)}
              style={styles.iconButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={loading}
            >
              <MaterialIcons
                name={
                  watched.includes(ep.id)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={24}
                color={watched.includes(ep.id) ? "#13A4EC" : "#B0B0B0"}
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
