import * as React from "react";
import { MainContainer } from "./components/MainContainer";
import OnboardingScreen from "./components/OnboardingScreen";
import Service from "./service/service";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    Service.updateApplicationCache()
  });
  
  return (
    <NavigationContainer independent={true}>
      <AppStack.Navigator screenOptions={{headerMode: "false"}}>
        <AppStack.Screen name = "OnboardingScreen" component={OnboardingScreen} />
        <AppStack.Screen name = "MainContainer" component={MainContainer} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
