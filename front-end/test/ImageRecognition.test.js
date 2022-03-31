import * as React from "react";
import {
  MapModal,
  CameraTriggerButton,
  PredictionText,
  PostPictureSnapButtons,
  CameraView,
  PicturePreview,
  MapBottomSheet,
} from "../components/camera/Camera";
import { NativeBaseProvider } from "native-base";
import { fireEvent, render } from "@testing-library/react-native";

describe("CameraView Component Tests", () => {
  it("CameraView renders correctly", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };
    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CameraView
          isPictureTaken={true}
          predictionString="test"
          modalVisibility={true}
          navigator={null}
          cameraInstance={null}
          pictureURI=""
          cameraInstanceSetter={() => {}}
          modalVisibilitySetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          uriSetter={() => {}}
        />
      </NativeBaseProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("CameraView renders correct components after picture is processed", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CameraView
          isPictureTaken={true}
          predictionString="test"
          modalVisibility={false}
          navigator={null}
          cameraInstance={null}
          pictureURI=""
          cameraInstanceSetter={() => {}}
          modalVisibilitySetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          uriSetter={() => {}}
        />
      </NativeBaseProvider>
    );

    //should render
    expect(queryByTestId("pic-preview")).not.toBeNull();
    expect(queryByTestId("prediction-text")).not.toBeNull();
    expect(queryByTestId("cancel-btn")).not.toBeNull();
    expect(queryByTestId("next-btn")).not.toBeNull();

    //should not render
    expect(queryByTestId("cv-camera-component")).toBeNull();
    expect(queryByTestId("camera-snap-btn")).toBeNull();
    expect(queryByTestId("spinner-component")).toBeNull();
  });

  it("CameraView renders correct components before picture is taken", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CameraView
          isPictureTaken={false}
          predictionString=""
          modalVisibility={false}
          navigator={null}
          cameraInstance={null}
          pictureURI=""
          cameraInstanceSetter={() => {}}
          modalVisibilitySetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          uriSetter={() => {}}
        />
      </NativeBaseProvider>
    );

    //should render
    expect(queryByTestId("cv-camera-component")).not.toBeNull();
    expect(queryByTestId("camera-snap-btn")).not.toBeNull();

    //should not render
    expect(queryByTestId("pic-preview")).toBeNull();
    expect(queryByTestId("prediction-text")).toBeNull();
    expect(queryByTestId("cancel-btn")).toBeNull();
    expect(queryByTestId("next-btn")).toBeNull();
    expect(queryByTestId("spinner-component")).toBeNull();
  });

  it("CameraView renders correct components while prediction is loading", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <CameraView
          isPictureTaken={true}
          predictionString=""
          modalVisibility={false}
          navigator={null}
          cameraInstance={null}
          pictureURI=""
          cameraInstanceSetter={() => {}}
          modalVisibilitySetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          uriSetter={() => {}}
        />
      </NativeBaseProvider>
    );

    //should render
    expect(queryByTestId("spinner-component")).not.toBeNull();
    expect(queryByTestId("pic-preview")).not.toBeNull();

    //should not render
    expect(queryByTestId("prediction-text")).toBeNull();
    expect(queryByTestId("cancel-btn")).toBeNull();
    expect(queryByTestId("next-btn")).toBeNull();
    expect(queryByTestId("cv-camera-component")).toBeNull();
    expect(queryByTestId("camera-snap-btn")).toBeNull();
    expect(queryByTestId("img-submission-btn")).toBeNull();
  });
});

describe("MapModal Component Tests", () => {
  it("MapModal calls visibility setter function on close", () => {
    let visibility = true;
    let visibilitySetterMock = jest.fn();
    const { getByTestId } = render(
      <MapModal
        category="test"
        currentVisibilty={visibility}
        visibilitySetter={visibilitySetterMock}
      />
    );

    //Confirm that visibility has been set to true
    expect(getByTestId("map-modal").props.visible).toBe(true);

    //click on the close button
    fireEvent.press(getByTestId("modal-close"));

    //Confirm that the visibilitySetter has been called
    expect(visibilitySetterMock).toHaveBeenCalledTimes(1);
  });
});

describe("MapBottomSheet Component Tests", () => {
  it("MapBottomSheet should not render instruction wrapper if undefined", () => {
    const { queryByTestId } = render(
      <MapBottomSheet
        category="test"
        instruction={undefined}
        closestBuilding={undefined}
        bins={[]}
      />
    );

    expect(queryByTestId("instruction-text")).toBeNull();
  });

  it("MapBottomSheet should render instruction wrapper if defined", () => {
    const { queryByTestId } = render(
      <MapBottomSheet
        category="test"
        instruction="test"
        closestBuilding={undefined}
        bins={[]}
      />
    );

    expect(queryByTestId("instruction-text")).not.toBeNull();
  });
});

