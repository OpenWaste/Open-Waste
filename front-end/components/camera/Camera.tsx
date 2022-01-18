import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../styles/camera-style";
import { Button, NativeBaseProvider} from 'native-base';
import Service from "../../service/service";
import { useIsFocused } from '@react-navigation/native';
import MapView from 'react-native-maps';

export default function displayCamera() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("")
  const [picTaken, setPicTaken] = useState(false)
  const [picURI, setPicURI] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  // Represents the modal that contains a google map view
  const MapModal = () => {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
  
              <MaterialIcons style={style.modalCloseButton} name="cancel" size={30} onPress={() => setModalVisible(false)} />
              <MapView style={style.map}
                initialRegion={{
                  latitude: 45.494862,
                  longitude: -73.57790,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }} />
            </View>
          </View>
        </Modal>
    )
  }

  // Camera trigger button: displayed only before a picture is taken
  const CameraTriggerButton = () => {
    return (
      <TouchableHighlight activeOpacity={0.6} underlayColor={'transparent'} onPress={() => {
        camera.takePictureAsync({ base64: true }).then(picture => {
          setPicURI(picture.uri)
          setPicTaken(true)
          Service.submitImagePrediction(picture.base64).then(response => {
            setModalText(response.prediction)
          })
        })
      }}><MaterialCommunityIcons name="circle-slice-8" size={60} color="#FFFFFF" />
      </TouchableHighlight>
    )
  }

  const ImageSubmissionButton = () => {
    return ( 
    <TouchableHighlight style={!picTaken ? style.imageSubmissionButton : {}} activeOpacity={0.6} underlayColor={'transparent'}>
      <MaterialIcons name="file-upload" size={60} color="#FFFFFF" />
    </TouchableHighlight>
    )

  }

  // Buttons rendered after a picture has been taken AND a prediction was returned
  // This includes the CANCEL and NEXT button. The latter of which triggers the MapModal
  const PostPictureSnapButtons = () => {
    return (
      <>
      <TouchableHighlight activeOpacity={0.6} underlayColor={'transparent'}
        onPress={() => { setPicTaken(false); setPicURI(""); setModalText("") }}>
        <MaterialIcons name="cancel" size={60} color="#EA4335" />
      </TouchableHighlight>
      <Button style={style.nextButton} onPress={() => { setModalVisible(true) }}>Next</Button>
    </>
    )
  }

  const PicturePreview = () => {
    return (
      <Image style={style.fullScreenView} source={{ uri: picURI }} />
    )
  }

  const PredictionText = () => {
    return (
    <View style={style.predictionTextContainer}>
      {modalText.length > 0 ? <Text style={style.predictionText}>{modalText}</Text> : <ActivityIndicator size={100} color="#95E0D3" />}
    </View>
    )
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let camera: Camera;

  if (isFocused) {
    return (

      <NativeBaseProvider>
        <View style={style.fullScreenView}>

          {picTaken ? 
          <> 
            <PicturePreview/> 
            <PredictionText/>
          </>: 
          <Camera ratio={"16:9"} style={style.fullScreenView} type={Camera.Constants.Type.back} ref={r => camera = r} />}

          <View style={style.footer}>
            <MapModal/>
            {!picTaken || (picTaken && modalText.length > 0 ) ? <ImageSubmissionButton/>:<></>}
            {!picTaken ? <CameraTriggerButton/> :<></>}
            {picTaken && modalText.length > 0 ? <PostPictureSnapButtons/> : <></>}
          </View>

        </View>
      </NativeBaseProvider>
    );
  }
  return (<View />)

}

