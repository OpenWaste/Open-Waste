import React from "react";
import { View, Text } from "react-native";
import passStyle from "./styles/Language";
import { NativeBaseProvider } from "native-base";

export class Language extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View>
          <Text> EN / FR </Text>
        </View>
      </NativeBaseProvider>
    );
  }
}
