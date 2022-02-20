import React, { useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import passStyle from "./styles/forgot-password";
import { Button, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Service from "../../../service/service";
import { save } from '../../../utils/PersistInfo';
import { showMessage } from "react-native-flash-message";
import formStyle from "./styles/forms";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getValueFor } from '../../../utils/PersistInfo';

export class VerifyEmail extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View style={passStyle.verifyBg}>
          <Image source={this.img} style={passStyle.img} />
          <Text style={passStyle.verifyHeader}> Verify your email </Text>
          <Text style={passStyle.verifyText}> Enter the passcode we sent to your email </Text>
          <ValidatePasscode/>
        </View>
      </NativeBaseProvider>
    );
  }
}

function ValidatePasscode(){

  const navigation=useNavigation();

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

      save('username', resp.data.username)

      navigation.navigate('ResetPassword');
      showMessage({ message: 'Successfully verified email', type: 'success' });

    }).catch(() =>{
      showMessage({ message: 'Invalid Passcode', type: 'warning' });
    })
  }
  
  return(
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons
          style={formStyle.registrationIcons}
        />
        <TextInput
          style={formStyle.registrationTextInputs}
          placeholder="Passcode"
          onChangeText={(value:any) => setPasscode(value)}
        />
      </View>
      <Button style={passStyle.verifyText} onPress={handleSubmit}> Submit </Button>      
  </View>
  )
}