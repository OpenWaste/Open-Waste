import * as React from "react";
import { MainContainer } from "./components/MainContainer";
import { MainContainerFR } from "./components/MainContainerFR";
import Service from "./service/service";
import "react-native-gesture-handler";
import * as Location from 'expo-location';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./components/OnboardingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValueFor } from './utils/PersistInfo';

const AppStack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    Service.updateApplicationCache()
    Location.requestForegroundPermissionsAsync().then(() => {})
  });

  // Allows to 'remember' if you are a first time user; If yes, show the onboarding screen, else do not show.
  const [isFirstLaunch, setIsFirstLauch] = React.useState(false); 
  const [LanguageIsFrench, setIsFrench] = React.useState(false); 

  React.useEffect(() => {
    AsyncStorage.getItem('AlreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('AlreadyLaunched', 'true');
        setIsFirstLauch(true);
      }
      else {
        setIsFirstLauch(false);
      }
    });
    // set language to french on startup if the app was set to french previously
    getValueFor('language').then((output) => {
        if(output == 'fr') {
          setIsFrench(true);
      }
      else {
        setIsFrench(false);
      }
    });
  }, []);

  if (isFirstLaunch) { // First time user.
    return (
      <NavigationContainer independent={true}>
        <AppStack.Navigator screenOptions={{headerMode: "false"}}>
          <AppStack.Screen name = "OnboardingScreen" component={OnboardingScreen} />
          <AppStack.Screen name = "MainContainer" component={MainContainer} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
  else if (LanguageIsFrench){
    return <MainContainerFR />
  }
  else {
    return <MainContainer />
  }
}

export default App;
