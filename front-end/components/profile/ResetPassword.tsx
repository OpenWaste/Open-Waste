import React from "react";
import { KeyboardAvoidingView, ScrollView, View, Text, Image } from "react-native";
import { Input, Button, IconButton, NativeBaseProvider } from 'native-base';
import formStyle from "../../styles/forms-style";
import passStyle from "../../styles/forgotpassword-style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class ResetPassword extends React.Component {
  
img = require ('../../assets/forgotpass.png')

  render() {

    return (
      <NativeBaseProvider>
        <ScrollView>
            <KeyboardAvoidingView>
                <View style={passStyle.container}>
                    <Image source={this.img} style={passStyle.resetImg}/>
                    <Text style={passStyle.header}>Reset Password</Text>

                    <View style = {formStyle.registrationInputView}>
                    <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
                    <Input style = {formStyle.registrationTextInputs} variant="underlined" secureTextEntry={true} placeholder = "New password" />
                    <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>
                    </View>

                    <View style = {formStyle.registrationInputView}>
                    <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
                    <Input style = {formStyle.registrationTextInputs} variant="underlined"  secureTextEntry={true} placeholder = "Re-enter new password" />
                    <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>
                    </View>

                    <Button style={passStyle.submitBtn}> Submit </Button>
                </View>
            </KeyboardAvoidingView>    
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function HidePassword() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Input type={show ? "text" : "password"} w={{base: "75%", md: "25%"}} 
      InputRightElement={
        <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      }
      placeholder="Password"
    />
  )
}



function HidePassword2() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Input type={show ? "text" : "password"} w={{base: "75%", md: "25%"}} 
      InputRightElement={
        <Button w="1/6" h="full" onPress={handleClick}>
          {show ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </Button>
      }
      placeholder="Password"
    />
  )
}
