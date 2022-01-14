import React from "react";
import { View, Text, Image } from "react-native";
import passStyle from "../../styles/forgotpassword-style";
import { Button, NativeBaseProvider } from 'native-base';

export class VerifyEmail extends React.Component {

img = require ('../../assets/mailbox.png')
  render() {

    return (
      <NativeBaseProvider>
        <View style={passStyle.verifyBg}>
        <Image source={this.img} style={passStyle.img}/>

          <Text style={passStyle.verifyHeader}>Verify your email</Text>
          <Text style={passStyle.verifyText}>A password recovery instruction has been sent to your email.</Text>
          <Button style={passStyle.okBtn} onPress={() => this.props.navigation.navigate('LogIn')}> Ok </Button>
        </View>
      </NativeBaseProvider>
    );
  }
}