import * as React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import style from "../../styles/profile-style";
import { Button, NativeBaseProvider } from 'native-base';

export class Profile extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <View>
          <View style={style.header}></View> 
          
          {/* TO DO: Pull profile pic from database. */}
          <Image style={style.profilePic} source={{uri: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm'}} />
          
          <Text style={style.username}> Guest </Text>
          <Button style={style.loginBtn}> Log In </Button>
        </View>
      </NativeBaseProvider>
    );
  }
}
