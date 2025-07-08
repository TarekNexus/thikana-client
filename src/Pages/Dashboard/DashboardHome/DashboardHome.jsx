import React from "react";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../../components/Loading";

import UserProfile from "../User/UserProfile";
import MemberProfile from "../Member/MemberProfile";
import AdminProfile from "../Admin/AdminProfile";
import Forbidden from "../../../components/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "user") {
    return <UserProfile></UserProfile>;
  } else if (role === "member") {
    return <MemberProfile></MemberProfile>;
  } else if (role === "admin") {
    return <AdminProfile></AdminProfile>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
