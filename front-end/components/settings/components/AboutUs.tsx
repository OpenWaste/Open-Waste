import React from "react";
import { View, Text } from "react-native";
import passStyle from "./styles/Language";
import { NativeBaseProvider } from "native-base";

export class AboutUs extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View>
          <Text> This is the about us page. </Text>
        </View>
      </NativeBaseProvider>
    );
  }
}
