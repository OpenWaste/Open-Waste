import * as React from "react";
import { MainContainer } from "./components/MainContainer";
import Service from "./service/service";

export default function App() {
  
  React.useEffect(() => {
    Service.updateApplicationCache()
  });

  return <MainContainer />;
}
