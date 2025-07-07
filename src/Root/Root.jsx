import React from "react";

import { Outlet, ScrollRestoration } from "react-router";
import Navber from "../Pages/Home/Navber/Navber";
import Footer from "../Pages/Home/Footer/Footer";


const Root = () => {
  return (
    <div>
      <Navber></Navber>
      <div className="min-h-[calc(100vh-150px)] relative">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ScrollRestoration></ScrollRestoration>
    </div>
  );
};

export default Root;