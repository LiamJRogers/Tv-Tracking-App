import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 2,
  },
  username: {
    color: "#888",
    marginBottom: 2,
  },
  friendsSince: {
    color: "#64748B",
  },
});
