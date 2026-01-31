import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 32,
    paddingBottom: 36,
    alignItems: "center",
  },
  spacer: {
    height: 48,
  },
  cancelButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F1F5F9",
  },
  cancelText: {
    color: "#64748B",
    fontWeight: "bold",
    fontSize: 16,
  },
});
