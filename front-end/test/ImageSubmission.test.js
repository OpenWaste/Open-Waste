import { Button, NativeBaseProvider } from 'native-base';
import React from 'react';
import renderer from 'react-test-renderer';
import {ImageSubmission} from '../components/camera/ImageSubmission/ImageSubmission'
jest.useFakeTimers()

it('renders correctly', async () => {
    const tree = await renderer.create(<ImageSubmission/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

it('submit button renders correctly', () => {
  const tree = renderer.create(
    <NativeBaseProvider>
      <Button>
        
      </Button>
    </NativeBaseProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should find the button via testId', () => {
  const tree = renderer.create(
    <NativeBaseProvider>
      <View>
        <Box m="10">
          <VStack space={8}>
            <Box width="100%">
              <Heading fontWeight="medium" style={styles.header}>
                Image Submission
              </Heading>
              <Text mt="3" style={styles.text}>
                If the app was not able to detect your item, upload a picture of
                it so that it can be used to help improve the app.
              </Text>
            </Box>
          </VStack>
        </Box>
      </View>
    </NativeBaseProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});