import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Screens
import Camera from "./camera/Camera";
import Map from "./map/Map";
import Settings from "./settings/Settings";
import Profile from "./profile/Profile";

//Screen names
const cameraName = "Camera";

//screen info first one will be the homescreen
const screenName = {
  Camera: {
    object: Camera,
    icon: "photo-camera",
  },

  Map: {
    object: Map,
    icon: "map",
  },

  Settings: {
    object: Settings,
    icon: "settings",
  },

  Profile: {
    object: Profile,
    icon: "people",
  },
};

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Object.keys(screenName)[0]}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focus, color, size }) => {
            let iconName;
            size = 20;
            iconName = screenName[route.name]["icon"];

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 8 },
          tabBarActiveTintColor: "#B6E28E",
          tabBarInactiveTintColor: "#808080",
        })}
      >
        <Tab.Screen
          name={Object.keys(screenName)[0]}
          component={screenName[Object.keys(screenName)[0]]["object"]}
        />
        <Tab.Screen
          name={Object.keys(screenName)[1]}
          component={screenName[Object.keys(screenName)[1]]["object"]}
        />
        <Tab.Screen
          name={Object.keys(screenName)[2]}
          component={screenName[Object.keys(screenName)[2]]["object"]}
        />
        <Tab.Screen
          name={Object.keys(screenName)[3]}
          component={screenName[Object.keys(screenName)[3]]["object"]}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
