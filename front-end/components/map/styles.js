import { StyleSheet } from "react-native";

export default StyleSheet.create({
  map: {
    width: "100%",
    height: "89%"
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
  searchContainer: {
    marginTop: 30,
    position: 'relative',
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
  flatList: {
    flexWrap: 'wrap',
    alignItems: 'baseline',
    padding: 15,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderRadius: 4
  },
  flatListText: {
    fontSize: 16,
    color: '#808080'
  },
  flatListAddress: {
    fontSize: 12,
    color: '#C4C4C4'
  },
  directionsButton: {
    backgroundColor: "#0F968D",
  },
  headerContainer: {
    marginBottom: 25,
    justifyContent: "space-between"
  },
  bottomSheet: {
    padding: 10,
    paddingTop: 0
  },
  pressable: {
    backgroundColor: '#C4C4C4'
  }
});
