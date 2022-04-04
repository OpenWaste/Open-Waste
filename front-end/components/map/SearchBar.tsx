import { Icon, Input } from "native-base";
import React from "react";
import { ScrollView } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from './styles'

// re-usable component SearchBar
export function SearchBar(props) {
    return <ScrollView width="100%" space={5} alignSelf="center" keyboardShouldPersistTaps="never">
          <Input
            testID="search-bar"
            onFocus={props.focus}
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
        </ScrollView>;
}