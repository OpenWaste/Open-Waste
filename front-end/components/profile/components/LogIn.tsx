import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import loginStyle from "./styles/login";
import formStyle from "./styles/forms";
import { Input, NativeBaseProvider } from 'native-base';
import {MessageOptions, showMessage} from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { UserResource } from "../../../models/User";
import { useNavigation } from '@react-navigation/native';
import { save } from '../../../utils/PersistInfo';
import i18next from '../../../Translate';

export class LogIn extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text style={loginStyle.LogInHeader}> {i18next.t('WelcomeBack')} </Text>
            <LoginForm/>
            <Text
              testID="forgotBtn" 
              style={loginStyle.forgotPass} 
              onPress={() => this.props.navigation.navigate('ForgotPassword')}> {i18next.t('ForgotPassword')} </Text>
            <Text 
              testID="remainBtn"
              style={loginStyle.remainAsGuest} 
              onPress={() => this.props.navigation.navigate('ProfilePage')}> {i18next.t('RemainAsGuest')} </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export const LoginForm = (prop) => {

  const ref_input2 = useRef();
  const [show, setShow] = React.useState(false);
  const showPass = () => setShow(!show);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const handleSubmit = () => {

    // Prepare info
    const user: UserResource = {
      username: username,
      email: '',
      password: password,
    }

    // Get response from authenticate-user endpoint
    Service.authenticateUser(user).then(resp => {
      handleUserAuthentication(true, resp.email, username,  resp.submitted_images, resp.accepted_images, showMessage, navigation);
    }).catch(() => {
      handleUserAuthentication(false, "","", 0,0, showMessage, navigation);
    })
  }

  return(
    <NativeBaseProvider>
      <View>
        <View style={formStyle.registrationInputView}>
          <MaterialIcons style={formStyle.registrationIcons} name="person" size={22}/>
          <Input
            testID="usernameField"
            inputProps={{ "data-testid": "content-input" }}
            borderWidth="0" 
            style={formStyle.registrationTextInputs}
            placeholder={i18next.t('Username')}
            returnKeyType="next"
            onChangeText={(value:any) => setUsername(value)}
            onSubmitEditing={() => ref_input2.current.focus()} />
        </View>
        <View style={formStyle.registrationInputView}>
          <MaterialIcons style={formStyle.registrationIcons} name="lock" size={22}/>
          <Input
            testID="passwordField"
            borderWidth="0"  
            type={show ? "text" : "password"} 
            style={formStyle.registrationTextInputs} 
            variant="underlined" 
            placeholder={i18next.t('Password')}
            onChangeText={(value:any) => setPassword(value)}
            ref={ref_input2} />
          <TouchableOpacity testID="showPassBtn" onPress={showPass}>
            <MaterialIcons style={formStyle.registrationIcons} name={show ? "visibility-off" : "remove-red-eye"} size={22}/>
          </TouchableOpacity>
        </View>
        <Text 
          testID='loginBtn'
          style={loginStyle.logInBtn} 
          onPress={handleSubmit}> {i18next.t('LogIn')} </Text>      
    </View>
    </NativeBaseProvider>
  )
}

export function handleUserAuthentication(isSuccessful:boolean, email:string, username:string, submittedImages:number, acceptedImages:number, messageDisplayer:(value:MessageOptions) =>void, navigation):void {


  if(isSuccessful){
    save('email', email)
    save('username', username)
    save('submitted_images', submittedImages)
    save('accepted_images', acceptedImages)

    navigation.navigate('ProfilePage');
    messageDisplayer({ message: 'Success!', type: 'success' });
  } else {
    messageDisplayer({ message: 'Invalid Login Information', type: 'warning' });
  }
}
