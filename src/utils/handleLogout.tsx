import { deleteCookie } from "./clearCookie";

export const handleLogout = () => {
  deleteCookie("token");
};
