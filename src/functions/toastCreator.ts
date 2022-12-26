//HANDLER TO CONTROL TOAST PORTAL
export const toastCreator = (title: string) => {
  const rootEl = document.querySelector("#toast-root");
  const parent = document.createElement("div");
  const child = document.createElement("div");
  child.classList.add(
    "bg-red-100",
    "text-red-500",
    "px-4",
    "py-2",
    "my-1",
    "rounded-md",
    "animate-spring"
  );
  child.textContent = title;
  parent.appendChild(child);
  parent.classList.add("text-red-500");
  rootEl?.appendChild(parent);
  setTimeout(() => {
    parent.classList.add("animate-springout");
    setTimeout(() => {
      rootEl?.removeChild(parent);
    }, 1000);
  }, 3000);
};
