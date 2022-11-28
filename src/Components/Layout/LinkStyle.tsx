import React from "react";
import { Link } from "react-router-dom";
interface LinkType {
  to: string;
  children: string;
}
const LinkStyle = ({ to, children }: LinkType) => {
  return (
    <Link to={to} style={{ marginRight: "1rem" }}>
      {children}
    </Link>
  );
};

export default LinkStyle;
