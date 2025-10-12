import { StyleSheet } from "react-native";
import { SharedStyles } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingTop: 48,
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 0,
    alignItems: "center",
    marginTop: 82,
    marginBottom: 0,
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
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
    gap: 6,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#E9EDF4",
    backgroundColor: "#E9EDF4",
    borderRadius: 8,
    width: 50,
    height: 56,
    textAlign: "center",
    marginBottom: 0,
  },
  verifyButton: {
    ...SharedStyles.darkButton,
    marginTop: 8,
    marginBottom: 12,
  },
  verifyButtonText: {
    ...SharedStyles.darkButtonText,
  },
  bottomButtons: {
    marginBottom: 24,
    gap: 12,
  },
  bottomButton: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 0,
  },
  resendButton: {
    ...SharedStyles.lightButton,
  },
  resendButtonText: {
    ...SharedStyles.lightButtonText,
  },
  getHelpButton: {
    backgroundColor: "#fff",
    marginTop: 8,
  },
  getHelpButtonText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  },
});
