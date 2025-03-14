import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesComponent from "./routes";  // ✅ Fix: Correct import name
import MainWrapper from "./components/MainWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <MainWrapper>
        <RoutesComponent /> {/* ✅ Fix: Use correct component name */}
      </MainWrapper>
    </Provider>
  );
};

export default App;
