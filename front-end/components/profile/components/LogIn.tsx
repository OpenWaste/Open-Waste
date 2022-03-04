import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import loginStyle from "./styles/login";
import formStyle from "./styles/forms";
import { Button, Input, NativeBaseProvider } from 'native-base';
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { UserResource } from "../../../models/User";
import { useNavigation } from '@react-navigation/native';
import { save } from '../../../utils/PersistInfo';
import { LoginFormProperties } from "../../../interfaces/profile-types";
import i18next from '../../language/i18n'

export class LogIn extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text style={loginStyle.LogInHeader}>Welcome Back</Text>
            <Text style={loginStyle.LogInHeader}></Text>
            <MyComponent/>
            <LoginForm/>
            <Text
              testID="forgotBtn" 
              style={loginStyle.forgotPass} 
              onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot Password? </Text>
            <Text 
              testID="remainBtn"
              style={loginStyle.remainAsGuest} 
              onPress={() => this.props.navigation.navigate('ProfilePage')}> Remain as Guest </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export const LoginForm = (prop) => {

  const ref_input2 = useRef();
  const [show, setShow] = React.useState(false)
  const showPass = () => setShow(!show)
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
      save('email', resp.data.email)
      save('username', username)
      save('submitted_images', resp.data.submitted_images)
      save('accepted_images', resp.data.accepted_images)

      navigation.navigate('ProfilePage');
      showMessage({ message: 'Success!', type: 'success' });
      
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
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
            placeholder="Username"
            autoFocus={true}
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
            placeholder="Password"
            autoFocus={true}
            onChangeText={(value:any) => setPassword(value)}
            ref={ref_input2} />
          <TouchableOpacity onPress={showPass}>
            <MaterialIcons style={formStyle.registrationIcons} name={show ? "visibility-off" : "remove-red-eye"} size={22}/>
          </TouchableOpacity>
        </View>
        <Button 
          testID='loginBtn'
          style={loginStyle.logInBtn} 
          onPress={handleSubmit}> Log In </Button>      
    </View>
    </NativeBaseProvider>
  )
}

function MyComponent () {
  return (
    <View>
      <Text>{i18next.t('Test')}</Text>
      <Text
              testID="forgotBtn" 
              style={loginStyle.forgotPass} 
              onPress={() => i18next.changeLanguage("fr", (err, t) => {
                if (err) return console.log('something went wrong loading', err);
                t('key'); // -> same as i18next.t
              })}> Forgot Password? </Text>   
    </View>
  )
}