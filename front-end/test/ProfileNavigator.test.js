import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileNavigator} from '../components/profile/ProfileNavigator'
import { NavigationContainer } from "@react-navigation/native";

describe("ProfileNavigator tests", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
    <NavigationContainer>
      <ProfileNavigator/>
       </NavigationContainer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
