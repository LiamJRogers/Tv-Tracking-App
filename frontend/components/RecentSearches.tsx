import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { styles } from "../styles/searchScreen.styles";

type Props = {
  history: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
};

export default function RecentSearches({ history, onSelect, onRemove }: Props) {
  if (history.length === 0) return null;
  return (
    <View>
      <Text style={styles.sectionTitle}>Recent Searches</Text>
      {history.map((h) => (
        <View key={h} style={styles.historyRow}>
          <TouchableOpacity onPress={() => onSelect(h)} style={{ flex: 1 }}>
            <Text style={styles.historyText}>{h}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onRemove(h)}
            style={{ padding: 8 }}
            accessibilityLabel={`Remove ${h} from recent searches`}
          >
            <MaterialIcons name="close" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
