import * as React from "react";
import {
  ImageSubmissionView,
  ImageSubmission,
  handleSubmit,
  pickImage,
  onClose,
  submitImageCategory
} from "../components/submission/ImageSubmission";
import { NativeBaseProvider } from "native-base";
import { fireEvent, render } from "@testing-library/react-native";
import { inset } from './utils/constants';
jest.useFakeTimers()

describe("Image Submission Component Tests", () => {
  it("Image Submission view properly", () => {
    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ImageSubmission />
      </NativeBaseProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Image Submission image button + success alert", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ImageSubmissionView
          image={""}
          setImage={() => {}}
          imageIsChosen={true}
          setImageIsChosen={() => {}}
          categoriesList={["paper"]}
          setCategoriesList={() => {}}
          category={"paper"}
          setCategory={() => {}}
          isOpen={true}
          setIsOpen={() => {}}
          isError={false}
          setIsError={() => {}}
          setIsLoading={() => {}}
          handleSubmit={() => {}}
          onClose={() => {}}
        />
      </NativeBaseProvider>
    );
    expect(queryByTestId("ImageButton")).not.toBeNull();
    expect(queryByTestId("SuccessAlert")).not.toBeNull();
    fireEvent.press(queryByTestId("SuccessAlert"));

    expect(queryByTestId("IconButton")).toBeNull();
  });

  it("ImageSubmission Press Image Icon Button + submitButton", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ImageSubmissionView
          image={""}
          setImage={() => {}}
          imageIsChosen={true}
          setImageIsChosen={() => {}}
          categoriesList={["paper"]}
          setCategoriesList={() => {}}
          category={"paper"}
          setCategory={() => {}}
          isOpen={false}
          setIsOpen={() => {}}
          isError={false}
          setIsError={() => {}}
          setIsLoading={() => {}}
          handleSubmit={() => {}}
          onClose={() => {}}
        />
      </NativeBaseProvider>
    );
    expect(queryByTestId("ImageIconButton")).not.toBeNull();
    expect(queryByTestId("ImageButton")).not.toBeNull();
    fireEvent.press(queryByTestId("ImageIconButton"));

    expect(queryByTestId("SubmitButton")).not.toBeNull();
    fireEvent.press(queryByTestId("SubmitButton"));
  });

  it("ImageSubmission Press Icon Button", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ImageSubmissionView
          image={""}
          setImage={() => {}}
          imageIsChosen={false}
          setImageIsChosen={() => {}}
          categoriesList={["paper"]}
          setCategoriesList={() => {}}
          category={"paper"}
          setCategory={() => {}}
          isOpen={false}
          setIsOpen={() => {}}
          isError={false}
          setIsError={() => {}}
          setIsLoading={() => {}}
          handleSubmit={() => {}}
          onClose={() => {}}
        />
      </NativeBaseProvider>
    );
    expect(queryByTestId("IconButton")).not.toBeNull();
    fireEvent.press(queryByTestId("IconButton"));
  });

  it("Image Submission Image Icon Button  + Error Alert", () => {
    const { queryByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ImageSubmissionView
          image={""}
          setImage={() => {}}
          imageIsChosen={false}
          setImageIsChosen={() => {}}
          categoriesList={["paper"]}
          setCategoriesList={() => {}}
          category={"paper"}
          setCategory={() => {}}
          isOpen={false}
          setIsOpen={() => {}}
          isError={true}
          setIsError={() => {}}
          setIsLoading={() => {}}
          handleSubmit={() => {}}
          onClose={() => {}}
        />
      </NativeBaseProvider>
    );
    expect(queryByTestId("IconButton")).not.toBeNull();
    expect(queryByTestId("ErrorAlert")).not.toBeNull();
    fireEvent.press(queryByTestId("ErrorAlert"));
    expect(queryByTestId("ImageButton")).toBeNull();
  });

  it("Handle Submit Success ensure isLoading is set",(done) => {
    const myMock = jest.fn();
    const setIsLoading = jest.fn();
  
    try {
      handleSubmit(
        setIsLoading,
        (()=>{}),
        true,
        (()=>{}),
        (()=>{}),
        (()=>{}),
        "",
        "plastic",
        myMock
      );
      done()
    } catch (error) {
      done(error);
    }
    
    expect(setIsLoading).toHaveBeenCalledTimes(1);
  });


  it("pickImage test error/timeout", (done) => {
    var testImageIsChosen = true;
    try {
      pickImage(
        (setImage = () => {}),
        (setImageIsChosen = () => {}),
        testImageIsChosen
      );
      done();
    } catch (error) {
      done(error);
    }
    expect(testImageIsChosen).toBe(true); // since there isnt any picture selected so i count as cancel
  });

  it("onClose test", () => {
    var bool1, bool2, bool3;
    var testSet1 = (x) => {
      bool1 = x;
    };
    var testSet2 = (x) => {
      bool2 = x;
    };
    var testSet3 = (x) => {
      bool3 = x;
    };

    onClose(testSet1, testSet2, testSet3);

    expect(bool1).toBe(false);
    expect(bool2).toBe(false);
    expect(bool3).toBe(false);
  });

  it("submitImageCategory success check if there is response", ()=> {
    var object = {
      cancelled: false,
      height: 533,
      type: "image",
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Ffront-end-f31c73b2-f6e9-40d5-ad20-30897d072c23/ImagePicker/52d2b85c-ebad-4462-9f8e-2760042cd753.jpg",
      width: 800,
    };

    var response = submitImageCategory(object,"plastic");
    expect(response).not.toBeNull();  
  });
});
