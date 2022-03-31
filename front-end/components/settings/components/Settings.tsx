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
          <View style={ style.viewElement }>
              <View style={ style.viewItem1 } >
                <TouchableHighlight style={style.leftIcon} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('About us')}>
                  <MaterialIcons name="info" size={26} color="gray"/>
                </TouchableHighlight>
              </View>
              <View style={ style.viewItem2 } >
                <TouchableHighlight style={style.midText} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('About us')}>
                  <Text style={style.midText}>
                    About us
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={ style.viewItem3 } >
                <TouchableHighlight style={style.rightIcon} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('About us')}>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="gray"/>
                </TouchableHighlight>
              </View>
            </View>
            <View style={ style.viewElement }>
              <View style={ style.viewItem1 } >
                <TouchableHighlight style={style.leftIcon} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Language')}>
                  <MaterialIcons name="language" size={26} color="gray"/>
                </TouchableHighlight>
              </View>
              <View style={ style.viewItem2 } >
                <TouchableHighlight style={style.midText} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Language')}>
                  <Text style={style.midText}>
                    Language
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={ style.viewItem3 } >
                <TouchableHighlight style={style.rightIcon} underlayColor={"COLOR"} onPress={() => this.props.navigation.navigate('Language')}>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="gray"/>
                </TouchableHighlight>
              </View>
            </View>
      </NativeBaseProvider>
    );
  }
}