import React, { useState } from "react";
import { View } from "react-native";
import { Text, Box,  Heading, VStack, Button, FormControl} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ImageCategory } from "./ImageCategory";
import { CameraRollBox } from "./CameraRollBox";
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid, Platform } from "react-native";

export function ImageSubmission() {

  const [state, setState] = React.useState(false)

  const toggleState = () => {
    setState(!state)
  }

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  }

  return (
    <View>
        <Box m="10">
          <VStack space={10} alignItems="center">
            <Box width="100%">
              <Heading color="#808080">Image Submission</Heading>
              <Text mt="3" fontWeight="medium" color="#8A8A8A">
                If the app was not able to detect your item, upload a picture of
                it so that it can be used to help improve the app.
              </Text>
            </Box>
            <Button
              onPress={toggleState}
              variant="unstyled"
              width="100%"
              height="30%"
              borderColor="#E5E5E5"
              borderWidth="1"
              rounded="15"
              bg="#FFFFFF"
            >
              <MaterialCommunityIcons
                name="image-outline"
                size={50}
                color="#8A8A8A"
              />
            </Button>
            <ToggleComponent show={state}/>
          </VStack>
        </Box>
    </View>
  );
}

function ToggleComponent(prop)
{
  const readyToSubmit = prop.show
  if(readyToSubmit)
  {
    return <ImageCategory />
  }
  else
  {
    return <CameraRollBox />

  }
}

function hasAndroidPermission() {
  throw new Error("Function not implemented.");
}

function tag(tag: any) {
  throw new Error("Function not implemented.");
}

