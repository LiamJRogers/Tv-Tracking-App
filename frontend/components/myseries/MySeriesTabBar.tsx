import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../../styles/mySeriesTabBar.styles";

type MySeriesTabBarProps = {
  labels: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const MySeriesTabBar: React.FC<MySeriesTabBarProps> = ({
  labels,
  activeTab,
  setActiveTab,
}) => (
  <View style={styles.container}>
    {labels.map((label) => {
      const isActive = activeTab === label;
      return (
        <TouchableOpacity
          key={label}
          onPress={() => setActiveTab(label)}
          style={[
            styles.tabButton,
            isActive ? styles.tabButtonActive : styles.tabButtonInactive,
          ]}
        >
          <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);
