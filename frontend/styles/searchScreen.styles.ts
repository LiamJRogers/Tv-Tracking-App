import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EDF4",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginTop: 0,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: 16,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  section: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    marginTop: 14,
    color: "#000",
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyText: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 17,
    color: "#000",
  },
  trendingButton: {
    backgroundColor: "#E9EDF4",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 10,
    marginBottom: 10,
  },
  trendingText: {
    color: "#13A4EC",
    fontSize: 15,
  },
  loadingText: {
    marginTop: 20,
  },
});