import React from "react";

interface CardType extends React.ComponentPropsWithRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...rest }: CardType): JSX.Element => {
  return (
    <div
      className={`w-11/12 border shadow-sm my-4 p-4 mx-auto ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
