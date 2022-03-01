import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1
    },
    headerStyle: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '100',
      marginBottom: 24
    },
    elementsContainer: {
      flex: 1,
      backgroundColor: 'grey',
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
    },
    text: {
      // textAlign: "center",
      // fontWeight: "bold",
      fontFamily: "Roboto",
      fontSize: 14,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 20,
      marginTop: 20,
      color: "grey",
    },
    textHeader: {
      // textAlign: "center",
      fontWeight: "bold",
      fontFamily: "Roboto",
      fontSize: 18,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 0,
      marginTop: 20,
      color: "grey",
    }
});
