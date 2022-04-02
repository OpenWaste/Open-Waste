import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { ForgotPassword, ResetPassword } from '../components/profile/components/ForgotPassword'
import inset from './utils/constants';

it('renders correctly', async () => {
    const tree = await renderer.create(<ForgotPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Reset Password Form Renders Properly', () => {
  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <ResetPassword/>
      </NavigationContainer>
    </NativeBaseProvider>);
    
  expect(queryByTestId('emailField')).not.toBeNull();
  expect(queryByTestId('submitBtn')).not.toBeNull();
});

it('Press Submit Button', () => {
  const fakeNavigation = {
    navigate: jest.fn(),
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <ResetPassword navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("submitBtn");

  fireEvent.press(button);
});