import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { SignUp, SignUpForm, handleAccountCreation } from "../components/profile/components/SignUp";
import { inset } from './utils/constants';

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
});

describe("handleAccountCreation() tests",  () => {
  it("Correct success message is displayed", () => {
    let messageDisplayerMockFN = jest.fn()
    handleAccountCreation(true, "test", "test",  messageDisplayerMockFN)

    expect(messageDisplayerMockFN).toHaveBeenCalled();
    expect(messageDisplayerMockFN).toHaveBeenCalledWith({ message: 'Success!', type: 'success' })

  });

  it("Correct failed message is displayed", () => {
    let messageDisplayerMockFN = jest.fn()
    handleAccountCreation(false, "test", "test", messageDisplayerMockFN)

    expect(messageDisplayerMockFN).toHaveBeenCalled();
    expect(messageDisplayerMockFN).toHaveBeenCalledWith({ message: "Error creating account", type: 'warning' })

  });
});

