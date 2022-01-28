import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Registration as LoginScreen } from './Registration';
import { Profile as ProfileScreen } from './Profile';
import { ForgotPassword as ForgotPasswordScreen } from './ForgotPassword';
import { VerifyEmail as VerifyEmailScreen } from './VerifyEmail';
import { EditProfile as EditProfileScreen } from './EditProfile';
import { ResetPassword as ResetPasswordScreen } from './ResetPassword';

const Stack = createStackNavigator();

const screens = [
    {name: "ProfilePage", component: ProfileScreen},
    {name: "LogIn", component: LoginScreen},
    {name: "ForgotPassword", component: ForgotPasswordScreen},
    {name: "VerifyEmail", component: VerifyEmailScreen},
    {name: "EditProfile", component: EditProfileScreen},
    {name: "ResetPassword", component: ResetPasswordScreen},
];
export class ProfileNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {screens.map((screen) => {
                    return (
                        <Stack.Screen 
                            key={screen.name}
                            name = {screen.name} 
                            component = {screen.component}
                        />
                    );
                })}
            </Stack.Navigator>
        )
    }
}