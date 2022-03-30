import React from "react";
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from "@react-navigation/stack";
import { Setting } from "./components/Settings";
import { AboutUs } from "./components/AboutUs";
import { Language } from "./components/Language";

const Stack = createStackNavigator();

const screens = [
  {name: "Setting", component: Setting},
  {name: "About us", component: AboutUs},
  {name: "Language", component: Language},
];

export class SettingsNavigator extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Setting">
        {screens.map((screen) => {
                    return (
                        <Stack.Screen 
                            key = {screen.name}
                            name = {screen.name} 
                            component = {screen.component}
                        />
                    );
                })}
        </Stack.Navigator>
      </NativeBaseProvider>
    );
  }
}