import React, { useRef } from "react";
import { KeyboardAvoidingView, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
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

                    <ResetPasswordForm />

                    <Button style={passStyle.submitBtn}> Submit </Button>
                </View>
            </KeyboardAvoidingView>    
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function ResetPasswordForm() {

  const ref_input2 = useRef();
  const [show1, setShow1] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const showPass1 = () => setShow1(!show1)
  const showPass2 = () => setShow2(!show2)

  return(
    <View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
        <Input type={show1 ? "text" : "password"} 
          style = {formStyle.registrationPasswordInputs} 
          variant="underlined" 
          placeholder = "New password"
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()} />
        <TouchableOpacity onPress={showPass1}>
            {show1 ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </TouchableOpacity>
        
      </View>

      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "lock" size = {22}/>
        <Input type={show2 ? "text" : "password"} 
          style = {formStyle.registrationTextInputs} 
          variant="underlined" 
          placeholder = "New password"
          autoFocus={true}
          ref={ref_input2} />
        <TouchableOpacity onPress={showPass2}>
            {show2 ? <MaterialIcons style = {formStyle.registrationIcons} name = "visibility-off" size = {22}/> : <MaterialIcons style = {formStyle.registrationIcons} name = "remove-red-eye" size = {22}/>}
        </TouchableOpacity>
  
      </View>
    </View>
  )
}
