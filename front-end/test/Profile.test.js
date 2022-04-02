import React from 'react';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileInformation, InfoBox } from '../components/profile/components/Profile'
import { inset } from './utils/constants';

describe("Profile Tests", () => {
  it('Profile Information Renders Properly', () => {
    const {queryByText} = render(
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
  
    expect(queryByText('Email')).not.toBeNull();
    expect(queryByText('Submitted Images')).not.toBeNull();
    expect(queryByText('Accepted Images')).not.toBeNull();
  });
  
  it('Info Box Renders Properly', () => {
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
});
