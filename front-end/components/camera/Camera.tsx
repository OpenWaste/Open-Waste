import React, { useState, useEffect } from "react";
import {Text, View} from 'react-native';
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import style from "../../styles/camera_style";
import { Button, NativeBaseProvider} from 'native-base';
import Service from "../../service/service";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export default function displayCamera() { 
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  let camera:Camera;
  return (
    <NativeBaseProvider>
      <View style={style.container}>
        <Camera ratio={"16:9"} style={style.camera} type={type} ref={r => camera = r}>
          <View style={style.footer}>
            <MaterialIcons onPress={() => {
              camera.takePictureAsync().then(o => {
                manipulateAsync(o.base64, [], {format:SaveFormat.JPEG}).then(convertedImage => {
                  Service.submitImagePrediction(convertedImage.base64?.split(",")[1])
  
                })
              })
            }} name="file-upload" size={60} color="#FFFFFF" />
            <MaterialIcons name="cancel" size={60} color="#EA4335" />
            <Button color="#FFFFFF" height={60}>Next</Button>
          </View>
        </Camera>
      </View>
    </NativeBaseProvider>
    );
  }