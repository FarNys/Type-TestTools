import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ComponentPage from "../Pages/Components/ComponentPage";
import Posts from "../Pages/Posts/Posts";

const routerList = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/component/button",
    element: <ComponentPage />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

export default routerList;
