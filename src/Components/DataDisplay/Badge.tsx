import { VariantTypes } from "../sharedTypes";
interface BadgeType {
  readonly [index: string]: string | undefined;
  className?: string;
  variant?: VariantTypes;
  text: string;
}

const Badge = ({
  className,
  variant = "default",
  text,
  ...rest
}: BadgeType) => {
  const badgeElement: Record<VariantTypes, string> = {
    success: "bg-green-100  text-green-600 px-2",
    danger: "bg-red-100  text-red-600 px-2",
    info: "bg-sky-100  text-sky-600 px-2",
    warning: "bg-orange-100  text-orange-600 px-2",
    default: "bg-slate-100  text-slate-600 px-2",
  };
  return (
    <div
      {...rest}
      className={`w-fit flex text-sm rounded ${
        badgeElement[variant as VariantTypes]
      } ${className}`}
    >
      {text}
    </div>
  );
};

// const findVariant = ({ className, variant, text, ...rest }: BadgeType) => {
//   const badgeElement: BadgeElementType = {
//     success: (
//       <div
//         {...rest}
//         className={`w-fit flex text-sm bg-green-100 rounded text-green-600 px-2  ${className}`}
//       >
//         {text}
//       </div>
//     ),
//     danger: (
//       <div
//         {...rest}
//         className={`w-fit flex text-sm bg-red-100 rounded text-red-600 px-2  ${className}`}
//       >
//         {text}
//       </div>
//     ),
//     info: (
//       <div
//         {...rest}
//         className={`w-fit flex text-sm bg-sky-100 rounded text-sky-600 px-2  ${className}`}
//       >
//         {text}
//       </div>
//     ),
//     warning: (
//       <div
//         {...rest}
//         className={`w-fit flex text-sm bg-orange-100 rounded text-orange-600 px-2  ${className}`}
//       >
//         {text}
//       </div>
//     ),
//   };
//   return badgeElement[variant as keyof BadgeElementType];
// };

export default Badge;
