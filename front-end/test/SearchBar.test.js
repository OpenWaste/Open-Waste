import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import { SearchBar } from "../components/map/SearchBar";
import { inset } from './utils/constants';

describe("SearchBar tests", () => {
    it('SearchBar component renders correctly', () => {
      const tree =  render(
        <NativeBaseProvider initialWindowMetrics={inset}>
            <SearchBar />
        </NativeBaseProvider>).toJSON();
      expect(tree).toMatchSnapshot();
    });
});