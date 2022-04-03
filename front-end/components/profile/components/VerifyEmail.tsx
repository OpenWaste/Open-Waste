import React, { useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import passStyle from "./styles/forgot-password";
import { NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Service from "../../../service/service";
import { save } from '../../../utils/PersistInfo';
import {MessageOptions, showMessage} from "react-native-flash-message";
import formStyle from "./styles/forms";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getValueFor } from '../../../utils/PersistInfo';
import i18next from '../../../Translate';

export class VerifyEmail extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View style={passStyle.container}>
          <Image 
            testID="verifyImg"
            source={{uri:this.img}} style={passStyle.img} />
          <Text 
            testID="verifyHeader"
            style={passStyle.header}> {i18next.t('VerifyEmail')} </Text>
          <Text 
            testID="verifyBody"
            style={passStyle.description}> {i18next.t('VerifyEmailText')} </Text>
          <ValidatePasscode/>
        </View>
      </NativeBaseProvider>
    );
  }
}

export function ValidatePasscode(){
  const [enteredPasscode, setPasscode]=React.useState('');
  const [email, setEmail]=React.useState('');

  useEffect(() => {
    getValueFor('email').then((output) => {
      setEmail(output)
    });
  })

  const handleSubmit = () => {

    // Prepare info
    const user={
      passcode: enteredPasscode,
      email: email
    }

    // Get response from authenticate-user endpoint
    // Get response from update-username-email endpoint
    Service.verifyEmail(user).then(resp => {
      handleEmailVerification(true, resp.data.username, showMessage)
    }).catch(() =>{
      handleEmailVerification(false, "", showMessage)
    })
  }

  return(
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons
          style={formStyle.registrationIcons}
        />
        <TextInput
          testID="passcodeField"
          style={formStyle.registrationTextInputs}
          placeholder="Passcode"
          onChangeText={(value:any) => setPasscode(value)}
        />
      </View>
      <Text 
        testID="submitBtn"
        style={passStyle.submitBtn} onPress={handleSubmit}> {i18next.t('Submit')} </Text>
  </View>
  )
}

export function handleEmailVerification(isSuccessful:boolean, username:string, messageDisplayer:(value:MessageOptions) => void ): void {
  const navigation=useNavigation();

  if(isSuccessful){
    save('username', username)
    navigation.navigate('ResetPassword');
    messageDisplayer({ message: 'Successfully verified email', type: 'success' });
  } else {
    messageDisplayer({ message: 'Invalid Passcode', type: 'warning' });
  }
}
