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
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminRoute from "../Provider/AdminRoute";
import MemberRoute from "../Provider/MemberRoute";
import UserRoute from "../Provider/UserRoute";
import Forbidden from "../components/Forbidden";
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
        path:"forbidden",
        Component:Forbidden
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
 {
        index:true,
        Component:DashboardHome
      },
     
   

    // user
    { path: "profile", element: <UserRoute><UserProfile /></UserRoute> },
    { path: "announcements", element: <UserRoute><UserAnnouncements /></UserRoute> },

    // Member
    { path: "make-payment", element: <MemberRoute><MakePayment /></MemberRoute> },
    { path: "payment-history", element: <MemberRoute><PaymentHistory /></MemberRoute> },
    { path: "MemberAnnouncements", element: <MemberRoute><MemberAnnouncements /></MemberRoute> },
    { path: "memberProfile", element: <MemberRoute><MemberProfile /></MemberRoute> },

    // Admin
    { path: "admin-profile", element: <AdminRoute><AdminProfile /></AdminRoute> },
    { path: "manage-members", element: <AdminRoute><ManageMembers /></AdminRoute> },
    { path: "make-announcement", element: <AdminRoute><MakeAnnouncement /></AdminRoute> },
    { path: "agreement-requests", element: <AdminRoute><AgreementRequests /></AdminRoute> },
    { path: "manage-coupons", element: <AdminRoute><ManageCoupons /></AdminRoute> },
  ]
}
]);
