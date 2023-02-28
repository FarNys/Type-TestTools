import React from "react";
import LinkStyle from "./LinkStyle";

const Navbar: React.FC<any> = () => {
  return (
    <div data-cy="navbar" className="mb-4">
      <LinkStyle to="/">Home</LinkStyle>
      <LinkStyle to="/component/button">Component</LinkStyle>
      <LinkStyle to="/posts">Get Posts</LinkStyle>
      <LinkStyle to="/auth">Auth Page</LinkStyle>
      <LinkStyle to="/todo">Todo Page</LinkStyle>
      <LinkStyle to="/dnd">Dran n Drop</LinkStyle>
      <LinkStyle to="/todo-rtkq">Todo RTKQ</LinkStyle>
      <LinkStyle to="/sheet">Sheet</LinkStyle>
      <LinkStyle to="/virtual">Virtual</LinkStyle>
    </div>
  );
};

export default Navbar;
