import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TopBarProps = {
  onSearch?: () => void;
  onNotifications?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
};

export default function TopBar({
  onSearch,
  onNotifications,
  showBackButton = false,
  onBack,
}: TopBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
      }}
    >
      {showBackButton ? (
        <TouchableOpacity onPress={onBack}>
          <MaterialIcons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      ) : (
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#13A4EC" }}>
          TV Tracker
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        {onSearch && (
          <TouchableOpacity onPress={onSearch} style={{ marginRight: 20 }}>
            <MaterialIcons name="search" size={28} color={"#64748B"} />
          </TouchableOpacity>
        )}
        {onNotifications && (
          <TouchableOpacity onPress={onNotifications}>
            <MaterialIcons
              name="notifications-none"
              size={28}
              color={"#64748B"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
