import React from "react";
import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import style from "../../styles/profile-style";
import { Button, NativeBaseProvider } from 'native-base';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class Profile extends React.Component {

  guest = true;

  render() {

    if(this.guest){
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
              
              <Text style={style.username}> Username </Text>
              
              <View style={style.btnView}>
                <Button style={style.editBtn} onPress={() => this.props.navigation.navigate('EditProfile')}> Edit Profile </Button>
                <Button style={style.logOutBtn} onPress={() => this.props.navigation.navigate('LogOut')}> Log Out </Button>
              </View>

              <View style={style.userInfoView}>
                <View>
                  <MaterialIcons style={style.userInfoIcons} name = "alternate-email" size = {50}/>
                </View>
                <View style={style.userInfo}>
                  <Text style={style.userInfoTextHeader}>Email</Text>
                  <Text style={style.userInfoText}>example@live.concordia.ca</Text>
                </View>
              </View>
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

