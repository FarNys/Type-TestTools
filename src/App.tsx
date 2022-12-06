import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    </div>
  );
}

export default App;
