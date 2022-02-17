import { StyleSheet } from "react-native";

export default StyleSheet.create({
  fullScreenView: {
    flex: 1,
    zIndex: -1,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 25,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    overflow: "hidden",
    marginBottom: 75,
    backgroundColor: "white",
    borderRadius: 20,
    height: "95%",
    width: "95%",
    alignItems: "center",
    elevation: 5,
  },

  modalCloseButton: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 10,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  map: {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  predictionTextContainer: {
    flex: 1,
    top: "25%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  predictionText: {
    fontFamily: "Roboto",
    fontSize: 40,
    backgroundColor: "#0F968D",
    color: "white",
    borderRadius: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  nextButton: {
    height: "75%",
    width: "20%",
    top: 0,
    bottom: 0,
    marginTop: "auto",
    marginBottom: "auto",
  },

  imageSubmissionButton: {
    position: "absolute",
    left: 55,
  },

  swipeUpWindowContent: {flex: 1, marginTop: 40},
  swipeUpWindowHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F1F1F1',
  },
  swipeUpWindowHeaderContent:{
    marginTop: 0,
  },
  swipeUpWindowModal: {
    backgroundColor: '#005252',
    marginTop: 0,
  }
});
