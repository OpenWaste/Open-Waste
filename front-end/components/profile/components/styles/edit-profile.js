import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  header: {
    width: "100%",
    height: Dimensions.get("window").height / 5,
    backgroundColor: "#0F968D",
    position: "absolute",
  },

  profilePic: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    borderWidth: 3,
    borderColor: "white",
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").width * 0.35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "18%",
  },

  username: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 25,
    marginVertical: 15,
    color: "grey",
  },

  deleteBtn: {
    backgroundColor: "transparent",
    borderColor: "#D33333",
    borderWidth: 3,
    borderRadius: 10,
    color: "black",
    fontFamily: "Roboto",
    marginVertical: 15,
    width: "94%",
    justifyContent: "flex-start",
  },

  btnView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10%",
  },

  cancelBtn: {
    backgroundColor: "#BDBDBD",
    fontFamily: "Roboto",
    width: "30%",
    marginRight: "2%",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderRadius: 5, 
  },

  saveBtn: {
    backgroundColor: "#0F968D",
    fontFamily: "Roboto",
    width: "30%",
    marginLeft: "2%",
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#0F968D',
    borderWidth: 2,
    borderRadius: 5, 
  },
  editBttn: {
    position: "absolute",
    marginLeft: "10%",
  },
});
