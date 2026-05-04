import api from "../axios";
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./models";

export const useLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("api/users/login", {
    ...payload,
  });
    return res?.data;
};

export const useRegister = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("api/users/register", {
    ...payload,
  });
    return res?.data;
};

