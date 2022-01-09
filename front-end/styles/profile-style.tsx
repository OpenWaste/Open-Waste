import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    
    /*Guest Profile*/
    header: {
      width: '100%' ,
      height: Dimensions.get('window').height/5 ,
      backgroundColor: '#0F968D' ,
      position: 'absolute', 
    },
    
    profilePic: {
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
      borderWidth: 3,
      borderColor: 'white',
      width: Dimensions.get('window').width * 0.35,
      height: Dimensions.get('window').width * 0.35,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop: '18%',
    },
    
    username: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 25,
      marginTop: 10,
      color: 'grey',
    },
    
    loginBtn: {
      backgroundColor: '#0F968D',
      fontFamily: 'Roboto',
      alignSelf: 'center',
      marginTop: 20,
      width: '30%'
    },
  });