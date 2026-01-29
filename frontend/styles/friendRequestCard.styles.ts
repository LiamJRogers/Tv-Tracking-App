import { StyleSheet } from "react-native";

export const friendRequestCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  username: {
    color: "#888",
  },
  acceptButton: {
    backgroundColor: "#13A4EC",
    borderRadius: 999,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  declineButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
