import React from "react";
import LinkStyle from "./LinkStyle";

const Navbar: React.FC<any> = ({ children }) => {
  return (
    <div>
      <LinkStyle to="/component/button">Component</LinkStyle>
      <LinkStyle to="/posts">Get Posts</LinkStyle>
      <LinkStyle to="/auth">Auth Page</LinkStyle>
      <LinkStyle to="/todo">Todo Page</LinkStyle>
      {children}
    </div>
  );
};

export default Navbar;
