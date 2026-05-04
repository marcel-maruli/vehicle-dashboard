import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticationRoute() {
  const isToken = document.cookie.includes("token=");

  if (!isToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
