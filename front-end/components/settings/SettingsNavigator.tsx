import React from "react";
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from "@react-navigation/stack";
import { Setting } from "./components/Settings";
import { AboutUs } from "./components/AboutUs";
import { Privacy } from "./components/Privacy";
import { Language } from "./components/Language";
import i18next from "../i18n";

const Stack = createStackNavigator();

const screens = [
  {name: "Setting", component: Setting},
  {name: "About us", component: AboutUs},
  {name: "Privacy", component: Privacy},
  {name: "Language", component: Language},
];

export class SettingsNavigator extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Setting">
        {screens.map((screen) => {
                    return (
                        <Stack.Screen 
                            key = {screen.name}
                            name = {screen.name} 
                            options={{ title: i18next.t(screen.name) }}
                            component = {screen.component}
                        />
                    );
                })}
        </Stack.Navigator>
      </NativeBaseProvider>
    );
  }
}