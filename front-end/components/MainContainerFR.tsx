import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FlashMessage from "react-native-flash-message";

import DisplayCamera from "./camera/Camera";
import { Map } from "./map/Map";
import { SettingsNavigator } from "./settings/SettingsNavigator";
import { ProfileNavigator } from "./profile/ProfileNavigator";
import { ImageSubmission } from "./submission/ImageSubmission";

const screens = [
  { name: "Carte", component: Map, icon: "map", unmount: true},
  { name: "Soumission", component: ImageSubmission, icon: "upload-file", unmount: true},
  { name: "Caméra", component: DisplayCamera, icon: "photo-camera", unmount: false},
  { name: "Profile", component: ProfileNavigator, icon: "person", unmount: false},
  { name: "Paramètres", component: SettingsNavigator, icon: "settings", unmount: false},
];

const Tab = createBottomTabNavigator();

export class MainContainerFR extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        
        <Tab.Navigator
          initialRouteName={"Camera"}
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
                options={{ unmountOnBlur: screen.unmount }}
              />
            );
          })}
        </Tab.Navigator>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    );
  }
}
