import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    marginTop: 82,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 28,
  },
  discoverButton: {
    backgroundColor: "#13A4EC",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  discoverButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 16,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 20,
  },
  flatListContent: {
    padding: 16,
    paddingBottom: 32,
  },
  flatListColumn: {
    gap: 16,
  },
});
