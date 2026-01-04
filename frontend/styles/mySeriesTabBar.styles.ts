import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#13A4EC",
    marginBottom: -1,
  },
  tabButtonInactive: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4c809a",
  },
  tabTextActive: {
    color: "#13A4EC",
  },
});
