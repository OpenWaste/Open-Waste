import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import style from "../../styles/camera_style";
import { Button, NativeBaseProvider, useTheme } from 'native-base';

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
  return (
    <NativeBaseProvider>
      <View style={style.container}>
        <Camera style={style.camera} type={type}>
          <View style={style.footer}>
            <MaterialIcons name="file-upload" size={60} color="#FFFFFF" />
            <MaterialIcons name="cancel" size={60} color="#EA4335" />
            <Button color="#FFFFFF" height={60}>Next</Button>
          </View>
        </Camera>
      </View>
    </NativeBaseProvider>
  );
}