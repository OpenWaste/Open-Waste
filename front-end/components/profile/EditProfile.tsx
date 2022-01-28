import * as React from "react";
import { View, ScrollView, KeyboardAvoidingView, Text, Image } from "react-native";
import { Accordion, AlertDialog, Box, Button, Center, NativeBaseProvider, Input } from 'native-base';
import { save, getValueFor, deleteValueFor } from '../../utils/PersistInfo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../service/service";
import { UserResource } from "../../models/User";
import { useNavigation } from '@react-navigation/native';

import style from "../../styles/editprofile-style";
import formStyle from "../../styles/forms-style";
import { showMsg } from "../../utils/FlashMessage";
import isEmail from 'validator/lib/isEmail';

export class EditProfile extends React.Component {
    
  render() {
    
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
              <View style={style.header}></View> 
              
              {/* TO DO: Pull profile pic from database. */}
              <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
              
              <Text style={style.username}> Edit Profile </Text>

              <EditForm />
            
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function EditForm() {

  const navigation = useNavigation();

  const [oldUsername, setOldUsername] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [oldEmail, setOldEmail] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');

  // Find current username
  getValueFor('username').then(output => {
    setOldUsername(output);
  })

  // Find current email
  getValueFor('email').then(output => {
    setOldEmail(output);
  })

  // Redirect to profile page if cancel is pressed
  const handleCancel = () => {
    navigation.navigate('ProfilePage')
  }

  // Handle save button
  const handleSubmit = () => {
    
    if(newUsername==''){
      setNewUsername(oldUsername)
    }
    if(newEmail==''){
      setNewEmail(oldEmail);
    }

    // Check if email is valid
    if(isEmail(newEmail) || newEmail==''){
      
      const user = {
        old_username: oldUsername,
        new_username: newUsername,
        email: newEmail,
      }

      // Get response from update-username-email endpoint
      Service.updateUsernameEmail(user).then(output => {
        // If response is good, update the user's persistent info
        if(newUsername==''){
          save('username', oldUsername);
        }
        else{
          save('username', newUsername);
        }
        
        save('email', newEmail);

        // Redirect and display success message
        navigation.navigate('ProfilePage');
        showMsg('Successfully Updated Account', 'success')

      }).catch(error =>{
        //If bad response, display error message
        showMsg('An Error Has Occurred', 'danger');
      })
    }
    // Display error message if email is not valid
    else{
      showMsg('Invalid Email', 'danger');
    }
  }

  return(
    <View>

      <Box m={3}>
        <Accordion>
          <Accordion.Item>
            <Accordion.Summary _expanded={{ backgroundColor: '#0F968D' }}>
              Edit Username
              <Accordion.Icon />
            </Accordion.Summary>
            <Accordion.Details>
              <View style = {formStyle.accordionInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "person" size = {22}/>
                <Input 
                  style = {formStyle.registrationTextInputs} 
                  onChangeText = {value => setNewUsername(value)}
                  borderColor="transparent">{oldUsername}</Input>
              </View>
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
      </Box>

      <Box m={3}>
        <Accordion>
          <Accordion.Item>
            <Accordion.Summary _expanded={{ backgroundColor: '#0F968D' }}>
              Edit Email
              <Accordion.Icon />
            </Accordion.Summary>
            <Accordion.Details>
              <View style = {formStyle.accordionInputView}>
                <MaterialIcons style = {formStyle.registrationIcons} name = "alternate-email" size = {22}/>
                <Input 
                  style = {formStyle.registrationTextInputs} 
                  onChangeText = {value => setNewEmail(value)}
                  borderColor="transparent">{oldEmail}</Input>
              </View>
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
      </Box>

      <DeleteAccount/>

      <View style={style.btnView}>
        <Button style={style.cancelBtn} onPress={handleCancel}> Cancel </Button>
        <Button style={style.saveBtn} onPress={handleSubmit}> Save </Button>
      </View> 

    </View>
  )

}

function DeleteAccount() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef(null)
    const navigation = useNavigation();

    // Get username
    getValueFor('username').then(output => {
      setUsername(output);
    }) 

    const handleDelete = () => {

      // Close dialog box
      onClose()
      
      // Prepare info
      const user: UserResource = {
        username: username,
        email: '',
        password: '',
      }

      // Get response from delete-user endpoint
      Service.deleteUser(user).then(output => {
        // If response is good, delete persistent data
        deleteValueFor('username');
        deleteValueFor('email');
        // Redirect and show success message
        navigation.navigate('ProfilePage');
        showMsg('Successfully Deleted Account', 'success')
      }).catch(error =>{
        // If response is bad, show error message
        showMsg('An Error Has Occurred', 'danger');
      })
      
    }

    return(
        <Center>
          <Button style={style.deleteBtn} _text={{color:'#D33333', paddingTop: 2, paddingBottom: 2}} colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>Delete account</Button>
          <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}
>
          <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Are you sure?</AlertDialog.Header>
          <AlertDialog.Body>
              This action will delete all your data from your device and cloud. This action is irreversable.
          </AlertDialog.Body>
          <AlertDialog.Footer>
              <Button.Group space={2}>
              <Button colorScheme="danger" onPress={handleDelete}>Delete</Button>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>Cancel</Button>                   
              </Button.Group>
          </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        </Center>
    )
}
