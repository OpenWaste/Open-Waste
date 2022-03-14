import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, Image } from "react-native";
import styles from './styles'
import { Heading } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ExpoLocation from 'expo-location'
import BottomSheet from '@gorhom/bottom-sheet'
import Service from "../../service/service";
import { Region, Building } from '../../interfaces/service-types'
import { getValueFor } from "../../utils/PersistInfo";
import { NativeBaseProvider, ScrollView } from "native-base";

export function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 45.494862,
    longitude: -73.57790,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [currentPosition, setCurrentPosition] = useState<Object>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(null);
  const [buildingImages, setBuildingImages] = useState([]);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%', '33%'], []);

  useEffect(() => {
    if (!buildings || buildings.length == 0) {
      getValueFor('buildings').then(buildings => {
        setBuildings(buildings);
      });
    }

    ExpoLocation.getCurrentPositionAsync().then( (position) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  })

  const markerOnPress = (building:Building) => {
    setSelectedBuilding(building);
    Service.getBuildingImages(building.id).then((resp) => {
      setBuildingImages(resp.data);
    })
    if (bottomSheetRef.current){
      bottomSheetRef.current.snapToIndex(1);
    };
    mapRef.current?.animateToRegion({
      longitude: building.longitude,
      latitude: building.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }

  return (
    <NativeBaseProvider>
      <View>
        <MapView
          ref={mapRef}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          {currentPosition ?
            <Marker
              key='user'
              coordinate={currentPosition}
            >
              <MaterialCommunityIcons 
                name='account-circle'
                size={40}
                style={styles.user}
              />
            </Marker> : null
          }
          {buildings.map((building:Building) => {
            return <Marker
              key={building.id}
              coordinate={{longitude:building.longitude, latitude:building.latitude}}
              onPress={() => markerOnPress(building)}
            >
              <MaterialCommunityIcons
                name='map-marker'
                size={40}
                color={styles.marker.color}
              />
            </Marker>
          })}
        </MapView>
        {!selectedBuilding ? null :
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
          >
          <Heading style={styles.header}>{selectedBuilding.building_name}</Heading>
          <Text style={styles.text}>{selectedBuilding.address}</Text>
          <ScrollView
            horizontal={true}
            style={styles.imageScroll}>
            {buildingImages.map((base64_img:string, index:number) => {
              return <Image
                key={index.toString()}
                source={{uri: `data:image/png;base64,${base64_img}`}}
                style={styles.image}/>
            })}
          </ScrollView>
          </BottomSheet>
        }
      </View>
    </NativeBaseProvider>
  );
}
