import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  ForgotPassword,
  ResetPassword,
} from "../components/profile/components/ForgotPassword";
import { inset, fakeNavigation } from "./utils/constants";

describe("ForgotPassword Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<ForgotPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Reset Password Form Renders Properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ResetPassword />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    expect(queryByTestId("emailField")).not.toBeNull();
    expect(queryByTestId("submitBtn")).not.toBeNull();
  });

  it("Fill In Email Field", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ResetPassword navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const field = queryByTestId("emailField");
    fireEvent.changeText(field, "test@gmail.com");
  });

  it("Press Submit Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ResetPassword navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = queryByTestId("submitBtn");
    fireEvent.press(button);
  });

  it("Press Back to Login Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ForgotPassword navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = queryByTestId("loginBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("BackToLogin");
  });
});
