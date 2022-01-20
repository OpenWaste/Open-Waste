import React from "react";
import { View } from "react-native";
import {
  Text,
  Box,
  Heading,
  VStack,
  Button,
  NativeBaseProvider,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ImageCategory } from "./ImageCategory";
import { CameraRollBox } from "./CameraRollBox";

export function ImageSubmission() {
  const [state, setState] = React.useState(true);

  const toggleState = () => {
    setState(!state);
  };

  return (
    <NativeBaseProvider>
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
            <ToggleComponent show={state} />
          </VStack>
        </Box>
      </View>
    </NativeBaseProvider>
  );
}

function ToggleComponent(prop) {
  const readyToSubmit = prop.show;
  return readyToSubmit ? <ImageCategory /> : <CameraRollBox />;
}
