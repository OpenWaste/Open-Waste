import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import style from "./styles/Language";
import { NativeBaseProvider } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class Language extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <View style={ style.viewElement }>
              <View style={ style.viewItem1 } >
                <TouchableHighlight style={style.leftIcon} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Setting')}>
                  <MaterialIcons name="arrow-back-ios" size={26} color="gray"/>
                </TouchableHighlight>
              </View>
              <View style={ style.viewItem2 } >
                  <Text style={style.midText}>
                    Language
                  </Text>
              </View>
              <View style={ style.viewItem3 } >
                  <MaterialIcons name="language" size={26} color="gray"/>
              </View>
            </View>
      </NativeBaseProvider>
    );
  }
}
