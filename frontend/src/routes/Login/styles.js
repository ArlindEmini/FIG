import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
  mainView: {
    backgroundColor: "#fff",
    height: "100%",
  },
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexBasis: "auto",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: "20%",
    shadowOpacity: 0
  },
  cardContent: {
    alignItems: "center"
  },
  title: {
    fontSize: 28,
  },
  container: {
    margin: 10,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
