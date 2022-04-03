import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { SignUp, SignUpForm, userAuthenticated } from "../components/profile/components/SignUp";
import { inset } from './utils/constants';
jest.useFakeTimers()

describe("SignUp Tests", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Sign Up Form Renders properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm />
      </NativeBaseProvider>
    );

    expect(queryByTestId("usernameField")).not.toBeNull();
    expect(queryByTestId("passwordField")).not.toBeNull();
    expect(queryByTestId("emailField")).not.toBeNull();
    expect(queryByTestId("signUpBtn")).not.toBeNull();
  });

  it("Enter username field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("usernameField");
    fireEvent.changeText(field, "John");
    fireEvent(field, 'submitEditing')
  });

  it("Enter Password Field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("passwordField");
    fireEvent.changeText(field, "123");
    fireEvent(field, 'submitEditing')
  });

  it("Enter email Field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("emailField");
    fireEvent.changeText(field, "John@gmail.com");
  });

  it("Press Show Password Button", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm />
      </NativeBaseProvider>
    );

    const button = getByTestId("showPassBtn");
    fireEvent.press(button);
  });

  it("Submit Form", () => {

    const username = "test";
    const password = "test123";
    const email = "test@gmail.com";

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <SignUpForm username={username} password={password} email={email}/>
      </NativeBaseProvider>
    );

    const button = getByTestId("signUpBtn");
    fireEvent.press(button);
    expect(userAuthenticated()).not.toBeNull();
  });

});
