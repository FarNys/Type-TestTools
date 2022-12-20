import React, { SetStateAction, useEffect, useState } from "react";
import Typography from "../Typo/Typography";
import Button from "../Actions/Button";
import { VariantsType } from "./Alert";

interface ToastType {
  showToast: boolean;
  setshowToast: React.Dispatch<SetStateAction<boolean>>;
  toastText: string;
  variant: VariantsType;
}

const Toast = ({
  toastText,
  showToast,
  setshowToast,
  variant,
  ...rest
}: ToastType) => {
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setshowToast(false);
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [showToast, setshowToast]);

  const allVariants: any = {
    // default: "border-slate-700",
    danger: "border-red-500 bg-red-100",
    info: "border-sky-500 bg-sky-100",
    success: "border-green-500 bg-green-100",
    warning: "border-orange-500 bg-orange-100",
  };

  if (!showToast) return null;
  return (
    <div
      className={`fixed rounded-md top-10 right-10 flex flex-col py-2 px-1 items-end  border-l-4 max-w-xs animate-spring ${
        allVariants[variant as keyof VariantsType]
      }`}
      {...rest}
    >
      <Button
        variant={variant}
        size="sm"
        className="w-fit border-none "
        onClick={() => setshowToast(false)}
      >
        x
      </Button>
      <div className="p-2">
        <Typography variant="h6">{toastText}</Typography>
      </div>
    </div>
  );
};

export default Toast;
