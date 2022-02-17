import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

  useEffect(() => {
    if (!bins || bins.length == 0) {
      getValueFor('bins').then(bins => {
        setBins(bins);
      })
    }
    if (!buildings || buildings.length == 0) {
      getValueFor('buildings').then(buildings => {
        setBuildings(buildings);
      })
    }
  })

  return (
    <View>
      <MapView
        region={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        {bins.map(bin => {
          return <Marker
            key={bin.id}
            coordinate={{longitude:bin.longitude, latitude:bin.latitude}}
          >
            <MaterialCommunityIcons
              name='map-marker'
              size={40}
              color={styles.marker.color}
            />
          </Marker>
        })}
      </MapView>
    </View>
  );
}
