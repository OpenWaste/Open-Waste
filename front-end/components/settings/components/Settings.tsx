import * as React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NativeBaseProvider } from 'native-base';

import i18next from '../../../Translate';
import { getValueFor } from '../../../utils/PersistInfo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import style from "./styles/Settings";

export class Setting extends React.Component {

  constructor(props) {
    super(props);
    this.state = { language: null };
  }
  
  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      getValueFor('language').then(output => {
        this.setState({ language: output })
      }).catch(() => this.setState({language:null}))
    }
  );
  }
  componentWillUnmount() {
    this.focusSubscription()
  }
    
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