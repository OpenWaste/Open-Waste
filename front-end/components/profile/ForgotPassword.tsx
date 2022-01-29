import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, Image } from "react-native";
import passStyle from "../../styles/forgotpassword-style";
import formStyle from "../../styles/forms-style";
import { Button, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class ForgotPassword extends React.Component {

img = require ('../../assets/forgotpassword.png')
  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={passStyle.container}>
            <Image source={this.img} style={passStyle.img}/>

              <Text style={passStyle.header}>Forgot Password?</Text>
              <Text style={passStyle.description}>Do not worry! We will help you recover it. Enter the e-mail address associated to your account.</Text>
              <View style = {formStyle.registrationInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "alternate-email"/>
                <TextInput style = {formStyle.registrationTextInputs} placeholder = "Email" />
              </View>
              <Button style={passStyle.submitBtn} onPress={() => this.props.navigation.navigate('VerifyEmail')}> Submit </Button>
              <Text style={passStyle.toLogin} onPress={() => this.props.navigation.navigate('Registration')}>Back to login</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}