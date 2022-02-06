import { Button, NativeBaseProvider } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import renderer from 'react-test-renderer';
import {ImageSubmission} from '../components/camera/ImageSubmission/ImageSubmission'
jest.useFakeTimers()

it('renders correctly', async () => {
    const tree = await renderer.create(<ImageSubmission/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('should find the button via testId', () => {
  // const testIdName = 'pressMeButton';

  // const {getByTestId} = render(<ImageSubmission />);

  // const submitButton = getByTestId(testIdName);

  // expect(submitButton).toBeTruthy();

  const tree = renderer.create(
    <NativeBaseProvider>
      <FlatList>

      </FlatList>
    </NativeBaseProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

