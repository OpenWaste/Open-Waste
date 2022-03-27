import { StyleSheet } from "react-native";

export default StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  },
  user: {
    color: '#4287f5'
  },
  marker: {
    color:'red'
  },
  header: {
    paddingHorizontal:15,
    marginBottom: 10,
    color: "#808080",
  },
  text: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: "#808080",
  },
  imageScroll: {
    paddingHorizontal:15,
    height:'25%',
  },
  image: {
    marginRight: 12,
    height: '90%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  flatList: {
    paddingLeft: 15, 
    marginTop: 15, 
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1
  },
  searchContainer: {
    marginTop: 60,
    position: "relative",
    zIndex: -1,
    backgroundColor: "#F9F9F9"
  },
  searchBar: {
    width: 100,
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 5,
    fontSize: 14,
    color: "#808080",
    backgroundColor: "#F9F9F9"
  },
  directionsButton: {
    backgroundColor: "#0F968D",
  },
  headerContainer: {
    marginBottom: 25,
    justifyContent: "space-between"
  },
  bottomSheet: {
    padding: 10
  }
});
