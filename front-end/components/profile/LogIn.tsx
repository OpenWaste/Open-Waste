import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from "react-native";
import loginStyle from "../../styles/login-style";
import formStyle from "../../styles/forms-style";
import { Button, Input, NativeBaseProvider } from 'native-base';
import { showMsg } from '../../utils/FlashMessage';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../service/service";
import { UserResource } from "../../models/User";
import axios from "axios";

export class LogIn extends React.Component {
  
  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>

            <Text style={loginStyle.LogInHeader}>Welcome Back</Text>
            
            <LoginForm />

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

  const handleSubmit = () => {

    const user: UserResource = {
      username: username,
      email: '',
      password: password,
    }

    //Flash message to inform user of request status
    Service.authenticateUser(user).then(resp => {
      if(resp.data == 'Authentication failed.'){
        showMsg('Authentication Failed', 'danger');
      }
      else{
        showMsg('Success!', 'success');
      }
      
    }).catch(error => {
    
      if(error.toJSON().message === 'Network Error'){
        showMsg('Network Error', 'warning');
      }
      
      else{
        showMsg('An Error Has Occurred', 'danger');
      }
        
    })
  }
  
  return(
    <View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
        <Input borderWidth="0" 
          style = {formStyle.registrationTextInputs} 
          placeholder = "Username"
          autoFocus={true}
          returnKeyType="next"
          onChangeText = {value => setUsername(value)}
          onSubmitEditing={() => ref_input2.current.focus()} />
      </View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
        <Input borderWidth="0"  
          type={show ? "text" : "password"} 
          style = {formStyle.registrationTextInputs} 
          variant="underlined" 
          placeholder = "Password"
          autoFocus={true}
          onChangeText = {value => setPassword(value)}
          ref={ref_input2} />
        <TouchableOpacity onPress={showPass}>
            {show ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </TouchableOpacity>
      </View>
      <Button style={loginStyle.logInBtn} onPress={handleSubmit}> Log In </Button>      
  </View>
  )
}