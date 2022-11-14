import React from "react";

const Button = ({ title = "Add Title", ...props }) => {
  return <button {...props}>{title}</button>;
};

export default Button;
