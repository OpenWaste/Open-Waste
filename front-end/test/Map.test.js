import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { FlatList, Pressable, Text } from "react-native";
import { Map } from "../components/map/Map";
import { SearchBar } from "../components/map/SearchBar";
import { inset } from './utils/constants';

describe("Map Tests", () => {
    it('Map component renders correctly', () => {
        const tree =  render(
          <NativeBaseProvider initialWindowMetrics={inset}>
              <Map />
          </NativeBaseProvider>).toJSON();
        expect(tree).toMatchSnapshot();
      });
    
    it('Tests SearchBar input field', () => {
        const onEventMock = jest.fn();
        const mockInput = 'test';

        const { getByTestId } = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Map>
                    <SearchBar onChangeText={onEventMock}/>
                </Map>
            </NativeBaseProvider>
        );
      
        const search = getByTestId('searchBar');
        fireEvent.changeText(search, mockInput);
        expect(onEventMock).toBeDefined();
    });

    it('Tests if FlatList renders', () => {
        const onEventMock = jest.fn();
        const mockPressed = true;
        const mockFilteredBuildings = [
            {
                id: 1,
                building_name:'X Building',
                address: '123 Street, Canada',
                latitude: 45.5235,
                longitude: 43.8663
            }
        ];

        const { getByTestId } = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Map>
                    { mockPressed
                        ? <FlatList data={mockFilteredBuildings}
                            renderItem={
                                <Pressable onPress={() => {onEventMock}}>
                                    <Text></Text>
                                </Pressable>
                            }
                        />
                        : null
                    }
                </Map>
            </NativeBaseProvider>
        );
      
        const search = getByTestId('flatList');
        const building = getByTestId('buildingName');
        const address = getByTestId('buildingAddress');
        
        expect(search).toBeDefined();
        expect(building).toBe(mockFilteredBuildings[0].building_name);
        expect(address).toBe(mockFilteredBuildings[0].address);
    });
});