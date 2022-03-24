import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "./styles";
import { Button, NativeBaseProvider } from "native-base";
import Service from "../../service/service";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  MapModalProperties,
  CameraTriggerButtonProperties,
  PredictionTextProperties,
  PostPictureSnapButtonsProperties,
  CameraViewProperties,
  PicturePreviewProperties,
  MapBottomSheetProperties,
  BinWithImage,
} from "../../interfaces/camera-types";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  Building,
  CategoryInstruction,
  Bin,
} from "../../interfaces/service-types";
import * as ExpoLocation from "expo-location";
import { getValueFor } from "../../utils/PersistInfo";

export default function DisplayCamera() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState<string>("");
  const [picTaken, setPicTaken] = useState(false);
  const [picURI, setPicURI] = useState("");
  const [camera, setCameraInstance] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  if (isFocused) {
    return (
      <NativeBaseProvider>
        <CameraView
          isPictureTaken={picTaken}
          predictionString={modalText}
          modalVisibility={modalVisible}
          cameraInstance={camera}
          pictureURI={picURI}
          cameraInstanceSetter={setCameraInstance}
          modalVisibilitySetter={setModalVisible}
          isPictureTakenSetter={setPicTaken}
          predictionTextSetter={setModalText}
          uriSetter={setPicURI}
        />
      </NativeBaseProvider>
    );
  }
  return <View />;
}

