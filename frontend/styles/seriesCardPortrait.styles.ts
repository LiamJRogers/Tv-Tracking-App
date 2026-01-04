import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: 160,
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: "transparent",
    width: 160,
  },
  image: {
    width: 170,
    height: 240,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 6,
    color: "#222",
    width: 140,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: 140,
  },
  genre: {
    backgroundColor: "rgba(230,230,230,0.7)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    fontSize: 11,
    marginBottom: 4,
    color: "#444",
    textAlign: "left",
  },
  lastWatchedText: {
    color: "#4c809a",
    fontSize: 14,
    fontWeight: "normal",
    marginTop: -5,
  },
});
