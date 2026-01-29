import { StyleSheet } from "react-native";

export const friendCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    color: "#888",
  },
  requestedButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginLeft: 8,
  },
  requestedButtonText: {
    color: "#64748B",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#13A4EC",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginLeft: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  moreButton: {
    marginLeft: 8,
    padding: 8,
  },
});
