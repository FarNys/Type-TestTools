import React from "react";
import { Link } from "react-router-dom";

interface LinkType {
  children: string;
  className?: string;
  to: string;
}

const LinkText = ({ to, children, className, ...rest }: LinkType) => {
  return (
    <Link to={to} {...rest}>
      <span
        className={`text-sm bg-green-400 px-2 py-1 rounded text-slate-900 hover:bg-green-500 ${className}`}
      >
        {children}
      </span>
    </Link>
  );
};

export default LinkText;
