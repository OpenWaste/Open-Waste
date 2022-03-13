import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileInformation, InfoBox } from '../components/profile/components/Profile'

it('Profile Information Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <ProfileInformation
          style={""}
          iconName={""}
          headerText={""}
          infoText={""}/>
      </NavigationContainer>
    </NativeBaseProvider>);
  
  // Returning null, will investigate later

  expect(queryByTestId('emailBox')).not.toBeNull();
  expect(queryByTestId('submittedBox')).not.toBeNull();
  expect(queryByTestId('acceptedBox')).not.toBeNull();
});

it('Info Box Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <InfoBox
          style={""}
          name={""}/>
      </NavigationContainer>
    </NativeBaseProvider>);
    
  expect(queryByTestId('header')).not.toBeNull();
  expect(queryByTestId('info')).not.toBeNull();
  
});