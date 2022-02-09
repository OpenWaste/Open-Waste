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

export class LogIn extends React.Component {
  
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text style={loginStyle.LogInHeader}>Welcome Back</Text>
            <LoginForm/>
            <Text style={loginStyle.forgotPass} onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot Password? </Text>
            <Text style={loginStyle.remainAsGuest} onPress={() => this.props.navigation.navigate('ProfilePage')}> Remain as Guest </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function LoginForm(){

  const ref_input2 = useRef();
  const [show, setShow] = React.useState(false)
  const showPass = () => setShow(!show)
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
 
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
      save('submitted_images', resp.data.submitted_images.toString())
      save('accepted_images', resp.data.accepted_images.toString())

      navigation.navigate('ProfilePage');
      showMessage({ message: 'Success!', type: 'success' });
      
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
    })
  }
  
  return(
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons style={formStyle.registrationIcons} name="person" size={22}/>
        <Input
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
      <Button style={loginStyle.logInBtn} onPress={handleSubmit}> Log In </Button>      
  </View>
  )
}