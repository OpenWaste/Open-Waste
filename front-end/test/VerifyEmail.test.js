import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  VerifyEmail,
  ValidatePasscode,
} from "../components/profile/components/VerifyEmail";
import { inset, fakeNavigation } from "./utils/constants";

describe("VerifyEmail Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<VerifyEmail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ValidatePasscode Renders Correctly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ValidatePasscode navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    expect(queryByTestId("passcodeField")).not.toBeNull();
    expect(queryByTestId("submitBtn")).not.toBeNull();
  });

  it("Fill In Password Field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ValidatePasscode navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const field = getByTestId("passcodeField");
    fireEvent.changeText(field, "123");
  });

  it("Submit Form", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <NavigationContainer>
          <ValidatePasscode navigation={fakeNavigation} />
        </NavigationContainer>
      </NativeBaseProvider>
    );

    const button = getByTestId("submitBtn");
    fireEvent.press(button);
  });

});
