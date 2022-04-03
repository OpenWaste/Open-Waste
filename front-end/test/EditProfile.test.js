import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import {
  EditProfile,
  EditForm,
  DeleteAccount,
} from "../components/profile/components/EditProfile";
import { inset } from './utils/constants';
jest.useFakeTimers()

describe("EditProfile tests", () => {
  it("renders correctly", async () => {
    const tree = await renderer.create(<EditProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Edit Form Renders Properly", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <EditForm />
      </NativeBaseProvider>
    );

    expect(queryByTestId("editUsernameAccordion")).not.toBeNull();
    expect(queryByTestId("editEmailAccordion")).not.toBeNull();
    expect(queryByTestId("cancelBtn")).not.toBeNull();
    expect(queryByTestId("saveBtn")).not.toBeNull();
  });

  it("Save Information", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <EditForm/>
      </NativeBaseProvider>
    );

    const button = queryByTestId("saveBtn");
    fireEvent.press(button);
  });

  it("Cancel Changes on Edit Form", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <EditForm />
      </NativeBaseProvider>
    );
    
    const button = getByTestId("cancelBtn");
    fireEvent.press(button);
  });

  it("Delete Modal Renders Properly", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <DeleteAccount />
      </NativeBaseProvider>
    );

    const button = getByTestId("deleteBtn");
    fireEvent.press(button);
  });

  it("Close Delete Modal", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <DeleteAccount />
      </NativeBaseProvider>
    );
    
    const button1 = getByTestId("deleteBtn");
    fireEvent.press(button1);

    const button2 = getByTestId("modalCancelBtn");
    fireEvent.press(button2);
  });

  it("Enter Username Field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <EditForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("usernameField");
    fireEvent.changeText(field, "newtest");
  });

  it("Enter Email Field", () => {
    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <EditForm />
      </NativeBaseProvider>
    );

    const field = getByTestId("emailField");
    fireEvent.changeText(field, "newtest@gmail.com");
  });

});
