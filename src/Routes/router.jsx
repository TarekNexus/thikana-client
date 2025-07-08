import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

import AuthLayOut from "../Root/AuthLayOut";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import Apartments from "../Pages/Apartments/Apartments";
import DashboardLayout from "../Root/DashboardLayout";
import PrivateRoute from "../Provider/PrivateRoute";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import UserAnnouncements from "../Pages/Dashboard/User/UserAnnouncements";
import MakePayment from "../Pages/Dashboard/Member/MakePayment";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory";
import MemberAnnouncements from "../Pages/Dashboard/Member/MemberAnnouncements";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import MemberProfile from "../Pages/Dashboard/Member/MemberProfile";
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
  element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  children: [
    // User
    { path: "profile", element: <UserProfile /> },
    { path: "announcements", element: <UserAnnouncements /> },

    // Member
    { path: "make-payment", element: <MakePayment /> },
    { path: "payment-history", element: <PaymentHistory /> },
    { path: "announcements", element: <MemberAnnouncements /> },
    { path: "memberProfile", element: <MemberProfile /> },

    // Admin
    { path: "admin-profile", element: <AdminProfile /> },
    { path: "manage-members", element: <ManageMembers /> },
    { path: "make-announcement", element: <MakeAnnouncement /> },
    { path: "agreement-requests", element: <AgreementRequests /> },
    { path: "manage-coupons", element: <ManageCoupons /> },
  ]
}
]);
