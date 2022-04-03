import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from "enzyme";
import { NativeBaseProvider } from "native-base";
import {ProfileInformation, InfoBox, GuestPage, handleLogout, Profile} from '../components/profile/components/Profile'
import { inset, fakeNavigation } from './utils/constants';

configure({adapter: new Adapter()});

describe("Profile Tests", () => {
  it('Profile Information Renders Properly', () => {
    const {queryByText} = render(
        <NativeBaseProvider initialWindowMetrics={inset}>
            <ProfileInformation
              style={""}
              iconName={""}
              headerText={""}
              infoText={""}/>
        </NativeBaseProvider>);
  
    expect(queryByText('Email')).not.toBeNull();
    expect(queryByText('Submitted Images')).not.toBeNull();
    expect(queryByText('Accepted Images')).not.toBeNull();
  });
  
  it('Info Box Renders Properly', () => {
    const {queryByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <InfoBox
            style={""}
            name={""}/>
      </NativeBaseProvider>);
      
    expect(queryByTestId('header')).not.toBeNull();
    expect(queryByTestId('info')).not.toBeNull();
  });
});

it("Press on Login Button", () => {

  const { getByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
        <GuestPage/>
    </NativeBaseProvider>
  );
  
  const button = getByTestId('logInBtn');
  fireEvent.press(button)
});

it("Press on Logout Button", () => {

  const { queryByTestId } = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
        <GuestPage/>
    </NativeBaseProvider>
  );
  
  const button = queryByTestId('logInBtn');
  fireEvent.press(button);
});

describe("handleLogout Tests", () => {
  it("Correct Success message is displayed", () => {
    let messageDisplayerMockFN = jest.fn()
    handleLogout(messageDisplayerMockFN)

    expect(messageDisplayerMockFN).toHaveBeenCalled();
    expect(messageDisplayerMockFN).toHaveBeenCalledWith({ message: 'Logged Out', type: 'success' })
  })
})
