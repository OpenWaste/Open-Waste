import * as React from "react";
import { MainContainer } from "./components/MainContainer";
import Service from "./service/service";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./components/OnboardingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    Service.updateApplicationCache()
  });

  // Allows to 'remember' if you are a first time user; If yes, show the onboarding screen, else do not show.
  const [isFirstLaunch, setIsFirstLauch] = React.useState(null); 

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
  }, []);

  if(isFirstLaunch == null) {
    return null;
  }
  else if (isFirstLaunch == true) { // First time user.
    return (
      <NavigationContainer independent={true}>
        <AppStack.Navigator screenOptions={{headerMode: "false"}}>
          <AppStack.Screen name = "OnboardingScreen" component={OnboardingScreen} />
          <AppStack.Screen name = "MainContainer" component={MainContainer} />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
  else { // Returning user.
    return <MainContainer />
  }
}

export default App;
