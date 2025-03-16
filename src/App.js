import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesComponent from "./routes"; 
import MainWrapper from "./components/MainWrapper";
import { ViewportProvider } from "./context/ViewportContext";

const App = () => {
  return (
    <Provider store={store}>
        <ViewportProvider>
      <MainWrapper>
        <RoutesComponent /> 
      </MainWrapper>
      </ViewportProvider>
    </Provider>
  );
};

export default App;
