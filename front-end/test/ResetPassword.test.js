import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import {ResetPassword, ResetPasswordForm} from '../components/profile/components/ResetPassword'

it('renders correctly', async () => {
    const tree = await renderer.create(<ResetPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Reset Password Form Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <ResetPasswordForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('password1')).not.toBeNull();
  expect(queryByTestId('password2')).not.toBeNull();
  expect(queryByTestId('submitBtn')).not.toBeNull();
});

it('Press Submit Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <ResetPasswordForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("submitBtn");

  fireEvent.press(button);

});
