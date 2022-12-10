import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Components/Actions/Input";

function App() {
  return (
    <div className="App" data-testid="app">
      <h1>h1 ALL</h1>
      <p>This Is Home</p>
      <div className="navbar_container" dir="rtl">
        <div className="navbar">
          <div className="logo_container">Downlo</div>
          <div className="search_container">
            <Input placeholder="Search" className="border-b-indigo-600" />
          </div>
          <div className="dd_container">DropDown</div>
          <div className="filler"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
