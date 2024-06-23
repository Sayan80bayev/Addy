import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
const Template = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Template;
