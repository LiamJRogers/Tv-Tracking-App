import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type SocialButtonsProps = {
  disabled?: boolean;
};

export function SocialButtons({ disabled }: SocialButtonsProps) {
  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => alert("Google pressed")}
        disabled={disabled}
        accessibilityRole="button"
      >
        <Text style={styles.socialButtonText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => alert("Apple pressed")}
        disabled={disabled}
        accessibilityRole="button"
      >
        <Text style={styles.socialButtonText}>Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 32,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E9EDF4",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  socialButtonText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
