import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "./styles";
import { Button, NativeBaseProvider } from "native-base";
import Service from "../../service/service";
import { useIsFocused } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  MapModalProperties,
  CameraTriggerButtonProperties,
  PredictionTextProperties,
  PostPictureSnapButtonsProperties,
  CameraViewProperties,
  PicturePreviewProperties,
} from "../../interfaces/camera-types";
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

export default function DisplayCamera() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [picTaken, setPicTaken] = useState(false);
  const [picURI, setPicURI] = useState("");
  const [camera, setCameraInstance] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  if (isFocused) {
    return (
      <NativeBaseProvider>
        <CameraView
          isPictureTaken={picTaken}
          predictionString={modalText}
          modalVisibility={modalVisible}
          cameraInstance={camera}
          pictureURI={picURI}
          cameraInstanceSetter={setCameraInstance}
          modalVisibilitySetter={setModalVisible}
          isPictureTakenSetter={setPicTaken}
          predictionTextSetter={setModalText}
          uriSetter={setPicURI}
        />
      </NativeBaseProvider>
    );
  }
  return <View />;
}

const CameraView = (props: CameraViewProperties) => {
  return (
    <View style={style.fullScreenView}>
      {props.isPictureTaken ? (
        <>
          <PicturePreview pictureURI={props.pictureURI} />
          <PredictionText predictionString={props.predictionString} />
        </>
      ) : (
        <Camera
          testID="cv-camera-component"
          ratio={"16:9"}
          style={style.fullScreenView}
          type={Camera.Constants.Type.back}
          ref={(r: any) => props.cameraInstanceSetter(r)}
        />
      )}

      <View style={style.footer}>
        <MapModal
          currentVisibilty={props.modalVisibility}
          visibilitySetter={props.modalVisibilitySetter}
        />
        {!props.isPictureTaken ? (
          <CameraTriggerButton
            camera={props.cameraInstance}
            uriSetter={props.uriSetter}
            isPictureTakenSetter={props.isPictureTakenSetter}
            predictionTextSetter={props.predictionTextSetter}
            predictionFetcher={Service.submitImagePrediction}
          />
        ) : (
          <></>
        )}
        {props.isPictureTaken && props.predictionString.length > 0 ? (
          <PostPictureSnapButtons
            uriSetter={props.uriSetter}
            isPictureTakenSetter={props.isPictureTakenSetter}
            predictionTextSetter={props.predictionTextSetter}
            visibilitySetter={props.modalVisibilitySetter}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const PicturePreview = (props: PicturePreviewProperties) => {
  return (
    <Image
      testID="pic-preview"
      style={style.fullScreenView}
      source={{ uri: props.pictureURI }}
    />
  );
};

// Represents the modal that contains a google map view
const MapModal = (props: MapModalProperties) => {
  let [ShowComment, setShowModelComment] = useState(false);
  let [animateModal, setanimateModal] = useState(false);

  return (
    <Modal
      testID="map-modal"
      animationType="slide"
      transparent={true}
      visible={props.currentVisibilty}
      onRequestClose={() => {
        props.visibilitySetter(false);
      }}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>

          <SwipeUpDownModal
            modalVisible={ShowComment}
            PressToanimate={animateModal}
            //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
            ContentModal={
              <View style={style.swipeUpWindowContent}>
                
              </View>
            }
            HeaderStyle={style.swipeUpWindowHeaderContent}
            ContentModalStyle={style.swipeUpWindowModal}
            HeaderContent={
              <View style={style.swipeUpWindowHeader}>
                <Button
                  Title={"Press Me"}
                  onPress={() => {
                    setanimateModal(true);
                  }}
                />
              </View>
            }
            onClose={() => {
              setModelComment(false);
              setanimateModal(false);
            }}
          />

          <MaterialIcons
            testID="modal-close"
            style={style.modalCloseButton}
            name="cancel"
            size={30}
            onPress={() => props.visibilitySetter(false)}
          />
          <MapView
            style={style.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 45.494862,
              longitude: -73.5779,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

// Camera trigger button: displayed only before a picture is taken
const CameraTriggerButton = (props: CameraTriggerButtonProperties) => {
  return (
    <TouchableHighlight
      testID="camera-snap-btn"
      activeOpacity={0.6}
      underlayColor={"transparent"}
      onPress={() => {
        props.camera.takePictureAsync({ base64: true }).then((picture) => {
          props.uriSetter(picture.uri);
          props.isPictureTakenSetter(true);
          props.predictionFetcher(picture.base64).then((response) => {
            props.predictionTextSetter(response.prediction);
          });
        });
      }}
    >
      <MaterialCommunityIcons name="circle-slice-8" size={60} color="#FFFFFF" />
    </TouchableHighlight>
  );
};

const PredictionText = (props: PredictionTextProperties) => {
  return (
    <View style={style.predictionTextContainer}>
      {props.predictionString.length > 0 ? (
        <Text testID="prediction-text" style={style.predictionText}>
          {props.predictionString}
        </Text>
      ) : (
        <ActivityIndicator
          testID="spinner-component"
          size={100}
          color="#95E0D3"
        />
      )}
    </View>
  );
};

// Buttons rendered after a picture has been taken AND a prediction was returned
// This includes the CANCEL and NEXT button. The latter of which triggers the MapModal
const PostPictureSnapButtons = (props: PostPictureSnapButtonsProperties) => {
  return (
    <>
      <TouchableHighlight
        testID="cancel-btn"
        activeOpacity={0.6}
        underlayColor={"transparent"}
        onPress={() => {
          props.isPictureTakenSetter(false);
          props.uriSetter("");
          props.predictionTextSetter("");
        }}
      >
        <MaterialIcons name="cancel" size={60} color="#EA4335" />
      </TouchableHighlight>
      <Button
        testID="next-btn"
        style={style.nextButton}
        onPress={() => {
          props.visibilitySetter(true);
        }}
      >
        Next
      </Button>
    </>
  );
};

export {
  MapModal,
  CameraTriggerButton,
  PredictionText,
  PostPictureSnapButtons,
  CameraView,
  PicturePreview,
};
