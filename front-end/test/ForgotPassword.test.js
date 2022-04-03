import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import {
  ForgotPassword,
  ResetPassword,
} from "../components/profile/components/ForgotPassword";
import { inset, fakeNavigation } from "./utils/constants";
jest.useFakeTimers()

describe("ForgotPassword Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<ForgotPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Reset Password Form Renders Properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPassword navigation={fakeNavigation}/>
      </NativeBaseProvider>
    );

    expect(queryByTestId("emailField")).not.toBeNull();
    expect(queryByTestId("submitBtn")).not.toBeNull();
  });

  it("Fill In Email Field", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPassword navigation={fakeNavigation} />
      </NativeBaseProvider>
    );

    const field = queryByTestId("emailField");
    fireEvent.changeText(field, "test@gmail.com");
  });

  it("Press Submit Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ResetPassword navigation={fakeNavigation} />
      </NativeBaseProvider>
    );

    const button = queryByTestId("submitBtn");
    fireEvent.press(button);
  });

  it("Press Back to Login Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ForgotPassword navigation={fakeNavigation} />
      </NativeBaseProvider>
    );

    const button = queryByTestId("loginBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("BackToLogin");
  });
});
