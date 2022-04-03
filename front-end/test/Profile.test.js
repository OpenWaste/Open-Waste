/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, unmount, shallowMount } from "enzyme";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileInformation, InfoBox, GuestPage, Profile } from '../components/profile/components/Profile'
import { inset, fakeNavigation } from './utils/constants';

configure({adapter: new Adapter()});

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

it("Unmount Login Component", async () => {

  const wrapper = shallowMount(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <Profile navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>
  );

  wrapper.setState({ username: 'test' });
  wrapper.unmount()

});

it("Press on Login Button", () => {

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <GuestPage />
      </NavigationContainer>
    </NativeBaseProvider>
  );
  
  const button = getByTestId('logInBtn');
  fireEvent.press(button)
});

it("Press on Logout Button", () => {

  const addListener = jest.fn();
  const focusSubscription = jest.fn();

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <GuestPage navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
  
  const button = getByTestId('logInBtn');
  fireEvent.press(button)
});
