import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import {
  VerifyEmail,
  ValidatePasscode,
} from "../components/profile/components/VerifyEmail";
import inset from "./utils/constants";

describe("VerifyEmail Tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<VerifyEmail />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ValidatePasscode Renders Correctly", () => {
    const fakeNavigation = {
      navigate: jest.fn(),
    };

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
});
