import * as React from "react";
import { View } from "react-native";
import { Button, NativeBaseProvider } from 'native-base';

import style from "./styles/AboutUs";
import formStyle from "./styles/Privacy";
import i18next from '../../i18n';

export class Setting extends React.Component {
    
  render() {
    
    return (
      <NativeBaseProvider>
          <View>
            <Button onPress={() => this.props.navigation.navigate('About us')}> {i18next.t('AboutUs')} </Button>
            <Button onPress={() => this.props.navigation.navigate('Privacy')}> {i18next.t('Privacy')} </Button>
            <Button onPress={() => this.props.navigation.navigate('Language')}> {i18next.t('Language')} </Button>
          </View>
      </NativeBaseProvider>
    );
  }
}