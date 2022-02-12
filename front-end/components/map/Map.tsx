import React, { Component } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles";

interface Region {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
}

export class Map extends Component<{}, {region: Region}> {
  constructor(props:any) {
    super(props);
    this.state = {
      region: {
        latitude: 45.494862,
        longitude: -73.57790,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    };
  }
  // TODO: set initial state of region to current location
  // componentDidMount() {}
  
  onRegionChange = (region:Region) => {
    (this.state.region as Region) = region
  }

  render() {
    return (
      <View>
        <MapView
          region={this.state.region}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}
