import { Image, StyleSheet } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper'; 

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
        onSkip={() => navigation.replace("MainContainer")}
        onDone={() => navigation.replace("MainContainer")}

        pages={[
            {
                backgroundColor: '#0F968D',
                image: <Image source={require('../assets/earth.png')} style={styles.onboardingImg}/>,
                title: 'Welcome!',
                subtitle: 'Swipe to learn about the features of this app and how to use them.',
            },
            {
                backgroundColor: '#95E0D3',
                image: <Image source={require('../assets/image-recognition-view.png')} style={styles.onboardingImg}/>,
                title: 'Image Recognition',
                subtitle: 'Use the camera view to take a picture of any waste to find out which bin it belongs to. The app will make a prediction about your item (eg. paper, plastic, etc). If the prediction is wrong, you can click on the X button to reject, otherwise, click Next',
            },
            {
                backgroundColor: '#B6E28E',
                image: <Image source={require('../assets/image-submission-view.png')} style={styles.onboardingImg}/>,
                title: 'Image Submission',
                subtitle: "The app keeps getting the prediction of your waste wrong? Use the submission feature to upload a picture of your waste and manually categorize it. This will allow the app to learn and improve!",
            },
            {
                backgroundColor: '#0F968D',
                image: <Image source={require('../assets/map-view.png')} style={styles.onboardingImg}/>,
                title: 'Map',
                subtitle: "Use the map to find waste disposal locations near you or anywhere. Other basic features include filters and Directions.",
            },
            {
                backgroundColor: '#95E0D3',
                image: <Image source={require('../assets/profile-view.png')} style={styles.onboardingImg}/>,
                title: 'Profile',
                subtitle: "Creating a profile is optional, but it will allow you to keep track of the number of image submission you have made and the number of submissions accepted!",
            },
            {
                backgroundColor: '#B6E28E',
                image: <Image source={require('../assets/settings-view.png')} style={styles.onboardingImg}/>,
                title: 'Settings',
                subtitle: "Customize your privacy and language preference by navigating to the Settings page. Or simply click on About Us to learn about the people behind this app's creation!",
            },
            {
                backgroundColor: '#0F968D',
                image: <Image source={require('../assets/smartphone.png')} style={styles.onboardingImg}/>,
                title: 'Have fun!',
                subtitle: "You are all set! You are one step closer to helping the environment!",
            },
        ]}
    />
  );
  
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    onboardingImg: {
        width: "50%",
        height: "50%",
        padding: "40%",
        margin: "-15%",    
        resizeMode: "contain",
    },
});

