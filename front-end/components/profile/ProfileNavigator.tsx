import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Registration as LoginScreen } from './Registration';
import { Profile as ProfileScreen } from './Profile';
import { ForgotPassword as ForgotPasswordScreen } from './ForgotPassword';
import { VerifyEmail as VerifyEmailScreen } from './VerifyEmail';
import { EditProfile as EditProfileScreen } from './EditProfile';
import { ResetPassword as ResetPasswordScreen } from './ResetPassword';

const Stack = createStackNavigator();

export class ProfileNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ProfilePage" component={ProfileScreen} />
                <Stack.Screen name="LogIn" component={LoginScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            </Stack.Navigator>
        )
    }
}