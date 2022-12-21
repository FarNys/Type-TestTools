import React, { SetStateAction, useEffect, useRef } from "react";
import Typography from "../Typo/Typography";
import Button from "./Button";

interface ModalsProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  title: string;
  setisOpren: React.Dispatch<SetStateAction<boolean>>;
  // setisOpren?: any;
}
const Modals = ({
  children,
  className,
  isOpen,
  setisOpren,
  title,
}: ModalsProps) => {
  const clickToCloseModalHandler = () => {
    setisOpren(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 min-w-full min-h-screen bg-slate-800 opacity-50"
        id="modal-state"
        onClick={clickToCloseModalHandler}
      ></div>
      <div
        className={`fixed top-1/4 left-2/4 -translate-x-2/4 flex flex-col justify-center items-center bg-slate-200 min-h-min p-4 rounded-md max-w-md animate-fadeOut w-full ${className}`}
      >
        <div className="flex justify-between w-full">
          <Typography variant="h6" className="pt-1">
            {title}
          </Typography>
          <Button
            onClick={clickToCloseModalHandler}
            // className="border-red-500 text-red-500 hover:bg-red-500 hover:border-slate-100 hover:text-slate-100"
            size="sm"
            variant="default"
          >
            X
          </Button>
        </div>
        <div className="mt-2  w-full">{children}</div>
      </div>
    </>
  );
};

export default Modals;
