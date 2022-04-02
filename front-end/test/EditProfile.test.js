import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { EditProfile, EditForm, DeleteAccount } from '../components/profile/components/EditProfile'
import inset from './utils/constants';

it('renders correctly', async () => {
    const tree = await renderer.create(<EditProfile/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('Edit Form Renders Properly', () => {
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
  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <DeleteAccount/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('deleteBtn')).not.toBeNull();
});