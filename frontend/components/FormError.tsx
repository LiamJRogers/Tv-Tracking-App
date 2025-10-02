import React from "react";
import { View, Text, StyleSheet } from "react-native";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <View style={styles.generalErrorContainer}>
      <Text style={styles.generalErrorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  generalErrorContainer: {
    backgroundColor: "#FEF3F2",
    borderColor: "#FEC9C9",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  generalErrorText: {
    color: "#B9211F",
    fontSize: 15,
  },
});
