import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    /*Registration forms styles (aka Log In and Sign Up) */

    registrationInputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        borderBottomWidth: 0.5,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: "#BDBDBD",
       
        backgroundColor: '#F9F9F9', 
        height: 40,
        
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
    },

    registrationIcons: {
        /*Note: The size of the icon is defined in SignUp.tsk */
        color: '#BDBDBD',
        padding: 10
    },

    registrationTextInputs: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        color: '#BDBDBD',
    }
  });