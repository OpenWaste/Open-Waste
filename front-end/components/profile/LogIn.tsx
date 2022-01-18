import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from "react-native";
import loginStyle from "../../styles/login-style";
import formStyle from "../../styles/forms-style";
import { Button, Input, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class LogIn extends React.Component {
  
  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>

            <Text style={loginStyle.LogInHeader}>Welcome Back</Text>
            
            <LoginForm />

            <Text style={loginStyle.forgotPass} onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot Password? </Text>
            <Button style={loginStyle.logInBtn}> Log In </Button>
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
  
  return(
    <View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
        <Input borderWidth="0" 
          style = {formStyle.registrationTextInputs} 
          placeholder = "Username"
          autoFocus={true}
          returnKeyType="next"
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
          ref={ref_input2} />
        <TouchableOpacity onPress={showPass}>
            {show ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </TouchableOpacity>
      </View>
  </View>
  )
}