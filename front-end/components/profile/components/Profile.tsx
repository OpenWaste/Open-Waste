import React, { useEffect } from "react";
import { View, ScrollView, SafeAreaView, Text, Image, Alert } from "react-native";
import style from "./styles/profile";
import { Button, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { save, getValueFor } from '../../../utils/PersistInfo';
import { showMessage } from "react-native-flash-message";

export class Profile extends React.Component {

  state = { username: "" };

  componentDidUpdate(){
    getValueFor('username').then(output => {
      this.setState({ username: output })
    })
  }

  componentDidMount(){
    getValueFor('username').then(output => {
      this.setState({ username: output })
    })
  }

  render() {
    
    if(this.state.username !== ""){
      return (
        <NativeBaseProvider>
          <SafeAreaView>
            <ScrollView>
              <View style={style.header}></View>
              {/* TODO: Pull profile pic from database. */}
              <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
              <Text style={style.username}> {this.state.username} </Text>
              <View style={style.btnView}>
                <Button style={style.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}> Edit Profile </Button>
                <LogOutBtn/>
              </View>
              <GetEmail/>
              <InfoBox style={style} iconName="image-search" headerText="Submitted Images" infoText=""/>
              <InfoBox style={style} iconName="image" headerText="Accepted Images" infoText="" />
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
            <Text style={style.username}> Guest </Text>
            <Button style={style.loginBtn} onPress={() => this.props.navigation.navigate('Registration')}> Log In </Button>
          </View>
        </NativeBaseProvider>
      );
    }
  }
}

function LogOutBtn(){

  const navigation = useNavigation();

  const handleLogOut = () => {
    save('username', "");
    showMessage({ message: 'Logged Out', type: 'success' });
  }

  return (
    <Button style={style.logOutBtn} onPress={handleLogOut}> Log Out </Button>
  )
  
}

function GetEmail() {
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    getValueFor('email').then((output) => {
      setEmail(output)
    });
  })

  return (
    <InfoBox style={style} iconName="alternate-email" headerText="Email" infoText={email} />
  );
}

function InfoBox(props: any) {
  return (
    <View style={props.style.userInfoView}>
      <View>
        <MaterialIcons style={props.style.userInfoIcons} name={props.iconName} size={50}/>
      </View>
      <View style={props.style.userInfo}>
        <Text style={props.style.userInfoTextHeader}>{props.headerText}</Text>
        <Text style={props.style.userInfoText}>{props.infoText}</Text>
      </View>
    </View>
  );
}