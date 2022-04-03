import * as React from "react";
import DisplayCamera, {
  MapModal,
  CameraTriggerButton,
  PredictionText,
  PostPictureSnapButtons,
  CameraView,
  PicturePreview,
  MapBottomSheet,
  ClosestBuildingMapMarker,
  MapBottomSheetOpenCloseButtons,
  distance,
  processRawInstructions,
  processClosestBuilding,
  processClosestBuildingBins
} from "../components/camera/Camera";
import { NativeBaseProvider } from "native-base";
import { fireEvent, render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { save } from "../utils/PersistInfo";
import { inset } from './utils/constants';

describe("DisplayCamera Parent Component Tests", () => {
  it("DisplayCamera renders correctly", () => {
    const tree = render(
      <NavigationContainer>
        <DisplayCamera />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

describe("Latitude/Longitude Distance Function Tests", () => {
  it("returns 0 when both coordinates are equal", () => {
    let val = distance(1, 1, 1, 1)
    expect(val).toBe(0)
  })

  it("return expected value", () => {
    let val = distance(2, 2, 1, 1)
    expect(Math.floor(val)).toBe(157)
  })
})

describe("processRawInstructions Tests", () => {
  it("Sets correct properly formatted instructions", () => {
    let actualCategory = "correctCategory"
    let categoryInstructionInput = [{category_name:actualCategory, instruction:"step1;step2"}, {category_name:"incorrect", instruction:"otherstep1;otherstep2"}]
    let expectedProcessedString = "1. step1\n2. step2\n";
    let callBack = jest.fn();
    processRawInstructions(categoryInstructionInput, actualCategory, callBack);

    expect(callBack).toHaveBeenCalled();
    expect(callBack).toHaveBeenCalledWith(expectedProcessedString);
  })

  it("Sets properly formatted instructions when category instructions ends with separator", () => {
    let actualCategory = "correctCategory"
    let categoryInstructionInput = [{category_name:actualCategory, instruction:"step1;step2;"}, {category_name:"incorrect", instruction:"otherstep1;otherstep2"}]
    let expectedProcessedString = "1. step1\n2. step2\n";
    let instructionSetterCallBack = jest.fn();
    processRawInstructions(categoryInstructionInput, actualCategory, instructionSetterCallBack);

    expect(instructionSetterCallBack).toHaveBeenCalled();
    expect(instructionSetterCallBack).toHaveBeenCalledWith(expectedProcessedString);
  })
})

describe("processClosestBuilding Tests", () => {
  it("Sets closest building based on current location", () => {
    let currentLocationObject = {coords:{latitude:1, longitude:1}, timestamp:1}
    let closestBuilding = {id:1, building_name:"closest", address:"", latitude: 2, longitude:2}
    let secondClosestBuilding = {id:1, building_name:"2ndClosest", address:"", latitude: 3, longitude:3}
    let thirdClosestBuilding = {id:1, building_name:"3rdClosest", address:"", latitude: 4, longitude:4}
    let closestBuildingCallback = jest.fn();

    processClosestBuilding([thirdClosestBuilding,secondClosestBuilding,closestBuilding], currentLocationObject, closestBuildingCallback);

    expect(closestBuildingCallback).toHaveBeenCalled();
    expect(closestBuildingCallback).toHaveBeenCalledWith(closestBuilding);

  })
})

describe("processClosestBuildingBins Tests", () => {
  it("Returns only the bins of the closest Building", () => {
    let closestBuilding = {id:1, building_name:"closest", address:"", latitude: 2, longitude:2}
    let validBin1 = {id:1, building_id:1, location_name:"validBin1", floor_number:1, room_number:1, disposal_type:"validBin1", accepted_categories:"validBin1"}
    let validBin2 = {id:1, building_id:1, location_name:"validBin2", floor_number:1, room_number:1, disposal_type:"validBin2", accepted_categories:"validBin2"}
    let validBin3 = {id:1, building_id:1, location_name:"validBin3", floor_number:1, room_number:1, disposal_type:"validBin3", accepted_categories:"validBin3"}

    let invalidBin1 = {id:1, building_id:2, location_name:"invalidBin1", floor_number:1, room_number:1, disposal_type:"invalidBin1", accepted_categories:"invalidBin1"}
    let invalidBin2 = {id:1, building_id:3, location_name:"invalidBin2", floor_number:1, room_number:1, disposal_type:"invalidBin2", accepted_categories:"invalidBin2"}
    let invalidBin3 = {id:1, building_id:4, location_name:"invalidBin3", floor_number:1, room_number:1, disposal_type:"invalidBin3", accepted_categories:"invalidBin3"}

    let allBins = [validBin1, validBin2, validBin3, invalidBin1, invalidBin2, invalidBin3];
    let allValidBins = [validBin1, validBin2, validBin3]

    let binSetterCallback = jest.fn()

    processClosestBuildingBins(allBins, closestBuilding, binSetterCallback)

    expect(binSetterCallback).toHaveBeenCalled();
    expect(binSetterCallback).toHaveBeenCalledWith(allValidBins);

  })
})

describe("ClosestBuildingMapMarker Component Tests", () => {
  it("Renders marker when closest building is not undefined", () => {
    let closestBuilding = {id:1, building_name:"test", address:"", latitude:1, longitude:1}
    const { queryByTestId } = render(
        <ClosestBuildingMapMarker closestBuilding={closestBuilding}/>
    );
    expect(queryByTestId("closest-building-marker")).not.toBeNull();
  })

  it("Does NOT render marker when closest building is undefined", () => {
    const { queryByTestId } = render(
        <ClosestBuildingMapMarker closestBuilding={null}/>
    );
    expect(queryByTestId("closest-building-marker")).toBeNull();
  })
})

describe("MapBottomSheetOpenCloseButtons Component Tests", () => {
  it("Bottom Sheet should collapse on button press", () => {
    let visibilitySetter = jest.fn();
    let collapser = jest.fn();
    let expander = jest.fn()

    const { queryByTestId, getByTestId } = render(
        <MapBottomSheetOpenCloseButtons bottomSheetVisible={true} expand={expander} collapse={collapser} bottomSheetVisibilitySetter={visibilitySetter}/>
    );

    //bottomsheet initially visible
    expect(queryByTestId("bottom-sheet-close-btn")).not.toBeNull()
    expect(queryByTestId("bottom-sheet-open-btn")).toBeNull()

    //press button
    fireEvent.press(getByTestId("bottom-sheet-close-btn"));

    expect(visibilitySetter).toHaveBeenCalled()
    expect(collapser).toHaveBeenCalled()
    expect(expander).not.toHaveBeenCalled()
  })

  it("Bottom Sheet should expand on button press", () => {
    let visibilitySetter = jest.fn();
    let collapser = jest.fn();
    let expander = jest.fn()

    const { queryByTestId, getByTestId } = render(
        <MapBottomSheetOpenCloseButtons bottomSheetVisible={false} expand={expander} collapse={collapser} bottomSheetVisibilitySetter={visibilitySetter}/>
    );

    //bottomsheet initially invisible
    expect(queryByTestId("bottom-sheet-close-btn")).toBeNull()
    expect(queryByTestId("bottom-sheet-open-btn")).not.toBeNull()

    //press button
    fireEvent.press(getByTestId("bottom-sheet-open-btn"));

    expect(visibilitySetter).toHaveBeenCalled()
    expect(collapser).not.toHaveBeenCalled()
    expect(expander).toHaveBeenCalled()
  })

})

describe("CameraView Component Tests", () => {
  it("CameraView renders correctly", () => {
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

    let mockCategoryInstruction = [{"category_name":"test", "instruction":"test"}]
    save("category_instructions", mockCategoryInstruction);

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
        bins={[{}]}
      />
    );

    expect(queryByTestId("instruction-text")).toBeNull();
  });

  it("MapBottomSheet should render instruction wrapper if defined", () => {
    
      const {queryByTestId} = render(
        <MapBottomSheet
          category="test"
          instruction="test"
          closestBuilding={undefined}
          bins={[{}]}
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
