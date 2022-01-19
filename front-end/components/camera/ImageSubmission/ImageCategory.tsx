import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Select, Button, VStack, Box, FormControl } from "native-base";
import Service from "../../../service/service";

export function ImageCategory() {
  let [category, setCategory] = useState([]);
  let [service, setService] = React.useState("")

  useEffect ( () =>{
    if (category.length == 0) {
      Service.getImageCategory().then((resp) => {
        setCategory(resp.categories);
      }).catch(error => console.log(error));
    }
  })

  return (
    <View>
      <VStack>
        <FormControl isRequired>
          <FormControl.Label color="#8A8A8A">Category</FormControl.Label>
          <Select
            bg="#F9F9F9"
            minWidth="100%"
            placeholder="Choose Categories"
            mt="1"
            selectedValue={service}
          >
            {category.map((value) => {
              return <Select.Item key={value} label={value} value={value}/>;
            })}
          </Select>
          <Box m="10">
            <ButtonState />
          </Box>
        </FormControl>
      </VStack>
    </View>
  );
}

function ButtonState() {
  const [state, setState] = React.useState(false);
  
  const toggleState = () => {
    setState(!state);
  };

  if (state) {
    return (
      <Button onPress={() => {}} size="sm" colorScheme="success">
        Done!
      </Button>
    );
  } else {
    return (
      <Button onPress={toggleState} size="sm" colorScheme="teal">
        Submit
      </Button>
    );
  }
}
