import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, Image } from "react-native";
import passStyle from "./styles/forgot-password";
import formStyle from "./styles/forms";
import { Button, NativeBaseProvider } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { save } from '../../../utils/PersistInfo';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import i18next from '../../language/i18n';

export class ForgotPassword extends React.Component {

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={passStyle.container}>

              <Text style={passStyle.header}> {i18next.t('ForgotPassword')} </Text>
              <Text style={passStyle.description}>
                {i18next.t('ForgotPasswordText')}
              </Text>
              <ResetPassword/>
              <Text style={passStyle.toLogin} onPress={() => this.props.navigation.navigate("BackToLogin")}> </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export function ResetPassword(){

  const navigation=useNavigation();

  const [email, setEmail]=React.useState('');

  const handleSubmit = () => {

    // Prepare info
    const user={
      email: email,
    }

    // Get response from authenticate-user endpoint
    // Get response from update-username-email endpoint
    Service.resetPassword(user).then(() => {

      save('email', email)

      navigation.navigate('VerifyEmail');
      showMessage({ message: 'Successfully submitted email', type: 'success' });

    }).catch(() =>{
      showMessage({ message: 'An Error Has Occurred', type: 'warning' });
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
          placeholder="Email"
          onChangeText={(value:any) => setEmail(value)}
        />
      </View>
      <Button
        testID="submitBtn" 
        style={passStyle.submitBtn} 
        onPress={handleSubmit}> {i18next.t('Submit')} </Button>
  </View>
  )
}
