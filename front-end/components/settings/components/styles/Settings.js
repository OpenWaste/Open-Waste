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
      midText: {
        fontFamily: "Roboto",
        fontSize: 14,
        textAlign: "left",
        marginLeft: 0,
        marginRight: 5,
        marginTop: 2,
        color: "grey",
      },
      midText2: {
        fontFamily: "Roboto",
        fontSize: 14,
        textAlign: "left",
        marginLeft: 0,
        marginRight: 0,
        marginTop: 2,
        color: "grey",
      },
      leftIcon: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
      },
      rightIcon: {
        marginLeft: 200,
        marginRight: 10,
      },
      viewElement: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
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