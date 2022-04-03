import { StyleSheet } from "react-native";

export default StyleSheet.create({
    leftIcon: {
        marginLeft: 20,
        marginRight: 0,
        color: "grey",
      },
      rightIcon: {
        marginLeft: 50,
        marginRight: 0,
        color: "grey",
      },
      midText: {
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 5,
        marginRight: 125,
        marginTop: 2,
        color: "grey",
      },
      viewElement: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 10,
      },
      viewItem1: {
        flex: 0.2,
      },
      viewItem2: {
        flex: 1,
      },
      viewItem3: {
        flex: 0.2,
      },
      checkMark: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: "#BDBDBD",
        backgroundColor: "transparent",
        height: 40,
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "5%",
        },
      wideGreen: {
        width: 300,
        color: "green",
        fontFamily: "Roboto",
        fontSize: 14,
        marginLeft: 5
      },
      wideBlack: {
        width: 300,
        color: "grey",
        fontFamily: "Roboto",
        fontSize: 14,
        marginLeft: 5
    },
      languageWarning: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 6,
        color: "gray"
      }
});
