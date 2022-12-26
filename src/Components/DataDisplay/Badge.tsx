import React from "react";

interface BadgeType {
  className?: string;
  variant: "danger" | "success" | "info" | "warning";
  text: string;
}

interface BadgeElementType {
  success: JSX.Element;
  danger: JSX.Element;
  info: JSX.Element;
  warning: JSX.Element;
}

const Badge = ({ className, variant, text, ...rest }: BadgeType) => {
  const props = { className, variant, text, ...rest };
  return findVariant(props);
};

const findVariant = ({ className, variant, text, ...rest }: BadgeType) => {
  const badgeElement: BadgeElementType = {
    success: (
      <div
        {...rest}
        className={`w-fit flex text-sm bg-green-100 rounded text-green-600 px-2  ${className}`}
      >
        {text}
      </div>
    ),
    danger: (
      <div
        {...rest}
        className={`w-fit flex text-sm bg-red-100 rounded text-red-600 px-2  ${className}`}
      >
        {text}
      </div>
    ),
    info: (
      <div
        {...rest}
        className={`w-fit flex text-sm bg-sky-100 rounded text-sky-600 px-2  ${className}`}
      >
        {text}
      </div>
    ),
    warning: (
      <div
        {...rest}
        className={`w-fit flex text-sm bg-orange-100 rounded text-orange-600 px-2  ${className}`}
      >
        {text}
      </div>
    ),
  };
  return badgeElement[variant as keyof BadgeElementType];
};

export default Badge;
