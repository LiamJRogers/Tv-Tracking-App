import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TopBar({ onSearch, onNotifications }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 16,
        backgroundColor: "#ffff",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#13A4EC" }}>
        TV Tracker
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={onSearch} style={{ marginRight: 20 }}>
          <MaterialIcons name="search" size={28} color={"#64748B"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotifications}>
          <MaterialIcons
            name="notifications-none"
            size={28}
            color={"#64748B"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
