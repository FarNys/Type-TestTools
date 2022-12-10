import React, { ReactElement } from "react";
interface TypographyType {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children?: React.ReactNode;
  className?: string;
  rest?: any;
}
type VariantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type ChildrenType = React.ReactNode;
type ClassnameType = string;

interface TagelementType {
  h1: JSX.Element;
  h2: JSX.Element;
  h3: JSX.Element;
  h4: JSX.Element;
  h5: JSX.Element;
  h6: JSX.Element;
  p: JSX.Element;
}

const Typography = ({
  variant = "p",
  children,
  className,
  ...rest
}: TypographyType) => {
  return relatedTypography(variant, children, className, rest);
};

export default Typography;

const relatedTypography = (
  variant: VariantType,
  children: ChildrenType,
  className?: ClassnameType,
  rest?: any
) => {
  const tagElement: TagelementType = {
    h1: (
      <h1 {...rest} className={`text-5xl font-extrabold ${className}`}>
        {children}
      </h1>
    ),
    h2: (
      <h2 {...rest} className={` text-4xl font-extrabold ${className}`}>
        {children}
      </h2>
    ),
    h3: (
      <h3 {...rest} className={` text-3xl font-bold ${className}`}>
        {children}
      </h3>
    ),
    h4: (
      <h4 {...rest} className={` text-2xl font-bold ${className}`}>
        {children}
      </h4>
    ),
    h5: (
      <h5 {...rest} className={` text-xl font-semibold ${className}`}>
        {children}
      </h5>
    ),
    h6: (
      <h6 {...rest} className={` text-lg font-semibold ${className}`}>
        {children}
      </h6>
    ),
    p: (
      <p {...rest} className={`${className}`}>
        {children}
      </p>
    ),
  };
  return tagElement[variant];
};
