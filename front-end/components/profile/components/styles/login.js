import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  LogInHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 40,
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '10%',
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
    width: '90%',
    color: "white",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#0F968D',
    borderWidth: 2,
    borderRadius: 5,
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