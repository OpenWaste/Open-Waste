import React, { useRef } from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import signUpStyle from "./styles/signup";
import formStyle from "./styles/forms";
import { Avatar, Button, Center, Input, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { showMessage } from "react-native-flash-message";
import isEmail from 'validator/lib/isEmail';
import { UserResource } from "../../../models/User";
import { useNavigation } from '@react-navigation/native';
import { save } from '../../../utils/PersistInfo';

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
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export function SignUpForm() {

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const showPass = () => setShow(!show);

  const navigation = useNavigation();

  const handleSubmit = () => {

    if (isEmail(email)) {
      const user: UserResource = {
        username: username,
        password: password,
        email: email
      }
  
      // Get response from create-user endpoint
      Service.submitAccountCreation(user).then((resp) => {
        save('username', username)
        save('email', email)
        save('submitted_images', 0)
        save('accepted_images', 0)
        navigation.navigate('ProfilePage');
        showMessage({ message: 'Success!', type: 'success' });
      }).catch(error => {
        showMessage({ message: error.toJSON().message, type: 'warning' });
      })
    }
    else {
      showMessage({ message: 'Invalid Email', type: 'warning' });
    }
      
  }

  return(
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons style={formStyle.registrationIcons} name="person" size={22}/>
        <Input
          style={formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder="Username"
          autoFocus={true}
          returnKeyType="next"
          onChangeText={(value:any) => setUsername(value)}
          onSubmitEditing={() => ref_input2.current.focus()} />
      </View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons style={formStyle.registrationIcons} name="lock" size={22}/>
        <Input
          type={show ? "text" : "password"} 
          style={formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder="Password"
          returnKeyType="next"
          autoFocus={true}
          onChangeText={(value:any) => setPassword(value)}
          onSubmitEditing={() => ref_input3.current.focus()}
          ref={ref_input2} />
        <TouchableOpacity onPress={showPass}>
          <MaterialIcons style={formStyle.registrationIcons} name={show ? "visibility-off" : "remove-red-eye"} size={22}/>
        </TouchableOpacity>
      </View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons style={formStyle.registrationIcons} name="alternate-email" size={22}/>
        <Input
          style={formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder="Email"
          autoFocus={true}
          onChangeText={(emailInput:any) => setEmail(emailInput)}
          ref={ref_input3}/>
      </View>
      <Button style={signUpStyle.signUpBtn} onPress={handleSubmit}> Sign Up </Button>
    </View>
  )
}