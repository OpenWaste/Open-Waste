import * as React from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider } from 'native-base';

import style from "./styles/Setting";
import i18next from '../../../Translate';
import { getValueFor } from '../../../utils/PersistInfo';

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
          <View>
            <Text style={style.checkMark} onPress={() => this.props.navigation.navigate('AboutUs')}> {i18next.t('AboutUs')} </Text>
            <Text style={style.checkMark} onPress={() => this.props.navigation.navigate('Privacy')}> {i18next.t('Privacy')} </Text>
            <Text style={style.checkMark} onPress={() => this.props.navigation.navigate('Language')}> {i18next.t('Language')} </Text>
          </View>
      </NativeBaseProvider>
    );
  }
}