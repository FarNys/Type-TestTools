import React from "react";

const Carousel = () => {
  return (
    <div className="w-full border border-slate-600 relative">
      <div className="flex">
        {data.map((el, index) => (
          <div
            className="w-full relative left-0"
            key={`carousel-item-${index}`}
          >
            {el.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

const data = [
  {
    component: "item-1",
  },
  {
    component: "item-2",
  },
  {
    component: "item-3",
  },
];
