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
    <button
      data-testid="button"
      className="mx-2 py-2 px-4 bg-slate-600 text-yellow-300 hover:bg-slate-700 active:bg-slate-800"
      {...rest}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;
