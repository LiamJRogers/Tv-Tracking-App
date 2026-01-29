import { StyleSheet } from "react-native";

export const friendSuggestionCardStyles = StyleSheet.create({
  container: {
    flexBasis: "25%",
    maxWidth: "25%",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  actionButton: {
    position: "absolute",
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  requestedText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  username: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginTop: 2,
  },
});
