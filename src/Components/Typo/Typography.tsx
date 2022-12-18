import React, { ReactElement } from "react";
interface TypographyType {
  variant?: VariantType;
  children?: React.ReactNode;
  className?: string;
  colorVariant?: VariantsType;
  rest?: any;
}
type VariantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small";
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
  small: JSX.Element;
}

const Typography = ({
  variant = "p",
  children,
  className,
  colorVariant,
  ...rest
}: TypographyType) => {
  return relatedTypography(variant, children, className, colorVariant, rest);
};

export default Typography;

type VariantsType = "success" | "danger" | "info" | "warning" | "default";
const variantPicker = (v: VariantsType): string => {
  const variant = {
    default: "text-slate-900",
    success: "text-green-400",
    danger: "text-red-400",
    info: "text-sky-400",
    warning: "text-orange-400",
  };
  return variant[v] || variant.default;
};

const relatedTypography = (
  variant: VariantType,
  children: ChildrenType,
  className?: ClassnameType,
  colorVariant?: VariantsType | any,
  rest?: any
) => {
  const tagElement: TagelementType = {
    h1: (
      <h1
        {...rest}
        className={`text-5xl font-extrabold ${variantPicker(colorVariant)} $ ${
          className ? className : ""
        }`}
      >
        {children}
      </h1>
    ),
    h2: (
      <h2
        {...rest}
        className={` text-4xl font-extrabold ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </h2>
    ),
    h3: (
      <h3
        {...rest}
        className={` text-3xl font-bold ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </h3>
    ),
    h4: (
      <h4
        {...rest}
        className={` text-2xl font-bold ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </h4>
    ),
    h5: (
      <h5
        {...rest}
        className={` text-xl font-semibold ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </h5>
    ),
    h6: (
      <h6
        {...rest}
        className={` text-lg font-semibold ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </h6>
    ),
    p: (
      <p
        {...rest}
        className={`${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </p>
    ),
    small: (
      <p
        {...rest}
        className={`text-sm ${variantPicker(colorVariant)} ${
          className ? className : ""
        }`}
      >
        {children}
      </p>
    ),
  };
  return tagElement[variant];
};
