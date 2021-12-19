import * as React from "react";
import {NativeBaseProvider} from 'native-base';
import { MainContainer } from "./components/MainContainer";

export default function App({}) {
  return (
    <NativeBaseProvider>
      <MainContainer />
    </NativeBaseProvider>
  )
}
