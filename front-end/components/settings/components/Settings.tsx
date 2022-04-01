import * as React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import style from "./styles/Settings";
import i18next from '../../Translate';

export class Setting extends React.Component {
    
  render() {
    
    return (
      <NativeBaseProvider>
          <View style={ style.viewMain }>
            <Text style = { style.mainText }>
              Settings
            </Text>
          </View>
            <TouchableHighlight style={style.midText} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('About us')}>
            <View style={ style.viewElement }> 
                  <MaterialIcons name="info" size={26} color="gray" style={ style.leftIcon }/>
                  <Text style={style.midText}>
                    About us
                  </Text>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="gray" style={ style.rightIcon }/>  
            </View>
            </TouchableHighlight>
            <TouchableHighlight style={style.midText} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Language')}>
            <View style={ style.viewElement }> 
                  <MaterialIcons name="language" size={26} color="gray" style={ style.leftIcon }/>
                  <Text style={style.midText2}>
                    Language
                  </Text>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="gray" style={ style.rightIcon }/>  
            </View>
            </TouchableHighlight>
      </NativeBaseProvider>
    );
  }
}