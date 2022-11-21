import React from "react";

const Button = ({ title = "Add Title", ...props }) => {
  return (
    <button data-testid="button" className="btn-class" {...props}>
      {title}
    </button>
  );
};

export default Button;
