import * as React from "react";
import { View, Text, Button } from "react-native";
import Service from "../../service/service";

const img = {
  uri: "https://us-browse.startpage.com/av/anon-image?piurl=https%3A%2F%2Fcliparting.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fcool-pictures-2018-2.jpg&sp=1638651646T5c35240658b1fd840fa8765aa38eb88861462e7a1d0b48293dbebc960b9f1329",
  type: "image/jpeg",
  name: "photo.jpg",
};

const formData = new FormData();
formData.append("image", img);

export class Map extends React.Component {
  render() {
    return (
      <View>
        <Text>Map</Text>
        <Button
          onPress={() => Service.submitImage(formData)}
          title="Press me"
        />
      </View>
    );
  }
}
