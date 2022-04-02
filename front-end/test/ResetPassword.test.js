import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  ResetPassword,
  ResetPasswordForm,
} from "../components/profile/components/ResetPassword";
import inset from "./utils/constants";

describe("ResetPassword Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Reset Password Form Renders Properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ResetPasswordForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    expect(queryByTestId("password1")).not.toBeNull();
    expect(queryByTestId("password2")).not.toBeNull();
    expect(queryByTestId("submitBtn")).not.toBeNull();
  });

  it("Press Submit Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ResetPasswordForm />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = queryByTestId("submitBtn");
    fireEvent.press(button);
  });
});
