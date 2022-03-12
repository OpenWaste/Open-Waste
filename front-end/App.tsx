import * as React from "react";
import { MainContainer } from "./components/MainContainer";
import Service from "./service/service";
import "react-native-gesture-handler";
import * as Location from 'expo-location';

export default function App() {
  
  React.useEffect(() => {
    Service.updateApplicationCache()
    Location.requestForegroundPermissionsAsync().then(() => {})
  });

  return <MainContainer />;
}
