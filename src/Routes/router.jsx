import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import AuthLayOut from "../Root/AuthLayOut";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";


export const router = createBrowserRouter([
  {
    path: "/",
  
    Component: Root,
    children: [
      { index: true, Component: Home },
     
      {
        path: "/auth",
        element: <AuthLayOut></AuthLayOut>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
        ],
      },
    ],
  },
]);