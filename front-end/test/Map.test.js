import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { Map } from "../components/map/Map";
import { SearchBar } from "../components/map/SearchBar";
import { inset } from './utils/constants';
import MapView, { Marker } from "react-native-maps";

describe("Map Tests", () => {
    it('Map component renders correctly', () => {
        const tree =  render(
          <NativeBaseProvider initialWindowMetrics={inset}>
              <Map />
          </NativeBaseProvider>).toJSON();
        expect(tree).toMatchSnapshot();
      });
    
    it('SearchBar should take input and render flatlist', () => {
        const onEventMock = jest.fn();
        const mockInput = 'test';

        const { queryByTestId } = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Map>
                    <SearchBar onChangeText={onEventMock}/>
                </Map>
            </NativeBaseProvider>
        );
      
        fireEvent.changeText(queryByTestId("search-bar"), mockInput);
        expect(onEventMock).toBeDefined();
        expect(queryByTestId("flat-list")).not.toBeNull();
    });

    //skipping for now
    xit('Mapview renders', () => {
        const { getByTestId } = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Map>
                    <MapView/>
                </Map>
            </NativeBaseProvider>
        );
      
        expect(getByTestId("map-view")).not.toBeNull();
    });

    //skipping for now
    xit('Marker is pressed', () => {
        const onEventMock = jest.fn();
        const mockCoordinates = { longitude: 0, latitude: 0 };

        const { getByTestId } = render(
            <NativeBaseProvider initialWindowMetrics={inset}>
                <Map>
                    <MapView>
                        <Marker coordinate={mockCoordinates} onPress={onEventMock}/>
                    </MapView>
                </Map>
            </NativeBaseProvider>
        );
      
        fireEvent.press(getByTestId("marker"));
        expect(onEventMock).toHaveBeenCalled();
    });
});