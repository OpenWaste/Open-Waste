import style from "./styles/Language";
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import passStyle from "./styles/Language";
import { NativeBaseProvider, Button } from "native-base";
import i18next from '../../../Translate';
import { deleteValueFor, getValueFor } from '../../../utils/PersistInfo';
import { save } from '../../../utils/PersistInfo';
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

export class Language extends React.Component {

  render() {

    return (
      <NativeBaseProvider>
        <TouchableHighlight style={style.midText} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Setting')}>
          <View style={ style.viewElement }> 
                <MaterialIcons name="arrow-back-ios" size={26} color="gray" style={ style.leftIcon }/>
                <Text style={style.midText}>
                  Language
                </Text>
                <MaterialIcons name="language" size={26} color="gray" style={ style.rightIcon }/>  
          </View>
        </TouchableHighlight>
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

  useEffect(() => {
    getValueFor('language').then((output) => {
      setSelectedLanguage(output)
    });
  })

  const setFrench = () => {
    i18next.changeLanguage("fr", (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    }).then(resp => {
      save('language', 'fr')
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
    })

    if(selectedLanguage != 'fr'){
      navigation.navigate('Setting');
    }
  }

  const setEnglish = () => {
    i18next.changeLanguage("en", (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    }).then(resp => {
      save('language', 'en')
    }).catch(error => {
      showMessage({ message: error.toJSON().message, type: 'warning' }); 
    })

    if(selectedLanguage == 'fr'){
      navigation.navigate('Setting');
    }
  }
  
  if (selectedLanguage == 'fr') {
    return (
      <View>
        <TouchableHighlight>
          <View style={ passStyle.checkMark }>
            <Text
              style={ passStyle.wideBlack }
              onPress={setEnglish}> English </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={ passStyle.checkMark } >
            <Text
              style={ passStyle.wideGreen }
              onPress={setFrench}> French </Text>
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


