import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, Image, Alert } from "react-native";
import style from "./styles/profile";
import { NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { deleteValueFor, getValueFor } from '../../../utils/PersistInfo';
import { showMessage } from "react-native-flash-message";
import i18next from '../../Translate';

export class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: null };
  }
  
  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      getValueFor('username').then(output => {
        this.setState({ username: output })
      }).catch(() => this.setState({username:null}))
    }
  );
  }
  componentWillUnmount() {
    this.focusSubscription()
  }


  render() {
    
    if(this.state.username != null){
      
      return (
        <NativeBaseProvider>
          <SafeAreaView>
            <ScrollView>
              <View style={style.header}></View>
              {/* TODO: Pull profile pic from database. */}
              <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
              <Text style={style.username}> {this.state.username} </Text>
              <View style={style.btnView}>
                <Text style={style.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}> {i18next.t('EditProfile')} </Text>
                <this.LogOutBtn/>
              </View>
              <ProfileInformation/>
            </ScrollView>
          </SafeAreaView>
        </NativeBaseProvider>
      );
    }
    else {
      return (
        <NativeBaseProvider>
          <View>
            <View style={style.header}></View>
            {/* TODO: Pull profile pic from database. */}
            <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
            <Text style={style.username}> {i18next.t('Guest')} </Text>
            <Text style={style.loginBtn} onPress={() => this.props.navigation.navigate('Registration')}> {i18next.t('LogIn')} </Text>
          </View>
        </NativeBaseProvider>
      );
    }
  }

   LogOutBtn = () =>{

    const handleLogOut = () => {
      deleteValueFor('username');
      deleteValueFor('email');
      deleteValueFor('submitted_images');
      deleteValueFor('accepted_images');
      this.setState({username:null})
      showMessage({ message: 'Logged Out', type: 'success' });
    }
  
    return (
      <Text style={style.logOutBtn} onPress={handleLogOut}> {i18next.t('LogOut')} </Text>
    )
    
  }
}



export function ProfileInformation() {
  const [email, setEmail] = React.useState('');
  const [submittedImages, setSubmittedImages] = React.useState('');
  const [acceptedImages, setAcceptedImages] = React.useState('');

  useEffect(() => {
    getValueFor('email').then((output) => {
      setEmail(output)
    });
    getValueFor('submitted_images').then((output) => {
      setSubmittedImages(output)
    });
    getValueFor('accepted_images').then((output) => {
      setAcceptedImages(output)
    });
  })

  return (
    <>
    <InfoBox
      style={style} 
      iconName="alternate-email" 
      headerText={i18next.t('Email')} 
      infoText={email} />
    <InfoBox
      style={style} 
      iconName="image-search"
      headerText={i18next.t('SubmittedImages')}
      infoText={submittedImages}/>
    <InfoBox
      style={style} 
      iconName="image" 
      headerText={i18next.t('AcceptedImages')}
      infoText={acceptedImages} />
    </>
  );
}

export function InfoBox(props: any) {
  return (
    <View style={props.style.userInfoView}>
      <View>
        <MaterialIcons style={props.style.userInfoIcons} name={props.iconName} size={50}/>
      </View>
      <View style={props.style.userInfo}>
        <Text 
          testID="header"
          style={props.style.userInfoTextHeader}>{props.headerText}</Text>
        <Text 
          testID="info"
          style={props.style.userInfoText}>{props.infoText}</Text>
      </View>
    </View>
  );
}