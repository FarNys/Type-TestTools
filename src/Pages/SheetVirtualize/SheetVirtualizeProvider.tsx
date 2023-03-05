import React from "react";
import { Provider } from "react-redux";
import sheetStore from "./redux/sheetStore";
import Sheet from "./Sheet";
import "./sheetstyle.scss";

const SheetVirtualizeProvider = () => {
  return (
    <Provider store={sheetStore}>
      <Sheet />
    </Provider>
  );
};

export default SheetVirtualizeProvider;
