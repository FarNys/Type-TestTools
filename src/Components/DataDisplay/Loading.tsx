import React from "react";
interface LoadingType {
  className?: string;
}
const Loading = ({ className }: LoadingType) => {
  return (
    <div className="w-60 relative h-2 bg-slate-200 rounded overflow-hidden">
      <div
        className={`absolute -left-60 top-0 w-full h-full bg-green-500 animate-getfill ${className}`}
      ></div>
    </div>
  );
};

export default Loading;
