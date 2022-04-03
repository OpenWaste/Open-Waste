import React from "react";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import { LogIn, LoginForm, handleUserAuthentication } from "../components/profile/components/LogIn";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { inset, fakeNavigation } from "./utils/constants";

configure({adapter: new Adapter()});

describe("LogIn Tests", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LogIn />).toJSON();
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
          <LogIn navigation={fakeNavigation} />
      </NativeBaseProvider>
    );

    const button = queryByTestId("forgotBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("ForgotPassword");
  });

  it("Press Remain Guest Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LogIn navigation={fakeNavigation} />
      </NativeBaseProvider>
    );

    const button = queryByTestId("remainBtn");
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith("ProfilePage");
  });

  it("Enter username field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LoginForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("usernameField");
    fireEvent.changeText(field, "John");
    fireEvent(field, 'submitEditing')
  });

  it("Enter password field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LoginForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("passwordField");
    fireEvent.changeText(field, "123");
  });

  it("Submit Form", () => {
    const handleSubmit = jest.fn();

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LoginForm handleSubmit={handleSubmit} />
      </NativeBaseProvider>
    );

    const button = getByTestId("loginBtn");
    fireEvent.press(button);
  });

  it("Show Password", () => {

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LoginForm />
      </NativeBaseProvider>
    );

    const button = getByTestId("showPassBtn");
    fireEvent.press(button);

  });

  it("Unmount Login Component", () => {

    const wrapper = shallow(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <LoginForm />
      </NativeBaseProvider>
    );

    wrapper.unmount()

  });

});

describe("handleUserAuthentication() tests",  () => {
  it("Correct success message is displayed", () => {
    let messageDisplayerMockFN = jest.fn()
    handleUserAuthentication(true,  "","",0,0, messageDisplayerMockFN)

    expect(messageDisplayerMockFN).toHaveBeenCalled();
    expect(messageDisplayerMockFN).toHaveBeenCalledWith({ message: 'Success!', type: 'success' })

  });

  it("Correct failed message is displayed", () => {
    let messageDisplayerMockFN = jest.fn()
    handleUserAuthentication(false, "","",0,0, messageDisplayerMockFN)

    expect(messageDisplayerMockFN).toHaveBeenCalled();
    expect(messageDisplayerMockFN).toHaveBeenCalledWith({ message: 'Invalid Login Information', type: 'warning' })

  });
});
