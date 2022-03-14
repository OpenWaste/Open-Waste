import React from "react";
import { View, Text } from "react-native";
import passStyle from "./styles/Language";
import { NativeBaseProvider } from "native-base";

export class Privacy extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View>
          <Text> option 1 </Text>
          <Text> option 2 </Text>
          <Text> option 3 </Text>
          <Text> option 4 </Text>
        </View>
      </NativeBaseProvider>
    );
  }
}
