import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "sm" | "md";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { title, className, variant = "sm", children, ...rest } = props;

  // console.log(returnCSS());
  // const buttonClass = (item: string) => {
  //   const padding = `mx-2 bg-slate-600 text-yellow-300 hover:bg-slate-700 active:bg-slate-800 p-${item}`;
  //   return padding;
  // };

  // console.log(buttonClass(variant));

  return (
    <button
      data-testid="button"
      className={`bg-slate-600 text-yellow-300 ${variant}`}
      {...rest}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;
