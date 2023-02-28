import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Navbar from "../Components/Layout/Navbar";
import AuthPage from "../Pages/AuthPage/AuthPage";
import ComponentPage from "../Pages/Components/ComponentPage";
import DndContainer from "../Pages/DndContainer/DndContainer";
import Posts from "../Pages/Posts/Posts";
import Sheet from "../Pages/Sheet/Sheet";
import TodoPage from "../Pages/TodoPage/TodoPage";
import TodoRTKQ from "../Pages/TodoRTKQ/TodoRTKQ";
import SheetProvider from "../Pages/Sheet/SheetProvider";
import Virtualize from "../Pages/Virtualize/Virtualize";
import SheetVirtualizeProvider from "../Pages/SheetVirtualize/SheetVirtualizeProvider";

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
  {
    path: "/dnd",
    element: (
      <>
        <Navbar />
        <DndContainer />
      </>
    ),
  },
  {
    path: "/dnd-multiple-container",
    element: (
      <>
        <Navbar />
        <DndContainer />
      </>
    ),
  },
  {
    path: "/todo-rtkq",
    element: (
      <>
        <Navbar />
        <TodoRTKQ />
      </>
    ),
  },
  {
    path: "/sheet",
    element: (
      <>
        <Navbar />
        <SheetProvider />
      </>
    ),
  },
  {
    path: "/sheet-virtualize",
    element: (
      <>
        <Navbar />
        <SheetVirtualizeProvider />
      </>
    ),
  },
  {
    path: "/virtual",
    element: (
      <>
        <Navbar />
        <Virtualize />
      </>
    ),
  },
]);

export default routerList;
