import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import {ForgotPassword} from '../components/profile/components/ForgotPassword'

it('renders correctly', async () => {
    const tree = await renderer.create(<ForgotPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Press Verify Email Button', () => {

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
        <ForgotPassword navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId('verifyBtn');
  fireEvent.press(button)
  expect(fakeNavigation.navigate).toBeCalledWith('VerifyEmail')
});

it('Press Back Button', () => {

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
        <ForgotPassword navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId('backBtn');
  fireEvent.press(button)
  expect(fakeNavigation.navigate).toBeCalledWith('Registration')
});