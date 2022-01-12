import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    /* Note: Style for registration inputs are in forms-style.tsx */
    LogInHeader: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 40,
      marginTop: '10%',
      marginLeft: '10%',
      marginRight: '40%',
      color: 'grey',
    },

    forgotPass: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 15,
      marginTop: 10,
      color: '#0F968D',
    },

    logInBtn: {
      backgroundColor: '#0F968D',
      fontFamily: 'Roboto',
      alignSelf: 'center',
      marginTop: 20,
      width: '90%'
    },

    remainAsGuest: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 15,
      marginTop: 10,
      color: 'grey',
    },
  });