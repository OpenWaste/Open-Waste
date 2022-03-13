import React from "react";
import { ScrollView, View, Text, Image, TouchableHighlight } from "react-native";
import style from "./styles/AboutUs";
import { NativeBaseProvider } from "native-base";
import { Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';


export class AboutUs extends React.Component {

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView style={style.container}>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/digitizingWaste.png")} style = { style.logo1 }/>
            <Text style={style.text}>Digitizing Waste is an open collaboration based out of Concordia University, in Montreal, Canada, that aims to accelerate adoption of circular economy through data-driven tools. </Text>
            <Text style={style.text}>Our waste sorting app was developed by a group of capstone students in SOEN 490 with the supervision of members of CP3 and ZWC. </Text>
          </View>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/CP3.png")} style = { style.logo2 }/>
            <Text style={style.textHeader}>Concordia Precious Plastic Project </Text>
            <Text style={style.text}>CP3 is a multi-disciplinary student-led initiative supporting 
            Concordia University’s plastic waste management by recycling plastic 
            on-site and raising awareness of the plastic crisis. 
            We are a group of students across all four faculties united by the goal of protecting the environment and giving plastic waste a new life. </Text>
          </View>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/zeroWaste.png")} style = { style.logo2 }/>
            <Text style={style.textHeader}>Zero Waste Concordia </Text>
            <Text style={style.text}>Our mission is to divert and reduce as much waste on campus away from landfill, and instead reduce, reuse, recycle and rot.  </Text>
          </View>
          <View style={style.viewMain}>
            <Text style={style.textHeader}>Contact Us </Text>
            <View style={ style.viewMain2 }>
              <View style={ style.viewSub1 } >
                <TouchableHighlight onPress={() => Linking.openURL('mailto:cp3@concordia.ca')}>
                  <Image source={require("../../../assets/mail.png")} style = { style.image1 }>
                  </Image>
                </TouchableHighlight>
              </View>
              <View style={ style.viewSub2 } >
                <Text style={style.links} onPress={() => Linking.openURL('mailto:cp3@concordia.ca') }
                title="cp3@concordia.ca"> cp3@concordia.ca </Text>
              </View>
            </View>
            <View style={ style.viewMain2 }>
              <View style={ style.viewSub1 } >
                <TouchableHighlight onPress={() => Linking.openURL('mailto:zerowaste@concordia.ca')}>
                  <Image source={require("../../../assets/mail.png")} style = { style.image1 }>
                  </Image>
                </TouchableHighlight>
              </View>
              <View style={ style.viewSub2 } >
                <Text style={style.links} onPress={() => Linking.openURL('mailto:zerowaste@concordia.ca') }
                title="zerowaste@concordia.ca"> zerowaste@concordia.ca </Text>
              </View>
            </View>
          </View>

          <View style={style.viewMain}>
            <Text style={style.textHeader}>Social Media </Text>
            <View style={ style.viewMain2 }>
              <View style={ style.viewSub2 } >
                <Text style={style.links} onPress={() => Clipboard.setString('cp3@concordia.ca')}
                title="cp3@concordia.ca"> cp3@concordia.ca </Text>
              </View>
              <View style={ style.viewSub2 } >
                <Text style={style.links} onPress={() => Clipboard.setString('zerowaste@concordia.ca')}
                title="zerowaste@concordia.ca"> zerowaste@concordia.ca </Text>
              </View>
            </View>
            
            <View style={ style.viewMain2 }>
              <View style={ style.viewMain2 }>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.facebook.com/CP3Concordia/')}>
                  <Image source={require("../../../assets/facebook.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.instagram.com/cp3concordia/?hl=en')}>
                  <Image source={require("../../../assets/instagram.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.cp3montreal.com/')}>
                  <Image source={require("../../../assets/web.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={ style.viewMain3 }>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.facebook.com/zerowasteconcordia/')}>
                  <Image source={require("../../../assets/facebook.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.instagram.com/zerowasteconcordia/?hl=en')}>
                  <Image source={require("../../../assets/instagram.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight onPress={() => Linking.openURL('https://www.concordia.ca/about/sustainability/sustainability-initiatives/zero-waste.html?utm_source=vanity&utm_campaign=zerowaste')}>
                  <Image source={require("../../../assets/web.png")} style = { style.image2 }>
                  </Image>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={style.text}>
            We are grateful for your contributions to this project! By testing the app and submitting your waste images, you are helping to train our algorithm that we hope will demystify waste sorting around the planet.  
            </Text>
          </View>
          <View>
            <Text style={style.text}>
            Want to contribute to the development of this project and other smart waste initiatives? {"\n"}
            Contact us at:
            </Text>
          </View>
          <View style={ style.viewMain2 }>
              <View style={ style.viewSub1 } >
              <TouchableHighlight onPress={() => Linking.openURL('mailto:zerowaste@concordia.ca')}>
                <Image source={require("../../../assets/mail.png")} style = {{width: 25, height: 15, flex: 1, marginLeft: 40}}>
                </Image>
              </TouchableHighlight>
              </View>
              <View style={ style.viewSub3 } >
                <Text style={style.links} onPress={() => Linking.openURL('mailto:zerowaste@concordia.ca') }
                title="zerowaste@concordia.ca"> zerowaste@concordia.ca</Text>
              </View>
            </View>
      </ScrollView>
      </NativeBaseProvider>
    );
  }
}
