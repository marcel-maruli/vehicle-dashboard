import type {  UserData } from "@/lib/users/models";
import { jwtDecode } from "jwt-decode";

export const getUserInfo = () : UserData => {
  const token = document.cookie.split("token=");

  return (jwtDecode(token[1]));
};
