import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import AuthLayOut from "../Root/AuthLayOut";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Apartments from "../Pages/Apartments/Apartments";
import MyProfile from "../Pages/Dashboard/MyProfile";
import Announcements from "../Pages/Dashboard/Announcements";
import DashboardLayout from "../Root/DashboardLayout";
import PrivateRoute from "../Provider/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",

    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "Apartments",
        element: <Apartments></Apartments>,
      },
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: MyProfile },
      {
        path: "Announcements:",
        Component: Announcements,
      },
    ],
  },
]);
