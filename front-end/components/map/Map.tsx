import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from '@gorhom/bottom-sheet'
import Service from "../../service/service";
import { Region, Bin, Building } from '../../interfaces/service-types'
import styles from "./styles";
import { getValueFor } from "../../utils/PersistInfo";

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
  const snapPoints = useMemo(() => ['3%', '33%', '80%'], []);

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
      console.log(resp.data)
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

  return (
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
        <Text>{selectedBin.location_description}</Text>
        </BottomSheet>
      }
    </View>
  );
}
