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
import i18next from '../../Translate';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export function ImageSubmission() {
  const [image, setImage] = useState("");
  const [imageIsChosen, setImageIsChosen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        submitImageCategory={submitImageCategory}
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
              {i18next.t("ImageSubmission")}
            </Heading>
            <Text mt="3" style={styles.text}>
              {i18next.t("ImageSubmissionText")}
            </Text>
          </Box>
          {prop.imageIsChosen ? (
            <Button
              testID="ImageIconButton"
              variant="unstyled"
              onPress={() =>
                pickImage(
                  prop.setImage,
                  prop.setImageIsChosen,
                  prop.imageIsChosen
                )
              }
            >
              <AspectRatio w="100%" ratio={1}>
                <Image
                  testID="ImageButton"
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
                testID="IconButton"
                onPress={() =>
                  pickImage(
                    prop.setImage,
                    prop.setImageIsChosen,
                    prop.imageIsChosen
                  )
                }
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
                {i18next.t("Category")}
              </FormControl.Label>
              <Select
                bg="#F9F9F9"
                minWidth="100%"
                placeholder={i18next.t("ChooseCategories")}
                mt="2"
                selectedValue={prop.category}
                onValueChange={(itemValue) => prop.setCategory(itemValue)}
              >
                {prop.categoriesList.map((value) => {
                  return (
                    <Select.Item key={value} label={i18next.t(value)} value={value} />
                  );
                })}
              </Select>
              <Box m="10">
                <Button
                  testID="SubmitButton"
                  isLoading={prop.isLoading}
                  isLoadingText="Submitting"
                  _loading={{
                    bg: "primary.500",
                  }}
                  onPress={() =>
                    handleSubmit(
                      prop.setIsLoading,
                      prop.setIsOpen,
                      prop.isOpen,
                      prop.setIsError,
                      prop.setImageIsChosen,
                      prop.setCategory,
                      prop.image,
                      prop.category,
                      prop.submitImageCategory
                    )
                  }
                >
                  {i18next.t("Submit")}
                </Button>
                <Center>
                  <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={prop.isOpen}
                  >
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        {i18next.t("Success")}
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        {i18next.t("YourImageWasSuccess")}
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button
                            testID="SuccessAlert"
                            onPress={() =>
                              onClose(
                                prop.setIsOpen,
                                prop.setIsError,
                                prop.setIsLoading
                              )
                            }
                            ref={cancelRef}
                          >
                            OK
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
                  >
                    <AlertDialog.Content>
                      <AlertDialog.Header>
                        {i18next.t("Error")}
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        {i18next.t("YourImageWasFail")}
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button
                            testID="ErrorAlert"
                            onPress={() =>
                              onClose(
                                prop.setIsOpen,
                                prop.setIsError,
                                prop.setIsLoading
                              )
                            }
                            ref={prop.cancelRef}
                          >
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
  );
};

//Calls the service to submit using POST
export const handleSubmit = async (
  setIsLoading,
  setIsOpen,
  isOpen,
  setIsError,
  setImageIsChosen,
  setCategory,
  image,
  category,
  submitImageCategory
) => {
  setIsLoading(true);
  try {
    await submitImageCategory(image, category);
    setIsOpen(!isOpen);
    setImageIsChosen(false);
    setCategory("");
    updateSubmittedImage();
  } catch {
    setIsError(true);
  }
};

export const submitImageCategory = async (image, category) => {
  let convertedImage = await manipulateAsync(image.uri, [], {
    compress: 1,
    format: SaveFormat.JPEG,
    base64: true,
  });
  let response = await Service.submitImageCategory(
    convertedImage.base64,
    category
  );

  if (response == undefined) throw new Error("Error");
};

const updateSubmittedImage = async () => {
  let email = await getValueFor("email").catch(() => {});
  if (email != undefined) {
    let numberOfSubmittedImages = await getValueFor("submitted_images").catch(
      () => save("submitted_images", 1)
    );
    save("submitted_images", +numberOfSubmittedImages + 1);
  }
};

//Opens the camera roll
export const pickImage = async (setImage, setImageIsChosen, imageIsChosen) => {
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

export const onClose = (setIsOpen, setIsError, setIsLoading) => {
  setIsOpen(false), setIsError(false), setIsLoading(false);
};