export const CameraView = (props: CameraViewProperties) => {
  return (
    <View style={style.fullScreenView}>
      {props.isPictureTaken ? (
        <>
          <PicturePreview pictureURI={props.pictureURI} />
          <PredictionText predictionString={props.predictionString} />
        </>
      ) : (
        <Camera
          testID="cv-camera-component"
          ratio={"16:9"}
          style={style.fullScreenView}
          type={Camera.Constants.Type.back}
          ref={(r: any) => props.cameraInstanceSetter(r)}
        />
      )}

      <View style={style.footer}>
        <MapModal
          category={props.predictionString}
          currentVisibilty={props.modalVisibility}
          visibilitySetter={props.modalVisibilitySetter}
        />
        {!props.isPictureTaken ? (
          <CameraTriggerButton
            camera={props.cameraInstance}
            uriSetter={props.uriSetter}
            isPictureTakenSetter={props.isPictureTakenSetter}
            predictionTextSetter={props.predictionTextSetter}
            predictionFetcher={Service.submitImagePrediction}
          />
        ) : (
          <></>
        )}
        {props.isPictureTaken && props.predictionString.length > 0 ? (
          <PostPictureSnapButtons
            uriSetter={props.uriSetter}
            isPictureTakenSetter={props.isPictureTakenSetter}
            predictionTextSetter={props.predictionTextSetter}
            visibilitySetter={props.modalVisibilitySetter}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export const PicturePreview = (props: PicturePreviewProperties) => {
  return (
    <Image
      testID="pic-preview"
      style={style.fullScreenView}
      source={{ uri: props.pictureURI }}
    />
  );
};

// Represents the modal that contains a google map view
export const MapModal = (props: MapModalProperties) => {
  const [instruction, setInstruction] = useState<string>();
  const [closestBuilding, setClosestBuilding] = useState<Building>();
  const [bins, setBins] = useState<Bin[]>();
  const mapRef = useRef<MapView>(null);
  const INSTRUCTION_SEPARATOR = ";";

  if (props.category.length > 0 && instruction == undefined) {
    getValueFor("category_instructions").then((val) => {
      const categoryInstructions = val as CategoryInstruction[];

      let rawInstructions = categoryInstructions.filter(
        (el) => el.category_name == props.category
      )[0].instruction;
      let processedInstructions = "";
      rawInstructions.split(INSTRUCTION_SEPARATOR).forEach((step, index) => {
        if (step.length > 0)
          processedInstructions += index + 1 + ". " + step + "\n";
      });
      setInstruction(processedInstructions);
    });
  }

  if (closestBuilding == undefined) {
    getValueFor("buildings").then((val) => {
      var buildings = val as Building[];

      ExpoLocation.getCurrentPositionAsync().then((position) => {
        let closestBuildingVar: Building;
        let closestBuildingDistance: number;

        buildings.forEach((building, index) => {
          if (index == 0) {
            closestBuildingVar = building;
            closestBuildingDistance = distance(
              building.latitude,
              building.longitude,
              position.coords.latitude,
              position.coords.longitude
            );
          } else {
            let newDistance = distance(
              building.latitude,
              building.longitude,
              position.coords.latitude,
              position.coords.longitude
            );
            if (newDistance > closestBuildingDistance) {
              closestBuildingDistance = newDistance;
              closestBuildingVar = building;
            }
          }
        });
        setClosestBuilding(closestBuildingVar);
      });
    });
  }

  if (bins == undefined && closestBuilding != undefined) {
    getValueFor("bins").then((val) => {
      const allBins = val as Bin[];

      let nearestBuildingBins = allBins.filter(
        (bin) => bin.building_id == closestBuilding.id
      );
      setBins(nearestBuildingBins);
    });
  }

  return (
    <Modal
      testID="map-modal"
      animationType="slide"
      transparent={true}
      visible={props.currentVisibilty}
      onRequestClose={() => {
        props.visibilitySetter(false);
      }}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <MaterialIcons
            testID="modal-close"
            style={style.modalCloseButton}
            name="cancel"
            size={30}
            onPress={() => props.visibilitySetter(false)}
          />
          <MapView
            ref={mapRef}
            style={style.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={false}
            onMapReady={() => {
              if (closestBuilding != undefined)
                mapRef.current?.animateToRegion(
                  {
                    latitude: closestBuilding?.latitude,
                    longitude: closestBuilding?.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  },
                  1000
                );
            }}
            initialRegion={{
              latitude: 45.494862,
              longitude: -73.5779,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {closestBuilding != undefined ? (
              <Marker
                key={closestBuilding.id}
                coordinate={{
                  longitude: closestBuilding.longitude,
                  latitude: closestBuilding.latitude,
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={55}
                  style={{ color: "red" }}
                />
              </Marker>
            ) : (
              <></>
            )}
          </MapView>
          <MapBottomSheet
            category={props.category}
            instruction={instruction}
            closestBuilding={closestBuilding}
            bins={bins}
          />
        </View>
      </View>
    </Modal>
  );
};

export const MapBottomSheet = (props: MapBottomSheetProperties) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [binWithImages, setBinWithImages] = useState<BinWithImage[]>();

  if (binWithImages == undefined) {
    let binImagesArray = [];
    props.bins?.forEach((bin, idx) => {
      Service.getBinImages(bin.id).then((r) => {
        binImagesArray.push({ bin: bin, imageBase64: r.data[0] });
        if (idx == props.bins?.length - 1) {
          setBinWithImages(binImagesArray);
        }
      });
    });
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      handleComponent={() => <></>}
    >
      {bottomSheetVisible ? (
        <MaterialCommunityIcons
          style={style.bottomSheetCloseButton}
          name="chevron-down"
          size={40}
          onPress={() => {
            bottomSheetRef.current?.collapse();
            setBottomSheetVisible(false);
          }}
        />
      ) : (
        <MaterialCommunityIcons
          style={style.bottomSheetCloseButton}
          name="chevron-up"
          size={40}
          onPress={() => {
            bottomSheetRef.current?.expand();
            setBottomSheetVisible(true);
          }}
        />
      )}
      <ScrollView>
        <View style={style.bottomSheetViewStyle}>
          <Text>
            <Text style={style.bottomSheetHeaderText}>Category:</Text>{" "}
            <Text style={style.bottomSheetContentText}>
              {" "}
              {props.category + "\n"}{" "}
            </Text>
          </Text>

          {props.instruction != undefined ? (
            <Text testID="instruction-text">
              <Text style={style.bottomSheetHeaderText}>Disposal Method</Text>
              <Text style={style.bottomSheetContentText}>
                {" "}
                {"\n" + props.instruction}
              </Text>
            </Text>
          ) : (
            <></>
          )}

          <>
            <Text style={style.bottomSheetHeaderText}>
              {props.closestBuilding?.building_name} - {props.bins?.length} Bins
            </Text>
          </>

          {binWithImages?.map((binWithImage: BinWithImage) => {
            return (
              <>
                <View style={style.verticallyAlignedView}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={25}
                    style={{ color: "red" }}
                  />
                  <Text style={style.bottomSheetContentText}>
                    {binWithImage.bin.location_name} - Floor{" "}
                    {binWithImage.bin.floor_number}
                  </Text>
                </View>
                <Image
                  source={{ uri: binWithImage.imageBase64 }}
                  style={style.imageBin}
                  resizeMode="contain"
                />
              </>
            );
          })}
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// Camera trigger button: displayed only before a picture is taken
export const CameraTriggerButton = (props: CameraTriggerButtonProperties) => {
  return (
    <TouchableHighlight
      testID="camera-snap-btn"
      activeOpacity={0.6}
      underlayColor={"transparent"}
      onPress={() => {
        props.camera.takePictureAsync({ base64: true }).then((picture) => {
          props.uriSetter(picture.uri);
          props.isPictureTakenSetter(true);
          props.predictionFetcher(picture.base64).then((response) => {
            props.predictionTextSetter(response.prediction);
          });
        });
      }}
    >
      <MaterialCommunityIcons name="circle-slice-8" size={60} color="#FFFFFF" />
    </TouchableHighlight>
  );
};

/**
 * It renders the prediction text.
 * @param {PredictionTextProperties} props - PredictionTextProperties
 * @returns The `PredictionText` component is being returned. It is a functional component that takes
 * in a `predictionString` prop and returns a view with a text component that displays the prediction
 * string.
 */
export const PredictionText = (props: PredictionTextProperties) => {
  return (
    <View style={style.predictionTextContainer}>
      {props.predictionString.length > 0 ? (
        <Text testID="prediction-text" style={style.predictionText}>
          {props.predictionString}
        </Text>
      ) : (
        <ActivityIndicator
          testID="spinner-component"
          size={100}
          color="#95E0D3"
        />
      )}
    </View>
  );
};

// Buttons rendered after a picture has been taken AND a prediction was returned
// This includes the CANCEL and NEXT button. The latter of which triggers the MapModal
export const PostPictureSnapButtons = (
  props: PostPictureSnapButtonsProperties
) => {
  return (
    <>
      <TouchableHighlight
        testID="cancel-btn"
        activeOpacity={0.6}
        underlayColor={"transparent"}
        onPress={() => {
          props.isPictureTakenSetter(false);
          props.uriSetter("");
          props.predictionTextSetter("");
        }}
      >
        <MaterialIcons name="cancel" size={60} color="#EA4335" />
      </TouchableHighlight>
      <Button
        testID="next-btn"
        style={style.nextButton}
        onPress={() => {
          props.visibilitySetter(true);
        }}
      >
        Next
      </Button>
    </>
  );
};
