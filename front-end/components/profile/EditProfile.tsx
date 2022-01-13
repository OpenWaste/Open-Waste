import * as React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Accordion, AlertDialog, Box, Button, Center, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import style from "../../styles/editprofile-style";
import formStyle from "../../styles/forms-style";



export class EditProfile extends React.Component {
    
  render() {
    
    return (
      <NativeBaseProvider>
         <View>
            <View style={style.header}></View> 
            
            {/* TO DO: Pull profile pic from database. */}
            <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
            
            <Text style={style.username}> Edit Profile </Text>

            <OpenUsername />
            <OpenEmail />
            <DeleteAccount />

            <View style={style.btnView}>
              <Button style={style.cancelBtn} onPress={() => this.props.navigation.navigate('ProfilePage')}> Cancel </Button>
              <Button style={style.saveBtn} onPress={() => this.props.navigation.navigate('ProfilePage')}> Save </Button>
            </View>
          </View>
      </NativeBaseProvider>
    );
  }
}

function DeleteAccount() {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef(null)

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
              <Button colorScheme="danger" onPress={onClose}>Delete</Button>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>Cancel</Button>                   
              </Button.Group>
          </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        </Center>
    )
}

function OpenUsername() {
  return (
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
              <TextInput style = {formStyle.registrationTextInputs} placeholder = "Username" />
            </View>
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}

function OpenEmail() {
  return (
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
              <TextInput style = {formStyle.registrationTextInputs} placeholder = "Email" />
            </View>
          </Accordion.Details>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}