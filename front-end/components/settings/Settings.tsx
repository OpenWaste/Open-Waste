import React from "react";
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from "@react-navigation/stack";
import { Setting } from "./components/Settings";
import { AboutUs } from "./components/AboutUs";
import { Privacy } from "./components/Privacy";
import { Language } from "./components/Language";

const { Navigator, Screen } = createStackNavigator();

export class Settings extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <Navigator initialRouteName="Setting">
          <Screen name="Setting" component={ Setting }></Screen>
          <Screen name="About us" component={ AboutUs }></Screen>
          <Screen name="Privacy" component={ Privacy }></Screen>
          <Screen name="Language" component={ Language }></Screen>
        </Navigator>
      </NativeBaseProvider>
    );
  }
}