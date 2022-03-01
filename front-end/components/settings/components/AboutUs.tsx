import React from "react";
import { ScrollView, View, Text, Image, Button } from "react-native";
import style from "./styles/AboutUs";
import { NativeBaseProvider } from "native-base";
import { Linking } from 'react-native';


export class AboutUs extends React.Component {
  img = require("../../../assets/mailbox.png");

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView style={style.container}>
          <View style={{marginTop: 10, marginBottom: 10,marginLeft: 20, marginRight: 20, borderRadius: 5, backgroundColor: 'white'}}>
            <Image source={require("../../../assets/digitizingWaste.png")} style = {{ resizeMode: 'contain', flex: 1, width: 335 , marginTop: -37, marginBottom: -35}}/>
            <Text style={style.text}>Digitizing Waste is an open collaboration based out of Concordia University, in Montreal, Canada, that aims to accelerate adoption of circular economy through data-driven tools. </Text>
            <Text style={style.text}>Our waste sorting app was developed by a group of capstone students (list of student or should we just put our group name?) in SOEN 490 with the supervision of members of CP3 and ZWC. </Text>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20, borderRadius: 5, backgroundColor: 'white'}}>
            <Image source={require("../../../assets/CP3.png")} style = {{ resizeMode: 'center', flex: 1, width: 335 , marginTop: -35, marginBottom: -35, height: 150}}/>
            <Text style={style.textHeader}>Concordia Precious Plastic Project </Text>
            <Text style={style.text}>CP3 is a multi-disciplinary student-led initiative supporting 
Concordia University’s plastic waste management by recycling plastic 
on-site and raising awareness of the plastic crisis. 
We are a group of students across all four faculties united by the goal of protecting the environment and giving plastic waste a new life. </Text>
          </View>
          <View style={{marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20, borderRadius: 5, backgroundColor: 'white'}}>
            <Image source={require("../../../assets/zeroWaste.png")} style = {{ resizeMode: 'center', flex: 1, width: 335 , marginTop: -35, marginBottom: -35, height: 150}}/>
            <Text style={style.textHeader}>Zero Waste Concordia </Text>
            <Text style={style.text}>Our mission is to divert and reduce as much waste on campus away from landfill, and instead reduce, reuse, recycle and rot.  </Text>
          </View>
          <Button onPress={() => Linking.openURL('mailto:support@example.com') }
      title="support@example.com" />
      </ScrollView>
      </NativeBaseProvider>
    );
  }
}
