import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, unmount } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import { LogIn, LoginForm } from "../components/profile/components/LogIn";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { inset, fakeNavigation, showPass } from "./utils/constants";

configure({adapter: new Adapter()});

describe("LogIn Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<LogIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Renders properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    expect(queryByTestId("usernameField")).not.toBeNull();
    expect(queryByTestId("passwordField")).not.toBeNull();
    expect(queryByTestId("loginBtn")).not.toBeNull();
  });

  it("Press Forgot Password Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LogIn navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = queryByTestId("forgotBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("ForgotPassword");
  });

  it("Press Remain Guest Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LogIn navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = queryByTestId("remainBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("ProfilePage");
  });

  it("Enter username field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const field = getByTestId("usernameField");
    fireEvent.changeText(field, "John");
    fireEvent(field, 'submitEditing')
  });

  it("Enter password field", async () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const field = getByTestId("passwordField");
    fireEvent.changeText(field, "123");
  });

  it("Submit Form", () => {
    const handleSubmit = jest.fn();

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm handleSubmit={handleSubmit} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = getByTestId("loginBtn");
    fireEvent.press(button);
  });

  it("Show Password", () => {

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = getByTestId("showPassBtn");
    fireEvent.press(button);

  });

  it("Unmount Login Component", () => {

    const wrapper = shallow(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <LoginForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    wrapper.unmount()

  });

});
