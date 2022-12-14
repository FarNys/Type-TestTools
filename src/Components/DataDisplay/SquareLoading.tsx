import React from "react";

const SquareLoading = () => {
  return (
    <div className="grid grid-cols-2 w-10 h-10 gap-1">
      <div className="border w-full h-full bg-green-500 opacity-10 animate-fadeInOut"></div>
      <div className="border w-full h-full bg-green-500 opacity-10 animate-fadeInOut animate-delay-500"></div>
      <div className="border w-full h-full bg-green-500 opacity-10 animate-fadeInOut animate-delay-1500"></div>
      <div className="border w-full h-full bg-green-500 opacity-10 animate-fadeInOut animate-delay-1000"></div>
    </div>
  );
};

export default SquareLoading;
