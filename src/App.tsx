import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Components/Actions/Input";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title?: string;
  variant?: "sm" | "md";
}

const ButtonHTML = (props: ButtonProps) => {
  const ButtonSize = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
  };
  const { title, variant = "sm", ...rest } = props;
  return <button {...rest} className={ButtonSize[variant]} />;
};

function App() {
  return (
    <div className="App" data-testid="app">
      <h1>h1 ALL</h1>
      <p>This Is Home</p>
      <ButtonHTML variant="md">HTmL</ButtonHTML>
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
