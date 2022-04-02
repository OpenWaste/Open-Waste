import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileNavigator} from '../components/profile/ProfileNavigator'
import { NavigationContainer } from "@react-navigation/native";

it('renders correctly', async () => {
    const tree = await renderer.create(
    <NavigationContainer>
      <ProfileNavigator/>
       </NavigationContainer>).toJSON();
    expect(tree).toMatchSnapshot();
});