import React from 'react';
import { onboardingPages } from "./OnboardingPages";
import Onboarding from 'react-native-onboarding-swiper'; 

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
        onSkip={() => navigation.replace("MainContainer")}
        onDone={() => navigation.replace("MainContainer")}

        pages={onboardingPages}
    />
  );
};

export default OnboardingScreen;

