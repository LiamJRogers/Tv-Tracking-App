import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type TopBarProps = {
  onNotifications?: () => void;
  showBackButton?: boolean;
  showBorder?: boolean;
  showSearch?: boolean;
};

export default function TopBar({
  onNotifications,
  showBackButton = false,
  showBorder = true,
  showSearch = true,
}: TopBarProps) {
  const router = useRouter();
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
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      ) : (
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#13A4EC" }}>
          TV Tracker
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        {showSearch && (
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={{ marginRight: 20 }}
          >
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
