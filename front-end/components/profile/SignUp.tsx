import React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput } from "react-native";
import signUpStyle from "../../styles/signup-style";
import formStyle from "../../styles/forms-style";
import { Avatar, Button, Center, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class SignUp extends React.Component {
  
  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View>
              <Text style={signUpStyle.signUpHeader}>Create an Account</Text>
              
              <Center style={signUpStyle.addProfilePic}>
                <Avatar size='40' source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}}>
                  <Avatar.Badge bg="green.200" />
                </Avatar>
              </Center>
              
              <View style = {formStyle.registrationInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
                <TextInput style = {formStyle.registrationTextInputs} placeholder = "Username" />
              </View>
              <View style = {formStyle.registrationInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
                <TextInput style = {formStyle.registrationTextInputs} secureTextEntry={true} placeholder = "Password" />
                <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>
              </View>
              <View style = {formStyle.registrationInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "alternate-email" size = {22}/>
                <TextInput style = {formStyle.registrationTextInputs} placeholder = "Email" />
              </View>

              <Button style={signUpStyle.signUpBtn}> Sign Up </Button>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
