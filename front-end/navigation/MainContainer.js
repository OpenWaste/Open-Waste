import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Screens
import CameraScreen from "./screens/CameraScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";

//Screen names
const cameraName = "Camera";
const mapName = "Map";
const settingsName = "Settings";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={cameraName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focus, color, size}) => {
            let iconName;
            let rn = route.name;
            size = 20
            if (rn === cameraName) {
              iconName = "photo-camera"; // name of the icon
            } else if (rn === mapName) {
              iconName = "map"; // name of the icon
            } else if (rn === settingsName) {
              iconName = "settings"; // name of the icon
            } else if (rn === profileName) {
              iconName = "person"; // name of the icon
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {fontSize: 8},
          tabBarActiveTintColor: "#B6E28E",
          tabBarInactiveTintColor: "#808080"
        })}
      >
        <Tab.Screen name={cameraName} component={CameraScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
