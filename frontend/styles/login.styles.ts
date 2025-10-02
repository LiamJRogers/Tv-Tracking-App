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
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#13A4EC",
    fontSize: 14,
  },
  loginButton: {
    ...SharedStyles.darkButton,
    marginBottom: 24,
  },
  loginButtonText: {
    ...SharedStyles.darkButtonText,
  },
  signupButton: {
    ...SharedStyles.lightButton,
    marginBottom: 24,
  },
  signupButtonText: {
    ...SharedStyles.lightButtonText,
  },
});
