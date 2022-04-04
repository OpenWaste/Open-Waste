import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, Image } from "react-native";
import passStyle from "./styles/forgot-password";
import formStyle from "./styles/forms";
import { NativeBaseProvider } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { save } from '../../../utils/PersistInfo';
import { useNavigation } from '@react-navigation/native';
import {MessageOptions, showMessage} from "react-native-flash-message";
import i18next from '../../../Translate';

export class ForgotPassword extends React.Component {
  img = require("../../../assets/forgotpass.png");

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={passStyle.container}>
              <Image source={{uri:this.img}} style={passStyle.img} />

              <Text style={passStyle.header}> {i18next.t('ForgotPassword')} </Text>
              <Text style={passStyle.description}>
                {i18next.t('ForgotPasswordText')}
              </Text>
              <ResetPassword/>
              <Text testID="loginBtn" style={passStyle.toLogin} onPress={() => this.props.navigation.navigate("BackToLogin")}> </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export function ResetPassword(){
  const [email, setEmail]=React.useState('');
  const navigation=useNavigation();

  const handleSubmit = () => {

    // Prepare info
    const user={
      email: email,
    }

    // Get response from authenticate-user endpoint
    // Get response from update-username-email endpoint
    Service.resetPassword(user).then(() => {
      handleResetPassword(true, email, showMessage, navigation)
    }).catch(() =>{
      handleResetPassword(false, null, showMessage, navigation)
    })
  }

  return(
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons
          style={formStyle.registrationIcons}
          name="alternate-email"
        />
        <TextInput
          testID="emailField"
          style={formStyle.registrationTextInputs}
          placeholder={i18next.t('Email')}
          onChangeText={(value:any) => setEmail(value)}
        />
      </View>
      <Text
        testID="submitBtn" 
        style={passStyle.submitBtn} 
        onPress={handleSubmit}> {i18next.t('Submit')} </Text>
  </View>
  )
}

export function handleResetPassword(isSuccessful:boolean, email:string|null, messageDisplayer:(value:MessageOptions) =>void, navigation) {

  if(isSuccessful){
    email !=null ? save('email', email):null;
    navigation.navigate('VerifyEmail');
    messageDisplayer({ message: 'Successfully submitted email', type: 'success' });
  } else{
    messageDisplayer({ message: 'An Error Has Occurred', type: 'warning' });
  }
}
