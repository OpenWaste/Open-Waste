import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { VerifyEmail, ValidatePasscode } from '../components/profile/components/VerifyEmail'

it('renders correctly', async () => {
    const tree = await renderer.create(<VerifyEmail/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('ValidatePasscode Renders Correctly', () => {

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
        <ValidatePasscode navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  expect(queryByTestId('passcodeField')).not.toBeNull();
  expect(queryByTestId('submitBtn')).not.toBeNull();
});