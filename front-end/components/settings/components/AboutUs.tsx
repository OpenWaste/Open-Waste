import React from "react";
import { ScrollView, View, Text, Image, TouchableHighlight } from "react-native";
import style from "./styles/AboutUs";
import { NativeBaseProvider } from "native-base";
import { Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import i18next from '../../Translate';

export class AboutUs extends React.Component {

  render() {
    return (
      <NativeBaseProvider>
        <ScrollView style={style.container}>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/digitizingWaste.png")} style = { style.logo1 }/>
            <Text style={style.text}> {i18next.t('AboutUsPart1')} </Text>
            <Text style={style.text}> {i18next.t('AboutUsPart2')} </Text>
          </View>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/CP3.png")} style = { style.logo2 }/>
            <Text style={style.textHeader}> {i18next.t('AboutUsPart3')} </Text>
            <Text style={style.text}>{i18next.t('AboutUsPart4')} </Text>
          </View>
          <View style={style.viewMain}>
            <Image source={require("../../../assets/zeroWaste.png")} style = { style.logo2 }/>
            <Text style={style.textHeader}> Zero Waste Concordia </Text>
            <Text style={style.text}>{i18next.t('OurMission')}  </Text>
          </View>
          <View style={style.viewMain}>
            <Text style={style.textHeader}>{i18next.t('ContactUs')} </Text>
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
            <Text style={style.textHeader}>{i18next.t('SocialMedia')} </Text>
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
            {i18next.t('AboutUsPart5')}
            </Text>
          </View>
          <View>
            <Text style={style.text}>
            {i18next.t('AboutUsPart6')}
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
