import React from "react";
import { View, Text, StyleSheet } from "react-native";

type DividerWithTextProps = {
  text: string;
};

export function DividerWithText({ text }: DividerWithTextProps) {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#64748b46",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#64748B",
    fontSize: 14,
  },
});
