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
  Spinner,
  NativeBaseProvider,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Service from "../../service/service";
import { getValueFor, save } from "../../utils/PersistInfo";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

// To ignore color scheme warnings given for dropdown color
import { LogBox } from "react-native";
LogBox.ignoreLogs(["NativeBase: The contrast ratio of 1:1"]);

export function ImageSubmission() {
  const [image, setImage] = useState("");
  const [imageIsChosen, setImageIsChosen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClose = () => {
    setIsOpen(false),setIsError(false),setIsLoading(false);
  };

  //Opens the camera roll
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
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
  const handleSubmit = () => {
    setIsLoading(true);
    manipulateAsync(image.uri,[],{ compress: 1, format: SaveFormat.JPEG, base64: true })
    .then((res)=>{
        Service.submitImageCategory(res.base64, category)
        .then(() => {
          setIsOpen(!isOpen);
          setImageIsChosen(false);
          setCategory("");
  
          getValueFor("email").then(a => {
            getValueFor("submitted_images").then(a=> {
              save("submitted_images", +a + 1);
            }).catch(() => {
              save("submitted_images", 1)
            })
          }).catch()
        })
        .catch((e) => {
          setIsError(!isError);
        });
    }).catch((e) => {
      setIsError(!isError);
    });
    
  };

  //Gets list of categories from endpoint
  useEffect(() => {
    if (categoriesList.length == 0) {
      getValueFor("categories").then((a) => {
        setCategoriesList(a);
      });
    }
  });

  return (
    <NativeBaseProvider>
      <ImageSubmissionView
        image={image}
        setImage={setImage}
        imageIsChosen={imageIsChosen}
        setImageIsChosen={setImageIsChosen}
        categoriesList={categoriesList}
        setCategoriesList={setCategoriesList}
        category={category}
        setCategory={setCategory}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isError={isError}
        setIsError={setIsError}
        onClose={onClose}
        pickImage={pickImage}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </NativeBaseProvider>
  );
}

export const ImageSubmissionView = (prop) => {
  const cancelRef = React.useRef(null);

  return (
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
          {prop.imageIsChosen ? (
            <Button variant="unstyled" onPress={prop.pickImage}>
              <AspectRatio w="100%" ratio={1}>
                <Image
                  testID = "ImageButton"
                  style={{ resizeMode: "contain" }}
                  width="100%"
                  height="100%"
                  source={{ uri: prop.image.uri }}
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
                testID = "ImageIconButton"
                onPress={prop.pickImage}
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
                selectedValue={prop.category}
                onValueChange={(itemValue) => prop.setCategory(itemValue)}
              >
                {prop.categoriesList.map((value) => {
                  return (
                    <Select.Item key={value} label={value} value={value} />
                  );
                })}
              </Select>
              <Box m="10">               
                <Button isLoading={prop.isLoading} isLoadingText="Submitting" _loading={{
                bg: "primary.500"}}
                onPress={prop.handleSubmit}>Submit</Button>
                <Center>
                  <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={prop.isOpen}
                    onClose={prop.onClose}
                  >
                    <AlertDialog.Content>
                      <AlertDialog.Header>Success</AlertDialog.Header>
                      <AlertDialog.Body>
                        Your image was successfully submitted.
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button testID = "SuccessAlert"
                            onPress={prop.onClose}
                            ref={cancelRef}
                          >
                            Ok
                          </Button>
                        </Button.Group>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog>
                </Center>
                <Center>
                  <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={prop.isError}
                    onClose={prop.onClose}
                  >
                    <AlertDialog.Content>
                      <AlertDialog.Header>Error</AlertDialog.Header>
                      <AlertDialog.Body>
                        Selected image was not submitted Please try again later.
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button testID = "ErrorAlert"
                            onPress={prop.onClose}
                            ref={prop.cancelRef}
                          >
                            Ok
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
  );
};
