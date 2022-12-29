import { VariantsType } from "../Components/DataDisplay/Alert";

//HANDLER TO CONTROL TOAST PORTAL
export const toastCreator = (element: string, variant: VariantsType): void => {
  const variantValues = {
    default: "bg-slate-50 text-slate-500 border-l-4 border-slate-500",
    danger: "bg-red-50 text-red-500 border-l-4 border-red-500",
    success: "bg-green-50 text-green-500 border-l-4 border-green-500",
    info: "bg-sky-50 text-sky-500 border-l-4 border-sky-500",
    warning: "bg-orange-50 text-orange-500 border-l-4 border-orange-500",
  };

  const rootEl = document.querySelector("#toast-root");
  const parent = document.createElement("div");
  const child = document.createElement("div");

  //DEFAULT CLASSLIST
  child.classList.add(
    "px-4",
    "py-2",
    "my-1",
    "rounded-md",
    "animate-spring",
    "border-l-4"
  );
  //ADD MORE CLASSNAME BASED ON VARIANTS
  variantValues[variant as VariantsType]
    .split(" ")
    .forEach((el: any) => child.classList.add(el));

  child.innerHTML = element;
  parent.appendChild(child);
  // parent.classList.add("text-red-500");
  rootEl?.appendChild(parent);
  setTimeout(() => {
    parent.classList.add("animate-springout");
    setTimeout(() => {
      rootEl?.removeChild(parent);
    }, 1000);
  }, 3000);
};
