import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, Image } from "react-native";
import styles from './styles'
import { Heading } from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from '@gorhom/bottom-sheet'
import Service from "../../service/service";
import { Region, Bin, Building } from '../../interfaces/service-types'
import { getValueFor } from "../../utils/PersistInfo";
import { NativeBaseProvider, ScrollView } from "native-base";

export function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 45.494862,
    longitude: -73.57790,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [bins, setBins] = useState<Bin[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBin, setSelectedBin] = useState<Bin>(null);
  const [binImages, setBinImages] = useState([]);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%', '33%'], []);

  useEffect(() => {
    if (!bins || bins.length == 0) {
      getValueFor('bins').then(bins => {
        setBins(bins);
      });
    }
    if (!buildings || buildings.length == 0) {
      getValueFor('buildings').then(buildings => {
        setBuildings(buildings);
      });
    }
  })

  const markerOnPress = (bin:Bin) => {
    setSelectedBin(bin);
    Service.getBinImages(bin.id).then((resp) => {
      setBinImages(resp.data);
    })
    if (bottomSheetRef.current){
      bottomSheetRef.current.snapToIndex(1);
    };
    mapRef.current?.animateToRegion({
      longitude: bin.longitude,
      latitude: bin.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  }

  const getBuildingName = (bid:number) => {
    const building = buildings.find(({id}) => id === bid);
    return building?.building_name;
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
          {bins.map((bin:Bin) => {
            return <Marker
              key={bin.id}
              coordinate={{longitude:bin.longitude, latitude:bin.latitude}}
              onPress={() => markerOnPress(bin)}
            >
              <MaterialCommunityIcons
                name='map-marker'
                size={40}
                color={styles.marker.color}
              />
            </Marker>
          })}
        </MapView>
        {!selectedBin ? null :
          //TODO: Extract this component to potentially be reused
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
          >
          <Heading style={styles.header}>{selectedBin.location_description}</Heading>
          <Text style={styles.text}>{getBuildingName(selectedBin.building_id)}</Text>
          <ScrollView
            horizontal={true}
            style={styles.imageScroll}>
            {binImages.map((base64_img:string, index:number) => {
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
