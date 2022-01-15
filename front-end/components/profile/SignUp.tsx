import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import signUpStyle from "../../styles/signup-style";
import formStyle from "../../styles/forms-style";
import { Avatar, Button, Center, Input, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class SignUp extends React.Component {
  
  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>

          <Text style={signUpStyle.signUpHeader}>Create an Account</Text>
      
          <Center style={signUpStyle.addProfilePic}>
            <Avatar size='40' source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}}>
              <Avatar.Badge bg="green.200" />
            </Avatar>
          </Center>
      

            <SignUpForm />

            <Button style={signUpStyle.signUpBtn}> Sign Up </Button>

          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function SignUpForm() {

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [show, setShow] = React.useState(false)
  const showPass = () => setShow(!show)

  return(
    <View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
        <Input style = {formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder = "Username"
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()} />
      </View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
        <Input type={show ? "text" : "password"} 
          style = {formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder = "Password"
          returnKeyType="next"
          autoFocus={true}
          onSubmitEditing={() => ref_input3.current.focus()}
          ref={ref_input2} />
        <TouchableOpacity onPress={showPass}>
            {show ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </TouchableOpacity>
      </View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "alternate-email" size = {22}/>
        <Input style = {formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder = "Email"
          autoFocus={true}
          ref={ref_input3} />
      </View>
    </View>
  )
}