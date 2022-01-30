import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Registration } from "./components/Registration";
import { Profile } from "./components/Profile";
import { ForgotPassword } from "./components/ForgotPassword";
import { VerifyEmail } from "./components/VerifyEmail";
import { EditProfile } from "./components/EditProfile";
import { ResetPassword } from "./components/ResetPassword";

const Stack = createStackNavigator();

const screens = [
  { name: "ProfilePage", component: Profile },
  { name: "Registration", component: Registration },
  { name: "ForgotPassword", component: ForgotPassword },
  { name: "VerifyEmail", component: VerifyEmail },
  { name: "EditProfile", component: EditProfile },
  { name: "ResetPassword", component: ResetPassword },
];

export class ProfileNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={screens[0].name}
        screenOptions={{ headerShown: false }}
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
