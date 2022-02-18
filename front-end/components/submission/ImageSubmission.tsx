import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import {
  Text,
  Box,
  Center,
  Heading,
  VStack,
  Button,
  FormControl,
  Select,
  Image,
  AlertDialog,
  AspectRatio,
  NativeBaseProvider,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Service from "../../service/service";
import { getValueFor } from '../../utils/PersistInfo';

// To ignore color scheme warnings given for dropdown color
import { LogBox } from "react-native";
LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1:1'])

export function ImageSubmission() {
  const [image, setImage] = useState("");
  const [imageIsChosen, setImageIsChosen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const cancelRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const onClose = () => {setIsOpen(false), setIsError(false)};

  //Opens the camera roll
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!res.cancelled) {
      setImage(res);
      setImageIsChosen(!imageIsChosen);
      setImageIsChosen(true);
    }
  };

  //Calls the service to submit using POST
  const handleSubmit = async () => {
        await Service.submitImageCategory(image.base64, category)
        .then( () => {
          setIsOpen(!isOpen);
          setImageIsChosen(false);
          setCategory("");
        })
        .catch( () => {
         setIsError(!isError);
      });
  };

  //Gets list of categories from endpoint
  useEffect(() => {
    if (categoriesList.length == 0) {
      getValueFor("categories").then(a => {
        setCategoriesList(a);
      })
    }
  });

  return (
    <NativeBaseProvider>
      <View>
        <Box m="10">
          <VStack space={8}>
            <Box width="100%">
              <Heading fontWeight="medium" style={styles.header}>
                Image Submission
              </Heading>
              <Text mt="3" style={styles.text}>
                If the app was not able to detect your item, upload a picture of
                it so that it can be used to help improve the app.
              </Text>
            </Box>
            {imageIsChosen ? (
              <Button 
              variant="unstyled" 
              onPress={pickImage}>
                <AspectRatio w="100%" ratio={1}>
                <Image
                  style={{ resizeMode: "contain" }}
                  width="100%"
                  height="100%"
                  source={{ uri: image.uri }}
                  alt="chosen image"
                />
              </AspectRatio>
              </Button>
            ) : (
              <Box
                p="1"
                width="100%"
                height="25%"
                rounded="5"
                bg="#FFFFFF"
                style={styles.box}
              >
                <Button
                  onPress={pickImage}
                  variant="unstyled"
                  width="100%"
                  height="100%"
                >
                  <MaterialCommunityIcons
                    name="image-outline"
                    size={50}
                    color="#8A8A8A"
                  />
                </Button>
              </Box>
            )}
            <Box>
              <FormControl isRequired>
                <FormControl.Label mt="4" color="#8A8A8A">
                  Category
                </FormControl.Label>
                <Select
                  bg="#F9F9F9"
                  minWidth="100%"
                  placeholder="Choose Categories"
                  mt="2"
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  {categoriesList.map((value) => {
                    return <Select.Item key={value} label={value} value={value} />;
                  })}
                </Select>
                <Box m="10">
                  <Button onPress={handleSubmit}> Submit </Button>
                    <Center>
                      <AlertDialog
                        leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}
                      >
                        <AlertDialog.Content>
                          <AlertDialog.CloseButton />
                          <AlertDialog.Header>Success</AlertDialog.Header>
                          <AlertDialog.Body>
                            Your image was successfully submitted.
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <Button.Group space={2}>
                              <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={onClose}
                                ref={cancelRef}
                              >
                                Cancel
                              </Button>
                              <Button colorScheme="primary" onPress={onClose}>
                                OK
                              </Button>
                            </Button.Group>
                          </AlertDialog.Footer>
                        </AlertDialog.Content>
                      </AlertDialog>
                    </Center>

                    <Center>
                      <AlertDialog
                        leastDestructiveRef={cancelRef} isOpen={isError} onClose={onClose}
                      >
                        <AlertDialog.Content>
                          <AlertDialog.CloseButton />
                          <AlertDialog.Header>Error</AlertDialog.Header>
                          <AlertDialog.Body>
                            Selected image was not submitted 
                            Please try again later.
                          </AlertDialog.Body>
                          <AlertDialog.Footer>
                            <Button.Group space={2}>
                              <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={onClose}
                                ref={cancelRef}
                              >
                                Cancel
                              </Button>
                              <Button colorScheme="primary" onPress={onClose}>
                                OK
                              </Button>
                            </Button.Group>
                          </AlertDialog.Footer>
                        </AlertDialog.Content>
                      </AlertDialog>
                    </Center>
                </Box>
              </FormControl>
            </Box>
          </VStack>
        </Box>
      </View>
    </NativeBaseProvider>
  );
}
