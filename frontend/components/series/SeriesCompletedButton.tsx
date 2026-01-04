import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/seriesDetail.styles";

export const SeriesCompletedButton: React.FC = () => (
  <TouchableOpacity style={[styles.addButton, styles.completedButton]} disabled>
    <MaterialIcons
      name="check"
      size={22}
      color="#13A4EC"
      style={{ marginRight: 6 }}
    />
    <Text style={[styles.addButtonText, styles.completedButtonText]}>
      Series Completed
    </Text>
  </TouchableOpacity>
);
