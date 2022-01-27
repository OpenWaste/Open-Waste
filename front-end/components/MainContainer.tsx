import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FlashMessage from "react-native-flash-message";

import { Camera } from "./camera/CameraContainer";
import { Map } from "./map/Map";
import { Settings } from "./settings/Settings";
import { ProfileNavigator } from "./profile/ProfileNavigator";

const screens = [
  { name: "Camera", component: Camera, icon: "photo-camera" },
  { name: "Map", component: Map, icon: "map" },
  { name: "Settings", component: Settings, icon: "settings" },
  { name: "Profile", component: ProfileNavigator, icon: "person" },
];

const Tab = createBottomTabNavigator();

export class MainContainer extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={screens[0].name}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icon = screens.find(
                (screen) => screen.name === route.name
              )?.icon;
              return <MaterialIcons name={icon} size={20} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 8, marginBottom: 10 },
            tabBarStyle: { paddingTop: 10 },
            tabBarActiveTintColor: "#B6E28E",
            tabBarInactiveTintColor: "#808080",
            headerShown: false,
            tabBarHideOnKeyboard: true,
          })}
        >
          {screens.map((screen) => {
            return (
              <Tab.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
              />
            );
          })}
        </Tab.Navigator>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    );
  }
}
