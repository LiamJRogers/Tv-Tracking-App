import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TopBarProps = {
  onSearch?: () => void;
  onNotifications?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  showBorder?: boolean;
};

export default function TopBar({
  onSearch,
  onNotifications,
  showBackButton = false,
  onBack,
  showBorder = true,
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
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: "#E5E7EB",
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
