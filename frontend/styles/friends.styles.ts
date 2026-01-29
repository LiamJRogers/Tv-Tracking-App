import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { flex: 1 },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    color: "#222",
  },
  sectionHeaderRow: {
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  suggestionsRow: {
    paddingHorizontal: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  noFriendsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  noFriendsIcon: {
    marginBottom: 16,
  },
  noFriendsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  noFriendsText: {
    color: "#888",
    fontSize: 15,
    textAlign: "center",
    maxWidth: 260,
  },
});
