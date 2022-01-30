import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
  img: {
    alignSelf: "center",
    marginTop: "25%",
    width: "55%",
    height: "20%",
  },

  resetImg: {
    alignSelf: "center",
    marginTop: "25%",
    width: "35%",
    height: "25%",
  },

  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 40,
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "10%",
    color: "grey",
  },

  description: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
    color: "grey",
  },

  submitBtn: {
    backgroundColor: "#0F968D",
    fontFamily: "Roboto",
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
  },

  toLogin: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    marginTop: "10%",
    color: "#0F968D",
  },

  verifyBg: {
    backgroundColor: "#0F968D",
    height: Dimensions.get("window").height,
  },

  verifyHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 40,
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
    color: "white",
  },

  verifyText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
    color: "white",
  },

  okBtn: {
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
    alignSelf: "center",
    marginTop: 20,
    width: "90%",
  },

  container: {
    height: Dimensions.get("window").height,
  },
});
