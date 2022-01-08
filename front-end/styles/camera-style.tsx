import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
      footer: {              
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        bottom: 25,
        position: 'absolute',
        left:0,
        right:0,
        marginLeft:'auto',
        marginRight:'auto'
      },
  });