import React, { forwardRef, Ref } from "react";
interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}
const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { title, children, className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={`py-2 px-4 rounded-lg border mx-1 ${className}`}
      {...rest}
    >
      {title} {children}
    </button>
  );
});

export default Button;
