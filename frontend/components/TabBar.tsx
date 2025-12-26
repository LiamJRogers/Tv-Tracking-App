import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { useTab } from "../hooks/TabContext";

const tabs = [
  { name: "home", label: "Home", icon: "home" },
  { name: "my-series", label: "My Series", icon: "live-tv" },
  { name: "activity", label: "Activity", icon: "people" },
  { name: "discover", label: "Discover", icon: "explore" },
  { name: "profile", label: "Profile", icon: "person" },
];

export default function TabBar() {
  const router = useRouter();
  const { lastTab, setLastTab } = useTab();
  const segments = useSegments();

  const currentTab = tabs.find((tab) => segments.includes(tab.name))
    ? tabs.find((tab) => segments.includes(tab.name))!.name
    : lastTab;

  return (
    <View
      style={{
        flexDirection: "row",
        height: 80,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        backgroundColor: "#fff",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => {
            setLastTab(tab.name as any);
            router.replace(`/${tab.name}`);
          }}
          style={{ alignItems: "center", flex: 1 }}
        >
          <MaterialIcons
            name={tab.icon as any}
            size={28}
            color={currentTab === tab.name ? "#13A4EC" : "#64748B"}
          />
          <Text
            style={{
              color: currentTab === tab.name ? "#13A4EC" : "#64748B",
              fontSize: 10,
              marginTop: 2,
              fontWeight: currentTab === tab.name ? "bold" : "normal",
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
