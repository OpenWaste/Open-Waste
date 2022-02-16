import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getValueFor } from "../../utils/PersistInfo";
import styles from "./styles";

export function Map() {
  const [region, setRegion] = useState({
    latitude: 45.494862,
    longitude: -73.57790,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [bins, setBins] = useState([]);
  const [buildings, setBuildings] = useState([]);

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
      />
    </View>
  );
}
