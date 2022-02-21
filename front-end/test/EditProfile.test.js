import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import {EditProfile, EditForm, DeleteAccount} from '../components/profile/components/EditProfile'

it('renders correctly', async () => {
    const tree = await renderer.create(<EditProfile/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Edit Form Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <EditForm/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('editUsernameAccordion')).not.toBeNull();
  expect(queryByTestId('editEmailAccordion')).not.toBeNull();
  expect(queryByTestId('cancelBtn')).not.toBeNull();
  expect(queryByTestId('saveBtn')).not.toBeNull();
});

it('Delete Modal Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <DeleteAccount/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('deleteBtn')).not.toBeNull();
});