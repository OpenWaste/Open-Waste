import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { LogIn, LoginForm } from '../components/profile/components/LogIn'
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';

it('renders correctly', async () => {
    const tree = await renderer.create(<LogIn/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Renders properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LoginForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('usernameField')).not.toBeNull();
  expect(queryByTestId('passwordField')).not.toBeNull();
  expect(queryByTestId('loginBtn')).not.toBeNull();
});

it('Press Forgot Password Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const { queryByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LogIn navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId('forgotBtn');
  fireEvent.press(button)
  expect(fakeNavigation.navigate).toBeCalledWith('ForgotPassword')
});

it('Press Remain Guest Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const { queryByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LogIn navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId('remainBtn');
  fireEvent.press(button)
  expect(fakeNavigation.navigate).toBeCalledWith('ProfilePage')
});

it('Enter username field', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LoginForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const field = getByTestId('usernameField');
  fireEvent.changeText(field, "John");
});

it('Enter password field', async () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LoginForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const field = getByTestId('passwordField');
  fireEvent.changeText(field, "123");

});

it('Submit Form', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const handleSubmit = jest.fn();

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <LoginForm handleSubmit={handleSubmit}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = getByTestId("loginBtn");
  fireEvent.press(button);

});
