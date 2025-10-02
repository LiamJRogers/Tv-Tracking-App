import { StyleSheet } from "react-native";
import { SharedStyles } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 32,
    backgroundColor: "#fff",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  buttonGroup: {
    marginBottom: 16,
  },
  enableButton: {
    ...SharedStyles.darkButton,
    marginBottom: 12,
  },
  enableButtonText: {
    ...SharedStyles.darkButtonText,
  },
  skipButton: {
    ...SharedStyles.lightButton,
  },
  skipButtonText: {
    ...SharedStyles.lightButtonText,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E9EDF4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
});
