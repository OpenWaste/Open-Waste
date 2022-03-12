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
      fontFamily: "Roboto",
      fontSize: 14,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 20,
      marginTop: 20,
      color: "grey",
    },
    textHeader: {
      fontWeight: "bold",
      fontFamily: "Roboto",
      fontSize: 18,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 0,
      marginTop: 20,
      color: "grey",
    },
    viewMain: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 5,
      backgroundColor: 'white',
    },
    logo1: {
      resizeMode: 'center',
      flex: 1,
      width: 335,
      marginTop: -37,
      marginBottom: -35,
    },
    logo2: {
      resizeMode: 'center',
      flex: 1,
      width: 335,
      marginTop: -35,
      marginBottom: -35,
      height: 150,
    },
    viewMain2: {
      flexDirection: "row",
    },
    viewMain3: {
      flexDirection: "row",
      marginLeft: 40,
      marginBottom: 10,
    },
    viewSub1: {
      flex: 1,
      marginTop: 20,
    },
    viewSub2: {
      flex: 2,
      marginTop: 5,
      backgroundColor: '#FFFFFF',
    },
    image1: {
      width: 25,
      height: 15,
      flex: 1,
      marginLeft: 40,
    },
    image2: {
      width: 25,
      height: 25,
      flex: 1,
      marginLeft: 20,
    }
});
