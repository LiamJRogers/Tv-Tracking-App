import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/seriesDetail.styles";
import { useWatchlist } from "../../hooks/useWatchlist";

type AddToWatchlistButtonProps = {
  seriesId: number;
};

export const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({
  seriesId,
}) => {
  const { loading, inWatchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlist(seriesId);

  if (inWatchlist === null) {
    return (
      <TouchableOpacity style={styles.addButton} disabled>
        <ActivityIndicator color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={inWatchlist ? removeFromWatchlist : addToWatchlist}
      style={[styles.addButton, inWatchlist && styles.removeButton]}
      activeOpacity={0.85}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={inWatchlist ? "#13A4EC" : "#fff"} />
      ) : (
        <>
          {!inWatchlist && (
            <MaterialIcons
              name="add"
              size={22}
              color="#fff"
              style={{ marginRight: 6 }}
            />
          )}
          <Text
            style={[
              styles.addButtonText,
              inWatchlist && styles.removeButtonText,
            ]}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};