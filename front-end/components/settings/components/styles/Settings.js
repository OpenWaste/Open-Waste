import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
      leftIcon: {
        marginLeft: 20,
        marginRight: 0,
        color: "grey",
      },
      rightIcon: {
        marginLeft: 10,
        marginRight: 0,
        color: "grey",
      },
      midText: {
        fontFamily: "Roboto",
        fontSize: 14,
        textAlign: "left",
        marginLeft: 5,
        marginRight: 45,
        marginTop: 2,
        color: "grey",
      },
      viewElement: {
        flexDirection: "row",
        marginTop: 10,
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
      viewMain: {
        marginTop: 40,
        marginBottom: 30,
      },
      mainText: {
        fontFamily: "Roboto",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 20,
        color: "grey",
      },
});