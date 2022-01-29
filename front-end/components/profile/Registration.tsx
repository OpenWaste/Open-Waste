import * as React from "react";
import { NativeBaseProvider } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

const Tab = createMaterialTopTabNavigator();

const screens = [
  {name: "Log In", component: LogIn},
  {name: "Sign Up", component: SignUp},
]

export class Registration extends React.Component {

  render() {
    return (
      <NativeBaseProvider>
        <Tab.Navigator
          initialRouteName={screens[0].name}
          screenOptions={() => ({
            tabBarStyle: { paddingTop: 25 },
            tabBarActiveTintColor: '#0F968D',
            tabBarInactiveTintColor: 'gray',
          })}>
          {screens.map((screen) => {
              return (
                <Tab.Screen 
                    key = {screen.name}
                    name = {screen.name} 
                    component = {screen.component}
                />
              );
          })}
        </Tab.Navigator>
      </NativeBaseProvider>
    );
  }
}