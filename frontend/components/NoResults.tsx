import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function NoResults() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -80,
      }}
    >
      <MaterialIcons name="search-off" size={72} color="#CBD5E1" />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          marginTop: 24,
          marginBottom: 12,
          color: "#222",
          textAlign: "center",
        }}
      >
        No results found
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          textAlign: "center",
          maxWidth: 320,
          marginBottom: 4,
        }}
      >
        No results found for your search
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#666",
          textAlign: "center",
          maxWidth: 320,
          marginBottom: 4,
        }}
      >
        Try a different query or browse the
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/discover");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#13A4EC",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 28,
          }}
        >
          discover page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
