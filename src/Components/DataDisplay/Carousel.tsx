import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Actions/Button";

const TIMER = 300;
const RATIO = 3 / 4;

const Carousel = () => {
  const [coordinate, setcoordinate] = useState<any>();
  const [currentIndex, setcurrentIndex] = useState<number>(2);
  const parentRef = useRef<any>(null);
  const boxRef = useRef<any>(null);

  const resizeHandler = useCallback(() => {
    const findCoordinate = parentRef.current?.getBoundingClientRect();
    setcoordinate(findCoordinate);
  }, []);

  const preventClick = useCallback((e: any) => {
    boxRef.current.style.transitionDuration = TIMER + "ms";
    e.target.style.pointerEvents = "none";
    setTimeout(() => {
      e.target.style.pointerEvents = "visible";
    }, TIMER);
  }, []);

  const resetTimer = useCallback((index: number) => {
    boxRef.current.style.transition = "0ms";
    setcurrentIndex(index);
  }, []);

  useEffect(() => {
    resizeHandler();
  }, [resizeHandler]);

  useEffect(() => {
    if (coordinate) {
      window.addEventListener("resize", resizeHandler);
    }
    return () => window.removeEventListener("resize", resizeHandler);
  }, [coordinate, resizeHandler]);

  const nextItemHandler = (e: any) => {
    preventClick(e);
    setcurrentIndex((prev) => prev + 1);
  };

  const prevItemHandler = (e: any) => {
    preventClick(e);
    setcurrentIndex((prev) => prev - 1);
  };

  const selectIndexHandler = (e: any, selectedIndex: number) => {
    preventClick(e);
    setcurrentIndex(selectedIndex + 1);
  };
  console.log(currentIndex);

  const transitionEndHandler = () => {
    if (currentIndex === data.length + 1) {
      resetTimer(1);
    }
    if (currentIndex === 0) {
      resetTimer(data.length);
    }
  };

  return (
    <div className="w-full shadow relative overflow-hidden" ref={parentRef}>
      {/* <div className="w-full border"> */}
      <div
        className="flex w-full"
        style={{
          transform: `translateX(${
            -currentIndex * RATIO * coordinate?.width
          }px)`,
        }}
        onTransitionEnd={transitionEndHandler}
        ref={boxRef}
      >
        <div
          className="pr-4"
          style={{ minWidth: RATIO * coordinate?.width || 0 }}
        >
          <div className=" border"> {data[data.length - 2].component}</div>
        </div>
        <div
          className="pr-4"
          style={{ minWidth: RATIO * coordinate?.width || 0 }}
        >
          <div className=" border"> {data[data.length - 1].component}</div>
        </div>
        {data.map((el, index) => (
          <div
            className="pr-4"
            style={{ minWidth: RATIO * coordinate?.width || 0 }}
            key={`carousel-item-${index}`}
          >
            <div className=" border">{el.component}</div>
          </div>
        ))}
        <div
          className="pr-4"
          style={{ minWidth: RATIO * coordinate?.width || 0 }}
        >
          <div className=" border">{data[0].component}</div>
        </div>
        <div
          className="pr-4"
          style={{ minWidth: RATIO * coordinate?.width || 0 }}
        >
          <div className=" border">{data[1].component}</div>
        </div>
      </div>
      <div className="mx-auto w-full flex justify-center border border-red-300">
        {data.map((_, index) => (
          <div
            className={`w-5  mx-1 my-3 cursor-pointer hover:bg-sky-500 ${
              currentIndex === index + 2 || currentIndex === index - 2
                ? "h-2 bg-sky-400"
                : "h-1 bg-sky-300"
            }`}
            onClick={(e) => selectIndexHandler(e, index + 1)}
            key={`carousel-index-${index}`}
          >
            {/* {index + 1} */}
          </div>
        ))}
      </div>
      <Button variant="default" size="sm" onClick={prevItemHandler}>
        Prev
      </Button>
      <Button variant="default" size="sm" onClick={nextItemHandler}>
        Next
      </Button>
      {/* </div> */}
    </div>
  );
};

export default Carousel;

const data = [
  {
    component: <div>end-1</div>,
  },
  {
    component: <div>end-2</div>,
  },
  {
    component: <div>end-3</div>,
  },
  {
    component: <div>end-4</div>,
  },
];
