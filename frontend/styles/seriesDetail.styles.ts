import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  addButtonWrapper: { marginVertical: 12, marginHorizontal: 18 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#13A4EC",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DC2E2D",
  },
  removeButtonText: {
    color: "#DC2E2D",
  },
  episodesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  episodesTitle: { fontWeight: "bold", fontSize: 18 },
  dropDownContainer: { minWidth: 120, maxWidth: 140, zIndex: 1000 },
  dropDownPicker: {
    backgroundColor: "#fff",
    width: 120,
    borderColor: "#d7d7d7ff",
    height: 40,
    minHeight: 40,
    paddingVertical: 0,
  },
  dropDownPickerContainer: {
    backgroundColor: "#fff",
    width: 120,
    borderColor: "#d7d7d7ff",
    minHeight: 40,
  },
  dropDownText: { fontSize: 15, lineHeight: 20 },
  dropDownLabel: { fontSize: 15, lineHeight: 20 },
  dropDownListItem: { minHeight: 40, height: 40 },
  episodesListWrapper: { flex: 1 },
  completedButton: {
    backgroundColor: "#E9EDF4",
    borderWidth: 1,
    borderColor: "#13A4EC",
  },
  completedButtonText: {
    color: "#13A4EC",
    fontWeight: "bold",
    fontSize: 16,
  },
});
