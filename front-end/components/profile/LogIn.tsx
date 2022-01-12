import React from "react";
import { View, Text, TextInput } from "react-native";
import loginStyle from "../../styles/login-style";
import formStyle from "../../styles/forms-style";
import { Button, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class LogIn extends React.Component {
  
  render() {

    return (
      <NativeBaseProvider>
        <View>
            <Text style={loginStyle.LogInHeader}>Welcome Back</Text>

            <View style = {formStyle.registrationInputView}>
              <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
              <TextInput style = {formStyle.registrationTextInputs} placeholder = "Username" />
            </View>
            <View style = {formStyle.registrationInputView}>
              <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
              <TextInput style = {formStyle.registrationTextInputs} placeholder = "Password" />
              <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>
            </View>

            <Text style={loginStyle.forgotPass} onPress={() => this.props.navigation.navigate('ForgotPassword')}> Forgot Password? </Text>
            <Button style={loginStyle.logInBtn}> Log In </Button>
            <Text style={loginStyle.remainAsGuest} onPress={() => this.props.navigation.navigate('ProfilePage')}> Remain as Guest </Text>
        </View>
      </NativeBaseProvider>
    );
  }
}
