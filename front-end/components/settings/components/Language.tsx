import React, { useState } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import passStyle from "./styles/Language";
import { NativeBaseProvider, Button } from "native-base";
import i18next from '../../i18n';
import { deleteValueFor, getValueFor } from '../../../utils/PersistInfo';
import { save } from '../../../utils/PersistInfo';
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import i18n from "../../i18n";

export class Language extends React.Component {

  render() {

    return (
      <NativeBaseProvider>
        <View>
            <LanguagesPicker/>
        </View>
      </NativeBaseProvider>
    );
  }
}

function LanguagesPicker () {

  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  const navigation = useNavigation();

  const setFrench = () => {
    i18next.changeLanguage("fr", (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    }).then(resp => {
      save('language', 'fr')
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
    })

    setSelectedLanguage('french');
    navigation.navigate('Camera');
  }

  const setEnglish = () => {
    i18next.changeLanguage("en", (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    }).then(resp => {
      deleteValueFor('language')
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
    })
    setSelectedLanguage('english');
    navigation.navigate('Camera');
  }

  getValueFor('language').then((output) => {
    if(output == 'fr'){
      setSelectedLanguage('french');
   }
  });
  
  if (selectedLanguage == 'french') {
    return (
      <View>
        <TouchableHighlight>
          <View style={ passStyle.checkMark }>
            <Text
              style={ passStyle.wideBlack }
              onPress={setEnglish}> Anglais </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={ passStyle.checkMark } >
            <Text
              style={ passStyle.wideGreen }
              onPress={setFrench}> Français </Text>
            <MaterialIcons style={{color: 'green'}} name="check" size={20}/>
          </View>
        </TouchableHighlight>
      </View>
    )
  } else {
      return (
        <View>
          <TouchableHighlight>
            <View style={ passStyle.checkMark }>
              <Text
                style={ passStyle.wideGreen }
                onPress={setEnglish}> English </Text>
              <MaterialIcons style={{color: 'green'}} name="check" size={20}/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={ passStyle.checkMark }>
              <Text
                style={ passStyle.wideBlack }
                onPress={setFrench}> French </Text>
            </View>
          </TouchableHighlight>
        </View>
      )
  }
}


