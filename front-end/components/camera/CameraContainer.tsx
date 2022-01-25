import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageSubmission } from "./ImageSubmission/ImageSubmission";
import displayCamera from "./Camera";

const Stack = createStackNavigator();
const screens = [
  { name: "displayCamera", component: displayCamera },
  { name: "ImageSubmission", component: ImageSubmission },
];
export class Camera extends React.Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {screens.map((screen) => {
          return (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          );
        })}
      </Stack.Navigator>
    );
  }
}
