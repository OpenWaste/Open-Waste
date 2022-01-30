import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export default StyleSheet.create({
  header: {
    width: "100%",
    height: Dimensions.get("window").height / 5,
    backgroundColor: "#0F968D",
    position: "absolute",
  },

  container: {
    flex: 1,
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
    marginTop: 10,
    color: "grey",
  },

  btnView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },

  editBtn: {
    backgroundColor: "#0F968D",
    fontFamily: "Roboto",
    width: "30%",
    marginRight: "2%",
  },

  logOutBtn: {
    backgroundColor: "#BDBDBD",
    fontFamily: "Roboto",
    width: "30%",
    marginLeft: "2%",
  },

  userInfoView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: "7%",
    paddingHorizontal: "7%",
    marginVertical: "2%",
    marginHorizontal: "5%",
  },

  userInfoIcons: {
    color: "#B6E28E",
  },

  userInfo: {
    flexDirection: "column",
    marginHorizontal: "5%",
    justifyContent: "center",
  },

  userInfoTextHeader: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#808080",
  },

  userInfoText: {
    fontFamily: "Roboto",
    color: "#BDBDBD",
  },

  /*Guest Profile*/
  loginBtn: {
    backgroundColor: "#0F968D",
    fontFamily: "Roboto",
    alignSelf: "center",
    marginTop: 20,
    width: "30%",
  },
});
