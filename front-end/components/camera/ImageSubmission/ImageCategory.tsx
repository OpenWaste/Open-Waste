import * as React from "react";
import { View } from "react-native";
import { Text, Select, Button, VStack, Box, FormControl} from "native-base"

/**
 * THIS PART STILL NEED TO BE REFACTOR IN THE FUTURE
 * AS OF RN THE STORAGE AND THE SUBMITION ISNT READY
 * TO CHANGE
 * -HARD CODED CATEGORIES
 * -
 */
export function ImageCategory() {
  let [category, setCategory] = React.useState("")

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
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Select.Item label="Plastic" value="plastic" />
          <Select.Item label="E-waste" value="e-waste" />
        </Select>
        <Box m="10">
          <ButtonState />
        </Box>
        </FormControl>
      </VStack>
    </View>
  );
}

function ButtonState()
{
  const [state, setState] = React.useState(false)

  const toggleState = () => {
    setState(!state)
  }

  if(state)
  {
    return <Button size="sm" colorScheme="success">Done!</Button>
  }
  else
  {
    return <Button onPress={toggleState} size="sm" colorScheme="teal">Submit</Button>
  }
}
