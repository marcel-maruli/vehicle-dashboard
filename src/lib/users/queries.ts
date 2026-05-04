import { useMutation } from "@tanstack/react-query";
import {
  type LoginPayload,
  type LoginResponse,
  type RegisterPayload,
  type RegisterResponse,
} from "./models";
import { useLogin, useRegister } from "./apis";
import type { AxiosError } from "axios";
import { useToast } from "@/components/ToastProvider";
import type { ApiError } from "@/types/api";

export const useQueryLogin = () =>
  useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationKey: ["login"],
    mutationFn: (payload: LoginPayload) => useLogin(payload),
  });

export const useQueryRegister = () =>
  useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterPayload) => useRegister(payload),
    onError: ({ response }) => {
      useToast().showToast(
        String((response?.data as any)?.err_msg) || "Login failed",
        "error",
      );
    },
  });
