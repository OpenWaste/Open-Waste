import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { AboutUs } from '../components/settings/components/AboutUs'
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
  const tree = await renderer.create(
  <NavigationContainer>
    <AboutUs/>
  </NavigationContainer>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Heaader for showing About Us Page Renders Properly', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs>
                style={""}
        </AboutUs>
      </NavigationContainer>
    </NativeBaseProvider>);
    
  expect(queryByTestId('p1')).not.toBeNull();  
});

it('Press header', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("header");

  fireEvent.press(button);

});

it('Press CP3 Email Button', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("CP3Email");

  fireEvent.press(button);

});

it('Press CP3 Email Text', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("CP3EmailText");

  fireEvent.press(button);

});

it('Press Zerowaste Email', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteEmail");

  fireEvent.press(button);

});

it('Press Zerowaste Email Text', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteEmailText");

  fireEvent.press(button);

});

it('Press CP3 Facebook', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("CP3Facebook");

  fireEvent.press(button);

});

it('Press CP3 Instagram', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("CP3Instagram");

  fireEvent.press(button);

});

it('Press CP3 Web', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("CP3Web");

  fireEvent.press(button);

});

it('Press Zerowaste Facebook', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteFacebook");

  fireEvent.press(button);

});

it('Press Zerowaste Instagram', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteInstagram");

  fireEvent.press(button);

});

it('Press Zerowaste Web', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteWeb");

  fireEvent.press(button);

});

it('Press Zerowaste Email 2', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteEmail2");

  fireEvent.press(button);

});

it('Press Zerowaste Email Text 2', () => {

  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  const fakeNavigation = {
    navigate: jest.fn(),
  
  };

  const {queryByTestId} = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>
        <AboutUs navigation={fakeNavigation}/>
      </NavigationContainer>
    </NativeBaseProvider>);

  const button = queryByTestId("ZerowasteEmailText2");

  fireEvent.press(button);

});