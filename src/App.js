import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesComponent from "./routes"; 
import MainWrapper from "./components/MainWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <RoutesComponent /> 
      </MainWrapper>
    </Provider>
  );
};

export default App;
