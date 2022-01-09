import * as React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import style from "../../styles/profile-style";
import { Button, NativeBaseProvider } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

const Tab = createMaterialTopTabNavigator();

export class Registration extends React.Component {

  render() {
    return (
      <NativeBaseProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
            },
            tabBarActiveTintColor: '#0F968D',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Log In" component= {LogIn} />
          <Tab.Screen name="Sign Up" component={SignUp} />
        </Tab.Navigator>
      </NativeBaseProvider>
    );
  }
}