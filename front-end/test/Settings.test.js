import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { Setting } from '../components/settings/components/Settings'
import renderer from 'react-test-renderer';
import { inset, fakeNavigation } from './utils/constants';

it('renders correctly', async () => {
  const tree = await renderer.create(
    <Setting navigation={fakeNavigation}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Press About us Button', () => {
  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
        <Setting navigation={fakeNavigation}/>
    </NativeBaseProvider>);

  const button = queryByTestId("about us");

  fireEvent.press(button);

});

it('Press Language Button', () => {
  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
        <Setting navigation={fakeNavigation}/>
    </NativeBaseProvider>);

  const button = queryByTestId("language");

  fireEvent.press(button);

});
