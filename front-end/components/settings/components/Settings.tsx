import * as React from "react";
import { View } from "react-native";
import { Button, NativeBaseProvider } from 'native-base';

import style from "./styles/AboutUs";
import formStyle from "./styles/Privacy";

export class Setting extends React.Component {
    
  render() {
    
    return (
      <NativeBaseProvider>
          <View>
            <Button onPress={() => this.props.navigation.navigate('About us')}> About us </Button>
            <Button onPress={() => this.props.navigation.navigate('Privacy')}> Privacy </Button>
            <Button onPress={() => this.props.navigation.navigate('Language')}> Language </Button>
          </View>
      </NativeBaseProvider>
    );
  }
}