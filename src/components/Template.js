import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import useTokenExpiration from "./auth/hooks";
import { useNavigate } from 'react-router-dom';

const Template = () => {
  const token = localStorage.getItem("authToken");
  const isExpired = useTokenExpiration(token);
  const navigate = useNavigate();
  if(isExpired) return navigate("/login")
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Template;
