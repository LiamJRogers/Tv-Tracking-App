import { StyleSheet } from "react-native";
import { SharedStyles } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "left",
  },
  input: {
    ...SharedStyles.input,
  },
  inputError: {
    ...SharedStyles.inputError,
  },
  errorText: {
    ...SharedStyles.errorText,
  },
  signupButton: {
    ...SharedStyles.darkButton,
    marginBottom: 24,
    marginTop: 24,
  },
  signupButtonText: {
    ...SharedStyles.darkButtonText,
  },
  loginButton: {
    ...SharedStyles.lightButton,
    marginBottom: 24,
  },
  loginButtonText: {
    ...SharedStyles.lightButtonText,
  },
  loginPromptContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  loginPromptText: {
    color: "#64748B",
    fontSize: 14,
  },
  loginLink: {
    color: "#13A4EC",
    fontWeight: "bold",
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 14,
    zIndex: 1,
    padding: 4,
  },
});
