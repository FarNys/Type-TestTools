import React from "react";
interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}
const Button: React.FC<ButtonProps> = (props) => {
  const { title, children, className, ...rest } = props;
  return (
    <button
      className={`py-2 px-4 rounded-lg border mx-1 ${className}`}
      {...rest}
    >
      {title} {children}
    </button>
  );
};

export default Button;
