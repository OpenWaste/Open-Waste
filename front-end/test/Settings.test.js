import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { Setting } from '../components/settings/components/Settings'
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  const tree = await renderer.create(
  <NavigationContainer>
    <Setting/>
  </NavigationContainer>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Press About us Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <Setting navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("about us");

  fireEvent.press(button);

});

it('Press Language Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <Setting navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("language");

  fireEvent.press(button);

});