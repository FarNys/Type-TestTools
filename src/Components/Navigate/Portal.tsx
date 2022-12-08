import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

type ModalProps = {
  children: ReactNode;
  show: boolean;
};

function Modal({ children, show }: ModalProps) {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    el.classList.add("modal");
    modalRoot.appendChild(el);
    return () => {
      el.classList.remove("modal");
      modalRoot.removeChild(el);
    };
  }, [show]);
  const clickOutsideListener = (e: any) => {
    const modalEl = document.querySelector("#modal-root");
    const modalClass = document.querySelector("#modal");
    console.log(modalClass);
    if (!modalEl?.contains(e.target) && modalClass) {
      modalEl?.removeChild(modalClass);
      console.log("CONTAIN");
    } else {
      console.log("Not Contain");
    }
    // if (e.target.contain("modal")) {
    //   console.log("CONTAIN");
    // } else {
    //   console.log("NOT !");
    // }
  };

  useEffect(() => {
    window.addEventListener("click", clickOutsideListener);
    return () => {
      window.removeEventListener("click", clickOutsideListener);
    };
  }, []);

  return show ? createPortal(children, elRef.current) : null;
}

export default Modal;
