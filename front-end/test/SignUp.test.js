import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import {SignUp, SignUpForm} from '../components/profile/components/SignUp'

it('renders correctly', async () => {
    const tree = await renderer.create(<SignUp/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Sign Up Form Renders properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <SignUpForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('usernameField')).not.toBeNull();
  expect(queryByTestId('passwordField')).not.toBeNull();
  expect(queryByTestId('emailField')).not.toBeNull();
  expect(queryByTestId('signUpBtn')).not.toBeNull();
});

it('Enter username field', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const { getByTestId, getByText } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <SignUpForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const field = getByTestId('usernameField');
  fireEvent.changeText(field, "John");
});

it('Enter Password Field', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const { getByTestId, getByText } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <SignUpForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const field = getByTestId('passwordField');
  fireEvent.changeText(field, "123");
});

it('Enter email Field', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const { getByTestId, getByText } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <SignUpForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const field = getByTestId('emailField');
  fireEvent.changeText(field, "John@gmail.com");
});