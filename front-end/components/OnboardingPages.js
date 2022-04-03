import { Image } from 'react-native';
import React from 'react';
import styles from "./styles";

export const onboardingPages = [

    {
        backgroundColor: '#0F968D',
        image: <Image source={require('../assets/digiwaste_icon.png')} style={styles.logo}/>,
        title: 'Welcome to Digitizing Waste!',
        subtitle: 'The app to help sort your waste and help you find locations to dispose of them. Swipe to learn about the features of this app and how to use them.',
    },
    {
        backgroundColor: '#95E0D3',
        image: <Image source={require('../assets/image-recognition-view.png')} style={styles.appMockupImages}/>,
        title: 'Image Recognition',
        subtitle: 'Use the camera view to take a picture of any waste to find out which bin it belongs to. The app will make a prediction about your item (eg. paper, plastic, etc). If the prediction is wrong, you can click on the X button to reject, otherwise, click Next',
    },
    {
        backgroundColor: '#B6E28E',
        image: <Image source={require('../assets/wdr-view.png')} style={styles.appMockupImages}/>,
        title: 'Waste Disposal Recommendation',
        subtitle: 'After the app has made a correct prediction, clicking on the Next button will bring you to this page. It shows you how and where to throw away your item. Not sure how to get to the location? No worries, simply click on the Directions button and you are good to go! ',
    },
    {
        backgroundColor: '#0F968D',
        image: <Image source={require('../assets/image-submission-view.png')} style={styles.appMockupImages}/>,
        title: 'Image Submission',
        subtitle: "The app keeps getting the prediction of your waste wrong? Use the submission feature to upload a picture of your waste and manually categorize it. This will allow the app to learn and improve, so that next time it can properly identify it!",
    },
    {
        backgroundColor: '#95E0D3',
        image: <Image source={require('../assets/map-view.png')} style={styles.appMockupImages}/>,
        title: 'Map',
        subtitle: "Use the map to find waste disposal locations near Concordia. Other basic features include the search bar and Directions to your desired destination.",
    },
    {
        backgroundColor: '#B6E28E',
        image: <Image source={require('../assets/profile-view.png')} style={styles.appMockupImages}/>,
        title: 'Profile',
        subtitle: "Creating a profile is optional, but it will allow you to keep track of the number of image submission you have made and the number of submissions accepted!",
    },
    {
        backgroundColor: '#95E0D3',
        image: <Image source={require('../assets/settings-view.png')} style={styles.appMockupImages}/>,
        title: 'Settings',
        subtitle: "Customize your language preference (EN/FR) by navigating to the Settings page. Or simply click on About Us to learn about the people behind this app's creation!",
    },
    {
        backgroundColor: '#0F968D',
        image: <Image source={require('../assets/smartphone.png')} style={styles.logo}/>,
        title: 'Have fun!',
        subtitle: "You are all set! Now, you are one step closer towards your sustainability journey and helping the environment!",
    },

]