describe("CameraTriggerButton Component Tests", () => {
  it("CameraTriggerButton renders correctly", () => {
    let cameraMock = {
      takePictureAsync: () => {},
    };

    const tree = render(
      <CameraTriggerButton
        camera={cameraMock}
        uriSetter={() => {}}
        isPictureTakenSetter={() => {}}
        predictionTextSetter={() => {}}
        predictionFetcher={() => {}}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Camera snaps a picture upon pressing trigger by calling its helper functions", async () => {
    let pictureMock = {
      uri: "testUri",
      base64: "test64",
    };

    let cameraMock = {
      takePictureAsync: jest.fn((value) => {
        return Promise.resolve(pictureMock);
      }),
    };

    let predictionResponseMock = {
      prediction: "predictionMock",
    };

    let predictionFetcher = jest.fn((value) => {
      return Promise.resolve(predictionResponseMock);
    });
    let uriSetterMock = jest.fn();
    let pictureTakenSetterMock = jest.fn();
    let predictionTextSetterMock = jest.fn();

    const { getByTestId } = render(
      <CameraTriggerButton
        camera={cameraMock}
        uriSetter={uriSetterMock}
        isPictureTakenSetter={pictureTakenSetterMock}
        predictionTextSetter={predictionTextSetterMock}
        predictionFetcher={predictionFetcher}
      />
    );

    //snap a picture
    fireEvent.press(getByTestId("camera-snap-btn"));

    //Confirm that all passed in functions were called once
    await expect(cameraMock.takePictureAsync).toHaveBeenCalledTimes(1);
    await expect(predictionFetcher).toHaveBeenCalledTimes(1);
    expect(uriSetterMock).toHaveBeenCalledTimes(1);
    expect(pictureTakenSetterMock).toHaveBeenCalledTimes(1);
    expect(predictionTextSetterMock).toHaveBeenCalledTimes(1);

    expect(cameraMock.takePictureAsync).toHaveBeenCalledWith({ base64: true });
    expect(predictionFetcher).toHaveBeenCalledWith(pictureMock.base64);
    expect(uriSetterMock).toHaveBeenCalledWith(pictureMock.uri);
    expect(pictureTakenSetterMock).toHaveBeenCalledWith(true);
    expect(predictionTextSetterMock).toHaveBeenCalledWith(
      predictionResponseMock.prediction
    );
  });
});

describe("PredictionText Component Tests", () => {
  it("PredictionText renders correctly", () => {
    const tree = render(<PredictionText predictionString="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("PredictionText loads text if length > 0", () => {
    const predictionText = "testText";
    const { queryByTestId } = render(
      <PredictionText predictionString={predictionText} />
    );

    expect(queryByTestId("spinner-component")).toBeNull();
    expect(queryByTestId("prediction-text").props.children).toBe(
      predictionText
    );
  });

  it("PredictionText loads spinner if length == 0", () => {
    const predictionText = "";
    const { queryByTestId } = render(
      <PredictionText predictionString={predictionText} />
    );

    expect(queryByTestId("prediction-text")).toBeNull();
    expect(queryByTestId("spinner-component")).not.toBeNull();
  });
});

describe("PostPictureSnapButtons Component Tests", () => {
  it("PostPictureSnapButtons renders correctly", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };
    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PostPictureSnapButtons
          uriSetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          visibilitySetter={() => {}}
        />
      </NativeBaseProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Cancel button returns to original state by calling helper functions", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    let uriSetterMock = jest.fn();
    let pictureTakenSetterMock = jest.fn();
    let predictionTextSetterMock = jest.fn();

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PostPictureSnapButtons
          uriSetter={uriSetterMock}
          isPictureTakenSetter={pictureTakenSetterMock}
          predictionTextSetter={predictionTextSetterMock}
          visibilitySetter={() => {}}
        />
      </NativeBaseProvider>
    );
    //press cancel button
    fireEvent.press(getByTestId("cancel-btn"));

    //Confirm that all passed in functions were called once
    expect(uriSetterMock).toHaveBeenCalledTimes(1);
    expect(pictureTakenSetterMock).toHaveBeenCalledTimes(1);
    expect(predictionTextSetterMock).toHaveBeenCalledTimes(1);

    expect(uriSetterMock).toHaveBeenCalledWith("");
    expect(pictureTakenSetterMock).toHaveBeenCalledWith(false);
    expect(predictionTextSetterMock).toHaveBeenCalledWith("");
  });

  it("Next button sets MapModal visibility to true", () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };

    let visibilitySetterMock = jest.fn();

    const { getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <PostPictureSnapButtons
          uriSetter={() => {}}
          isPictureTakenSetter={() => {}}
          predictionTextSetter={() => {}}
          visibilitySetter={visibilitySetterMock}
        />
      </NativeBaseProvider>
    );

    //press next button
    fireEvent.press(getByTestId("next-btn"));

    //Confirm that all passed in functions were called once
    expect(visibilitySetterMock).toHaveBeenCalledTimes(1);

    expect(visibilitySetterMock).toHaveBeenCalledWith(true);
  });
});

describe("PicturePreview Component Tests", () => {
  it("PicturePreview renders correctly", () => {
    const tree = render(<PicturePreview pictureURI="" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Loads Image tag with correct source property", () => {
    const picURI = "testURI";
    const { getByTestId } = render(<PicturePreview pictureURI={picURI} />);

    expect(getByTestId("pic-preview").props.source.uri).toBe(picURI);
  });
});
