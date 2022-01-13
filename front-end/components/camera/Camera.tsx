import React, { useState, useEffect } from "react";
import {Alert, Text, View} from 'react-native';
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import style from "../../styles/camera-style";
import { Button, NativeBaseProvider} from 'native-base';
import Service from "../../service/service";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/native';
import { color } from "native-base/lib/typescript/theme/styled-system";

export default function displayCamera({navigation}) { 
  const isFocused = useIsFocused();
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
  if(isFocused){
    return (
      <NativeBaseProvider>
        <View style={style.container}>
          <Camera ratio={"16:9"} style={style.camera} type={type} ref={r => camera = r}/>
          <View style={style.footer}>
              <MaterialIcons onPress={() => {navigation.navigate('ImageSubmission')}} name="file-upload" size={60} color="#FFFFFF" />
              <MaterialIcons name="cancel" size={60} color="#EA4335" />
              <Button color="#FFFFFF" height={60}>Next</Button>
            </View>
        </View>
      </NativeBaseProvider>
      );
  }
  return (<View/>)

  }