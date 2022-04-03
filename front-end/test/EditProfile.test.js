import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import {
  EditProfile,
  EditForm,
  DeleteAccount,
  validateUserProfileChange,
  handleUserDeletion,
  handleUserProfileChange
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

describe("validateUserProfileChange() Tests", () => {
  it("If no change, then display no message to user", () => {
    let messageDisplayer = jest.fn()
    validateUserProfileChange(false,"","","", messageDisplayer)
    expect(messageDisplayer).not.toBeCalled()
  })

  it("If change and no new username specified, then display correct message to user", () => {
    let messageDisplayer = jest.fn()
    validateUserProfileChange(true,"","","", messageDisplayer)

    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({ message: "Please fill a new username", type: "warning" })
  })

  it("If change and no new email specified, then display correct message to user", () => {
    let messageDisplayer = jest.fn()
    validateUserProfileChange(true,"test","","", messageDisplayer)

    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({ message: "Please fill a new email", type: "warning" })
  })

  it("If change new email is invalid, then display correct message to user", () => {
    let messageDisplayer = jest.fn()
    validateUserProfileChange(true,"test","test","", messageDisplayer)

    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({ message: "Invalid Email", type: "warning" })
  })
})

describe("handleUserDeletion() Tests", () => {
  it("Correct success message is displayed", () => {
    let messageDisplayer = jest.fn()
    handleUserDeletion(true ,messageDisplayer)
    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({
      message: "Successfully Deleted Account",
      type: "success",
    })
  })

  it("Correct failure message is displayed", () => {
    let messageDisplayer = jest.fn()
    handleUserDeletion(false ,messageDisplayer)
    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({ message: "An Error Has Occurred", type: "warning" })
  })
})

describe("handleUserProfileChange() Tests", () => {
  it("Correct success message is displayed", () => {
    let messageDisplayer = jest.fn()
    handleUserProfileChange(true , "", "", messageDisplayer)
    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({
      message: "Successfully Updated Account",
      type: "success",
    })
  })

  it("Correct failure message is displayed", () => {
    let messageDisplayer = jest.fn()
    handleUserProfileChange(false , "", "", messageDisplayer)
    expect(messageDisplayer).toBeCalled()
    expect(messageDisplayer).toBeCalledWith({ message: "An Error Has Occurred", type: "warning" })
  })
})
