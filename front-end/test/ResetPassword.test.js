import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import {
  ResetPassword,
  ResetPasswordForm,
} from "../components/profile/components/ResetPassword";
import { inset } from './utils/constants';
jest.useFakeTimers()

describe("ResetPassword Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Reset Password Form Renders Properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPasswordForm />
      </NativeBaseProvider>
    );

    expect(queryByTestId("password1")).not.toBeNull();
    expect(queryByTestId("password2")).not.toBeNull();
    expect(queryByTestId("submitBtn")).not.toBeNull();
  });

  it("Fill In Password Fields", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPasswordForm />
      </NativeBaseProvider>
    );

    const field1 = queryByTestId("password1");
    const field2 = queryByTestId("password2");
    fireEvent.changeText(field1, "123");
    fireEvent(field1, 'submitEditing')
    fireEvent.changeText(field2, "321");
  });

  it("Show Passwords", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPasswordForm />
      </NativeBaseProvider>
    );

    const button1 = queryByTestId("showPass1");
    const button2 = queryByTestId("showPass2");
    fireEvent.press(button1);
    fireEvent.press(button2);
  });

  it("Press Submit Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPasswordForm />
      </NativeBaseProvider>
    );

    const button = queryByTestId("submitBtn");
    fireEvent.press(button);
  });
});
