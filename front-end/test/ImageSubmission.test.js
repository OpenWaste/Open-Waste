import * as React from 'react';
import { ImageSubmissionView, ImageSubmission } from '../components/submission/ImageSubmission'
import { NativeBaseProvider } from "native-base";
import { fireEvent, render } from '@testing-library/react-native'

describe('Image Submission Component Tests', () => {

  it('Image Submission view properly', () => {
    //These values need to be passed into NativeBaseProvider for it to work properly with JEST
    const inset = {
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    };
    const tree = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
          <ImageSubmission/>
      </NativeBaseProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Image Submission image button + success alert' , () =>{
    const inset = {
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      };

      const {queryByTestId} = render(
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ImageSubmissionView
          image = {""}
          setImage = {()=> {}}
          imageIsChosen = {true}
          setImageIsChosen = {()=> {}}
          categoriesList = {["paper"]}
          setCategoriesList = {()=> {}}
          category = {"paper"}
          setCategory = {()=> {}}
          isOpen = {true}
          setIsOpen = {()=> {}}
          isError = {false}
          setIsError = {()=> {}}
          onClose = {()=> {}}
        />
        </NativeBaseProvider>
      )
      expect(queryByTestId("ImageButton")).not.toBeNull()
      expect(queryByTestId("SuccessAlert")).not.toBeNull()

      expect(queryByTestId("ImageIconButton")).toBeNull()
  });

  it('Image Submission Image Icon Button  + Error Alert' , () =>{
    const inset = {
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      };

      const {queryByTestId} = render(
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ImageSubmissionView
          image = {""}
          setImage = {()=> {}}
          imageIsChosen = {false}
          setImageIsChosen = {()=> {}}
          categoriesList = {["paper"]}
          setCategoriesList = {()=> {}}
          category = {"paper"}
          setCategory = {()=> {}}
          isOpen = {false}
          setIsOpen = {()=> {}}
          isError = {true}
          setIsError = {()=> {}}
          onClose = {()=> {}}
        />
        </NativeBaseProvider>
      )
      expect(queryByTestId("ImageIconButton")).not.toBeNull()
      expect(queryByTestId("ErrorAlert")).not.toBeNull()

      expect(queryByTestId("ImageButton")).toBeNull()
  });

});