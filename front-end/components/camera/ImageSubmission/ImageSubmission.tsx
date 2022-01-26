import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
  NativeBaseProvider,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Service from "../../../service/service";

export function ImageSubmission({ navigation }) {
  const [image, setImage] = useState("");
  const [imageIsChosen, setImageIsChosen] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [statusResponse, setStatusReponse] = React.useState(0);
  const cancelRef = React.useRef(null);

  //Closes modal
  const onClose = () => setIsOpen(false);

  //Opens the camera roll
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!res.cancelled) {
      setImage(res.uri);
      setImageIsChosen(!imageIsChosen);
    }
  };

  //Calls the service to submit using POST
  const handleSubmit = () => {
    Service.submitImageCategory(image, category)
      .then((res) => {
        setStatusReponse(res.status);
        setIsOpen(!isOpen);
        navigation.navigate('displayCamera')
      });
  };

  //Gets list of categories from endpoint
  useEffect(() => {
    if (categoriesList.length == 0) {
      Service.getImageCategory().then((response) => {
        setCategoriesList(response.categories);
      });
    }
  });

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
            <FormControl isRequired>
              <Button
                onPress={pickImage}
                variant="unstyled"
                width="100%"
                height="100%"
                borderColor="#E5E5E5"
                borderWidth="1"
                rounded="15"
                bg="#FFFFFF"
              >
                {
                  imageIsChosen
                  ? (<Image source={{ uri: image }} alt="chosen image" size="xl" />)
                  : (<MaterialCommunityIcons
                    name="image-outline"
                    size={50}
                    color="#8A8A8A"/>)
                }
              </Button>
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
                  return <Select.Item label={value} value={value} />;
                })}
              </Select>
              <Box m="10">
                <Button onPress={handleSubmit}> Submit </Button>
                {
                  statusResponse === 200
                  ? ( <Center>
                    <AlertDialog
                      leastDestructiveRef={cancelRef}
                      isOpen={isOpen}
                      onClose={onClose}
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
                  </Center>)
                  : <></>
                }
              </Box>
            </FormControl>
          </VStack>
        </Box>
      </View>
    </NativeBaseProvider>
  );
}
