import { Icon, Input, VStack } from "native-base";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from './styles'

// re-usable component SearchBar
export function SearchBar(props) {
    return <VStack w="100%" space={5} alignSelf="center">
          <Input
            onChangeText={props.query}
            placeholder={props.placeholder}
            value={props.value}
            style={styles.searchBar}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                backgroundColor="#F9F9F9"
                color="#95E0D3"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </VStack>;
}