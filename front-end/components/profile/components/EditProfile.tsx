import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
} from "react-native";
import {
  Accordion,
  AlertDialog,
  Box,
  Button,
  Center,
  NativeBaseProvider,
  Input,
} from "native-base";
import { save, getValueFor, deleteValueFor } from "../../../utils/PersistInfo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Service from "../../../service/service";
import { UserResource } from "../../../models/User";
import { useNavigation } from "@react-navigation/native";
import {MessageOptions, showMessage} from "react-native-flash-message";

import style from "./styles/edit-profile";
import formStyle from "./styles/forms";
import isEmail from 'validator/lib/isEmail';
import i18next from '../../../Translate';

export class EditProfile extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={style.header}></View>
            {/* TO DO: Pull profile pic from database. */}
            <Image
              style={style.profilePic}
              source={{
                uri: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm",
              }}
            />
            <Text style={style.username}> {i18next.t('EditProfile')} </Text>
            <EditForm />
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export function EditForm() {
  const navigation = useNavigation();
  const [oldUsername, setOldUsername] = React.useState("");
  const [newUsername, setNewUsername] = React.useState("");
  const [oldEmail, setOldEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [isChange, setIsChange] = React.useState(false);

  useEffect(() => {
    getValueFor("username").then((output) => {
      setOldUsername(output);
      setNewUsername(output);
    });

    getValueFor("email").then((output) => {
      setOldEmail(output);
      setNewEmail(output);
    });
  }, []);

  const handleCancel = () => {
    navigation.navigate("ProfilePage");
  };

  const setValue = (value: any, category: string) => {
    if (category == "email") {
      setNewEmail(value);
    } else if (category == "user") {
      setNewUsername(value);
    }

    setIsChange(true);
    return;
  };

  return (
    <View>
      <Box m={3}>
        <Accordion>
          <Accordion.Item testID="editUsernameAccordion">
            <Accordion.Summary _expanded={{ backgroundColor: "#0F968D" }}>
              <Text style={style.editBttn}>{i18next.t('EditUsername')}</Text> <Accordion.Icon />
            </Accordion.Summary>
            <Accordion.Details>
              <View style={formStyle.accordionInputView}>
                <MaterialIcons
                  style={formStyle.registrationIcons}
                  name="person"
                  size={22}
                />
                <Input
                  testID="usernameField"
                  style={formStyle.registrationTextInputs}
                  onChangeText={(value: any) => {
                    setValue(value, "user");
                  }}
                  borderColor="transparent"
                  defaultValue={oldUsername}
                />
              </View>
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
      </Box>

      <Box m={3}>
        <Accordion>
          <Accordion.Item testID="editEmailAccordion">
            <Accordion.Summary _expanded={{ backgroundColor: "#0F968D" }}>
              <Text style={style.editBttn}>{i18next.t('EditEmail')}</Text> <Accordion.Icon />
            </Accordion.Summary>
            <Accordion.Details>
              <View style={formStyle.accordionInputView}>
                <MaterialIcons
                  style={formStyle.registrationIcons}
                  name="alternate-email"
                  size={22}
                />
                <Input
                  testID="emailField"
                  style={formStyle.registrationTextInputs}
                  onChangeText={(value: any) => {
                    setValue(value, "email");
                  }}
                  borderColor="transparent"
                  defaultValue={oldEmail}
                />
              </View>
            </Accordion.Details>
          </Accordion.Item>
        </Accordion>
      </Box>
      <DeleteAccount />
      <View style={style.btnView}>
        <Text
          testID="cancelBtn"
          style={style.cancelBtn}
          onPress={handleCancel}
        >
          {i18next.t('Cancel')}
        </Text>
        <Text testID="saveBtn" style={style.saveBtn} onPress={()=>{validateUserProfileChange(isChange, newUsername, newEmail, oldUsername, showMessage)}}>
          {i18next.t('Save')}
        </Text>
      </View>
    </View>
  );
}

export function validateUserProfileChange(isChange:boolean, newUsername:string, newEmail:string, oldUsername:string, messageDisplayer:(value:MessageOptions) => void):void{
  const navigation = useNavigation();
  if (isChange) {
    if (newUsername == "") {
      messageDisplayer({ message: "Please fill a new username", type: "warning" });
      return;
    } else if (newEmail == "") {
      messageDisplayer({ message: "Please fill a new email", type: "warning" });
      return;
    } else if (!isEmail(newEmail)) {
      messageDisplayer({ message: "Invalid Email", type: "warning" });
      return;
    }

    const user = {
      old_username: oldUsername,
      new_username: newUsername,
      email: newEmail,
    };

    // Get response from update-username-email endpoint
    Service.updateUsernameEmail(user)
        .then(() => {
          handleUserProfileChange(true, newUsername, newEmail, messageDisplayer)
        })
        .catch(() => {
          handleUserProfileChange(false, newUsername, newEmail, messageDisplayer)
        });
  } else {
    navigation.navigate("ProfilePage");
  }
}

export function handleUserProfileChange(isSuccessful:boolean, newUsername:string, newEmail:string, messageDisplayer:(value:MessageOptions) => void):void {
  const navigation = useNavigation();
  if(isSuccessful){
    save("username", newUsername);
    save("email", newEmail);

    navigation.navigate("ProfilePage");
    messageDisplayer({
      message: "Successfully Updated Account",
      type: "success",
    });
  } else {
    messageDisplayer({ message: "An Error Has Occurred", type: "warning" });
  }
}

export function DeleteAccount() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  getValueFor("username").then((output) => {
    setUsername(output);
  });

  const handleDelete = () => {
    const user: UserResource = {
      username: username,
      email: "",
      password: "",
    };

    Service.deleteUser(user)
      .then(() => {
        handleUserDeletion(true, showMessage)
      })
      .catch(() => {
        handleUserDeletion(false, showMessage)
      });

    onClose();
  };

  return (
    <Center>
      <Button
        testID="deleteBtn"
        style={style.deleteBtn}
        _text={{ color: "#D33333", paddingTop: 2, paddingBottom: 2 }}
        colorScheme="danger"
        onPress={() => setIsOpen(!isOpen)}
      >
        {i18next.t('DeleteAccount')}
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header> {i18next.t('AreYouSure')} </AlertDialog.Header>
          <AlertDialog.Body>
            {i18next.t('DeleteAccountText')}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button colorScheme="danger" onPress={handleDelete}>
                {i18next.t('Delete')}
              </Button>
              <Button
                testID="modalCancelBtn"
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                {i18next.t('Cancel')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}

export function handleUserDeletion(isSuccessful:boolean,  messageDisplayer:(value:MessageOptions)=>void) {
  const navigation = useNavigation();

  if(isSuccessful) {
    // If response is good, delete persistent data
    deleteValueFor("username");
    deleteValueFor("email");
    deleteValueFor("submitted_images");
    deleteValueFor("accepted_images");
    // Redirect and show success message
    navigation.navigate("ProfilePage");
    messageDisplayer({
      message: "Successfully Deleted Account",
      type: "success",
    });
  } else {
    messageDisplayer({ message: "An Error Has Occurred", type: "warning" });
  }
}
