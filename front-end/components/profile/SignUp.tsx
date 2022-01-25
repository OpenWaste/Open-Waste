import React, { useRef } from "react";
import { Alert, View, ScrollView, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import signUpStyle from "../../styles/signup-style";
import formStyle from "../../styles/forms-style";
import { Avatar, Button, Center, Input, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../service/service";
import { showMsg } from '../../utils/FlashMessage';
import { validateEmail } from '../../utils/Validators';
import { UserResource } from "../../models/User";
import { useNavigation } from '@react-navigation/native';
import { save } from '../../utils/PersistInfo';

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

    if(validateEmail(email)){
      const user: UserResource = {
        username: username,
        password: password,
        email: email
      }
  
      //Flash message to inform user of request status
      Service.submitAccountCreation(user).then((resp) => {
        save('username', username)
        save('email', email)
        navigation.navigate('ProfilePage');
        showMsg('Success!', 'success');
      }).catch(error => {
       if(error.toJSON().message === 'Network Error'){
         showMsg('Network Error', 'warning');
       }
       else{
         showMsg('An Error Has Occurred', 'danger');
       }
      })
    }
    else{
      showMsg('Invalid Email', 'danger');
    }
      
  }

  return(
    <View>
      <View style = {formStyle.registrationInputView}>
        <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
        <Input style = {formStyle.registrationTextInputs} 
          borderWidth="0" 
          placeholder = "Username"
          autoFocus={true}
          returnKeyType="next"
          onChangeText = {value => setUsername(value)}
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
          onChangeText = {value => setPassword(value)}
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
          onChangeText = {emailInput => setEmail(emailInput)}
          ref={ref_input3} />
      </View>

      <Button style={signUpStyle.signUpBtn} onPress = {handleSubmit}> Sign Up </Button>
    </View>
  )
}