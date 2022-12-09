import React from "react";
interface TypographyType {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children?: React.ReactNode;
  rest?: any;
}
type VariantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type ChildrenType = React.ReactNode;

const Typography = ({ variant = "p", children, ...rest }: TypographyType) => {
  return relatedTypography(variant, children, rest);
};

export default Typography;

const relatedTypography = (
  variant: VariantType,
  children: ChildrenType,
  rest: any
) => {
  const tagElement: any = {
    h1: (
      <h1 {...rest} className="text-5xl">
        {children}
      </h1>
    ),
    h2: (
      <h2 {...rest} className="text-4xl">
        {children}
      </h2>
    ),
    h3: (
      <h3 {...rest} className="text-3xl">
        {children}
      </h3>
    ),
    h4: (
      <h4 {...rest} className="text-2xl">
        {children}
      </h4>
    ),
    h5: (
      <h5 {...rest} className="text-xl">
        {children}
      </h5>
    ),
    h6: (
      <h6 {...rest} className="text-lg">
        {children}
      </h6>
    ),
    p: <p {...rest}>{children}</p>,
  };
  return tagElement[variant];
};
