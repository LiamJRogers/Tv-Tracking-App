import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  genre: {
    fontSize: 11,
    color: "#13A4EC",
    backgroundColor: "#E9EDF4",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 2,
  },
});
