import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
  },
  addReviewLabel: {
    fontSize: 15,
    color: "#444",
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9EDF4",
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#F6F7F8",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    marginTop: 6,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#444",
  },
  buttonsRowCentered: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 8,
  },
  fullWidthButton: {
    flex: 1,
    minWidth: 0,
  },
  cancelButton: {
    backgroundColor: "#E9EDF4",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#13A4EC",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#dad7d7ff",
  },
});
