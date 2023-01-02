import { useCallback, useRef, useState } from "react";

const useDirection = (): [any, () => void] => {
  const bodyElement = document.querySelector("body") as HTMLBodyElement;
  const direction = useRef<string>("");
  direction.current = bodyElement.dir;
  const changeDirection = useCallback((): void => {
    if (bodyElement.dir === "rtl") {
      direction.current = "ltr";
      bodyElement.dir = "ltr";
    } else {
      direction.current = "rtl";
      bodyElement.dir = "rtl";
    }
  }, [direction, bodyElement]);
  return [direction.current, changeDirection];
};

export default useDirection;
