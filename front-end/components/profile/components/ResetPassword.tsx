import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input, Button, NativeBaseProvider } from "native-base";
import formStyle from "./styles/forms";
import passStyle from "./styles/forgot-password";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { UserResource } from "../../../models/User";
import Service from "../../../service/service";

export class ResetPassword extends React.Component {
  img = require("../../../assets/forgotpass.png");

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={passStyle.container}>
              <Image source={this.img} style={passStyle.resetImg} />
              <Text style={passStyle.header}>Reset Password</Text>
              <ResetPasswordForm />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

function ResetPasswordForm() {
  const ref_input2 = useRef();
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const showPass1 = () => setShow1(!show1);
  const showPass2 = () => setShow2(!show2);
  const [pass1, setPass1] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [username, setUsername] = React.useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (pass1 != pass2) {
      showMessage({ message: "Passwords do not match!", type: "danger" });
      return;
    }
    const user: UserResource = {
      username: username,
      password: pass1,
      email: "",
    };

    Service.changePassword(user).then(() => {
      navigation.navigate("ProfilePage");
      showMessage({ message: username, type: "success" });
    })
    .catch((error) => {
      showMessage({ message: error.toJSON().message, type: "warning" });
    });
  };

  return (
    <View>
      <View style={formStyle.registrationInputView}>
        <MaterialIcons
          style={formStyle.registrationIcons}
          name="lock"
          size={22}
        />
        <Input
          type={show1 ? "text" : "password"}
          style={formStyle.registrationTextInputs}
          variant="underlined"
          placeholder="New password"
          autoFocus={true}
          returnKeyType="next"
          onChangeText={(value:any) => setPass1(value)}
          onSubmitEditing={() => ref_input2.current.focus()}
        />
        <TouchableOpacity onPress={showPass1}>
          {show1 ? (
            <MaterialIcons
              style={formStyle.registrationIcons}
              name="visibility-off"
              size={22}
            />
          ) : (
            <MaterialIcons
              style={formStyle.registrationIcons}
              name="remove-red-eye"
              size={22}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={formStyle.registrationInputView}>
        <MaterialIcons
          style={formStyle.registrationIcons}
          name="lock"
          size={22}
        />
        <Input
          type={show2 ? "text" : "password"}
          style={formStyle.registrationTextInputs}
          variant="underlined"
          placeholder="New password"
          autoFocus={true}
          ref={ref_input2}
          onChangeText={(value:any) => setPass2(value)}
        />
        <TouchableOpacity onPress={showPass2}>
          {show2 ? (
            <MaterialIcons
              style={formStyle.registrationIcons}
              name="visibility-off"
              size={22}
            />
          ) : (
            <MaterialIcons
              style={formStyle.registrationIcons}
              name="remove-red-eye"
              size={22}
            />
          )}
        </TouchableOpacity>
      </View>
      <Button style={passStyle.submitBtn} onPress={handleSubmit}> Submit </Button>
    </View>
  );
}
