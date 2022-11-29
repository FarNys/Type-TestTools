import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Navbar from "../Components/Layout/Navbar";
import AuthPage from "../Pages/AuthPage/AuthPage";
import ComponentPage from "../Pages/Components/ComponentPage";
import Posts from "../Pages/Posts/Posts";
import TodoPage from "../Pages/TodoPage/TodoPage";

const routerList = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
      </>
    ),
  },
  {
    path: "/component/button",
    element: (
      <>
        <Navbar />
        <ComponentPage />
      </>
    ),
  },
  {
    path: "/posts",
    element: (
      <>
        <Navbar />
        <Posts />
      </>
    ),
  },
  {
    path: "/auth",
    element: (
      <>
        <Navbar />
        <AuthPage />
      </>
    ),
  },
  {
    path: "/todo",
    element: (
      <>
        <Navbar />
        <TodoPage />
      </>
    ),
  },
]);

export default routerList;
