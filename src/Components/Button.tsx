import React from "react";
interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}
const Button: React.FC<ButtonProps> = (props) => {
  const { title, children, ...rest } = props;

  return (
    <button data-testid="button" className="btn-class" {...rest}>
      {title}
      {children}
    </button>
  );
};

export default Button;
