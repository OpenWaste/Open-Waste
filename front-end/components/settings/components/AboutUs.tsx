import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import style from "./styles/AboutUs";
import { NativeBaseProvider } from "native-base";
import { Linking } from 'react-native';


export class AboutUs extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView style={style.container}>
        {/* <Text style={style.headerStyle}>flexDirection: 'row-reverse'</Text> */}
        {/* <View style={[{flexDirection:'column'}, style.elementsContainer]}> */}
          <View style={{marginLeft: 20, marginRight: 20, borderRadius: 5, backgroundColor: 'white'}}>
          <Image source={require("../../../assets/digitizingWaste.png")} style = {{ resizeMode: 'contain', flex: 1, width: 335 , marginTop: -35, marginBottom: -35}}/>
          <Text style={style.text}>Digitizing Waste is an open collaboration based out of Concordia University, in Montreal, Canada, that aims to accelerate adoption of circular economy through data-driven tools. </Text>
          <Text style={style.text}>Our waste sorting app was developed by a group of capstone students (list of student or should we just put our group name?) in SOEN 490 with the supervision of members of CP3 and ZWC. </Text>
          </View>
          <View style={{height: 500, margin: 10, borderRadius: 5, backgroundColor: '#FAA030'}} />
          <View style={{height: 50, margin: 10, borderRadius: 5, backgroundColor: '#32B76C'}} />
        {/* </View> */}
      </ScrollView>
      </NativeBaseProvider>
    );
  }
}
