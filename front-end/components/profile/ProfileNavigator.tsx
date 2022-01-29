import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Registration } from './Registration';
import { Profile } from './Profile';
import { ForgotPassword } from './ForgotPassword';
import { VerifyEmail } from './VerifyEmail';
import { EditProfile } from './EditProfile';
import { ResetPassword } from './ResetPassword';

const Stack = createStackNavigator();

const screens = [
    {name: "ProfilePage", component: Profile},
    {name: "Registration", component: Registration},
    {name: "ForgotPassword", component: ForgotPassword},
    {name: "VerifyEmail", component: VerifyEmail},
    {name: "EditProfile", component: EditProfile},
    {name: "ResetPassword", component: ResetPassword},
];
export class ProfileNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator 
                initialRouteName={screens[0].name}
                screenOptions={{ headerShown: false }}>
                {screens.map((screen) => {
                    return (
                        <Stack.Screen 
                            key = {screen.name}
                            name = {screen.name} 
                            component = {screen.component}
                        />
                    );
                })}
            </Stack.Navigator>
        )
    }
}