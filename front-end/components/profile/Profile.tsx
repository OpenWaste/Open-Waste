import React from "react";
import { View, ScrollView, SafeAreaView, Text, Image, Alert } from "react-native";
import style from "../../styles/profile-style";
import { Button, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { save, deleteValueFor, getValueFor } from '../../utils/PersistInfo';
import { showMsg } from "../../utils/FlashMessage";
import Service from "../../service/service";

export class Profile extends React.Component {

  state = { username: "" };

  render() {

    getValueFor('username').then(output => {
      this.setState({ username: output})
    })

    if(this.state.username ==='undefined' || this.state.username == null){
      return (
        <NativeBaseProvider>
          <View>
            <View style={style.header}></View> 
            
            {/* TO DO: Pull profile pic from database. */}
            <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
            
            <Text style={style.username}> Guest </Text>
            <Button style={style.loginBtn} onPress={() => this.props.navigation.navigate('LogIn')}> Log In </Button>
          </View>
        </NativeBaseProvider>
      );
    }
    else{
      
      return (
        <NativeBaseProvider>
          <SafeAreaView>
            <ScrollView>
              <View style={style.header}></View> 
              
              {/* TO DO: Pull profile pic from database. */}
              <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
              
              <Text style={style.username}> {this.state.username} </Text>
              
              <View style={style.btnView}>
                <Button style={style.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}> Edit Profile </Button>
                <LogOutBtn screenName={'ProfilePage'}/>
              </View>

              <GetEmail/>

              <View style={style.userInfoView}>
                <View>
                  <MaterialIcons style={style.userInfoIcons} name = "image-search" size = {50}/>
                </View>
                <View style={style.userInfo}>
                  <Text style={style.userInfoTextHeader}>Submitted Images</Text>
                  <Text style={style.userInfoText}>23</Text>
                </View>
              </View>
              
              <View style={style.userInfoView}>
                <View>
                  <MaterialIcons style={style.userInfoIcons} name = "image" size = {50}/>
                </View>
                <View style={style.userInfo}>
                  <Text style={style.userInfoTextHeader}>Accepted Images</Text>
                  <Text style={style.userInfoText}>12</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </NativeBaseProvider>
      );
    }
    
  }
}

function LogOutBtn( { screenName } ){

  const [username, setUsername] = React.useState();
  const navigation = useNavigation();

  const handleLogOut = () => {

    deleteValueFor('username');
    deleteValueFor('email');
    navigation.navigate(screenName);
    showMsg('Logged Out', 'success');
  }

  return(
    <Button style={style.logOutBtn} onPress={handleLogOut}> Log Out </Button>
  )
  
}

function GetUsername() {
  const [username, setUsername] = React.useState();

  getValueFor('username').then(output => {
    setUsername(output)
  });

  return username;
}

function GetEmail() {
  const [email, setEmail] = React.useState();

  getValueFor('email').then(output => {
    setEmail(output)
  });

  return (
    <View style={style.userInfoView}>
      <View>
        <MaterialIcons style={style.userInfoIcons} name = "alternate-email" size = {50}/>
      </View>
      <View style={style.userInfo}>
        <Text style={style.userInfoTextHeader}>Email</Text>
        <Text style={style.userInfoText}>{email}</Text>
      </View>
    </View>
  );
}