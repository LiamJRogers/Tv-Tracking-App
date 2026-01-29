import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

type TopBarProps = {
  onNotifications?: () => void;
  showBackButton?: boolean;
  showBorder?: boolean;
  showSearch?: boolean;
  showFriends?: boolean;
  heading?: string;
};

export default function TopBar({
  onNotifications,
  showBackButton = false,
  showBorder = true,
  showSearch = true,
  showFriends = true,
  heading,
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <MaterialIcons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      ) : (
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#13A4EC" }}>
          TV Tracker
        </Text>
      )}
      {heading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 70,
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#222" }}>
            {heading}
          </Text>
        </View>
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {showSearch && (
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={{
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={28}
              color={"#64748B"}
            />
          </TouchableOpacity>
        )}
        {showFriends && (
          <TouchableOpacity
            onPress={() => router.push("/friends")}
            style={{
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="account-supervisor-outline"
              size={34}
              color={"#64748B"}
            />
          </TouchableOpacity>
        )}
        {onNotifications && (
          <TouchableOpacity
            onPress={onNotifications}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={28}
              color={"#64748B"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
