import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import CellList from "./Components/CellList/CellList.component";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
