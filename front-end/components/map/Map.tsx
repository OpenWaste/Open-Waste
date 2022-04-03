import React, { useState, useEffect, useMemo, useRef } from "react";
import {View, Text, Image, FlatList, Pressable, Linking } from "react-native";
import styles from './styles'
import { Heading } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import Service from "../../service/service";
import { Region, Building } from '../../interfaces/service-types'
import { getValueFor } from "../../utils/PersistInfo";
import { NativeBaseProvider, HStack, Button, Icon } from "native-base";
import { SearchBar } from './SearchBar';

export function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 45.494862,
    longitude: -73.57790,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(null);
  const [buildingImages, setBuildingImages] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);
  const [pressed, setPressed] = useState(true);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%','33%', '50%'], []);

  useEffect(() => {
    if (!buildings || buildings.length == 0) {
      getValueFor('buildings').then((buildings) => setBuildings(buildings));
    }
  })

  const openMaps = (parameter: string) => {
    let destination = encodeURI(parameter);
    let url = 'https://www.google.com/maps/dir/?api=1&destination=';
    Linking.openURL(`${url}${destination}`);
  }

  const updateQuery = (input: string) => {
    findBuildings(input);
    setQuery(input);
  }

  const findBuildings = (input: string) => {
    if (input) {
      const regex = new RegExp(`${query.trim()}`, 'gmi');
      setFilteredBuildings(
          buildings.filter((item) => item.building_name.search(regex) >= 0)
      );
    } else {
      setFilteredBuildings([]);
    }
  };

  const markerOnPress = (building: Building) => {
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
        <View style={styles.searchContainer}>
          <SearchBar
            focus={() => setPressed(true)}
            query={updateQuery}
            value={query}   
            placeholder="Find a..."
          />
          {
            pressed
            ? <FlatList
                keyboardShouldPersistTaps='never'
                data={filteredBuildings} keyExtractor={index => index.id.toString()}
                extraData = {query} 
                renderItem = {({ item }) =>
                  <Pressable
                    onPress={() => {markerOnPress(item); setPressed(false)}}
                    style={!pressed ? styles.pressable : null}
                  >
                    <HStack space={2} style={styles.flatList}>
                      <Text style={styles.flatListText}>{item.building_name}</Text>
                      <Text style={styles.flatListAddress}>{item.address}</Text>
                    </HStack>
                  </Pressable>
                }
              />
            : null
          }
        </View>
        <MapView
          ref={mapRef}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
        >
        {buildings.map((building: Building) => {
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
            style={styles.bottomSheet}
          >
            <Heading style={styles.header}>{selectedBuilding.building_name}</Heading>
            <Button
              style={styles.directionsButton}
              onPress={() => openMaps(selectedBuilding.address)}
              leftIcon={<Icon as={MaterialCommunityIcons} name="directions" size="sm" />}>
              Get Directions
            </Button>
          <Text style={styles.text}>{selectedBuilding.address}</Text>
          <BottomSheetScrollView
            horizontal={true}
            style={styles.imageScroll}>
            {buildingImages.map((base64_img:string, index:number) => {
              return <Image
                key={index.toString()}
                source={{uri: base64_img}}
                style={styles.image}/>
            })}
          </BottomSheetScrollView>
          </BottomSheet>
        }
      </View>
    </NativeBaseProvider>
  );
}
