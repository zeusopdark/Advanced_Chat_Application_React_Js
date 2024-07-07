import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

export const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};
export const ProtectedAdminRoute=({children,admin,redirect="/admin"})=>{
  if(!admin)return <Navigate to={redirect}/>;
  return children?children:<Outlet/>
}


