import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageSubmission } from "./ImageSubmission/ImageSubmission";
import DisplayCamera from "./ImageRecognition/Camera";

const Stack = createStackNavigator();
const screens = [
  { name: "DisplayCamera", component: DisplayCamera },
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
