import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useDisclosure } from "../../utils/useDisclosure";
import type { LoginPayload } from "../../lib/users/models";
import { useQueryLogin } from "../../lib/users/queries";
import { Navigate, useNavigate } from "react-router-dom";
import ModalRegister from "./components/ModalRegister";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ToastProvider";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Login = () => {
  const queryClient = useQueryClient();
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const token = document.cookie.includes("token=");
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { mutate: loginMutation } = useQueryLogin();

  const loginSubmitted = (data: LoginPayload) => {
    setIsLoading(true);
    loginMutation(watch(), {
      onSuccess: (res) => {
        document.cookie = `token=${res.token}`;
        showToast("Login Success!", "success");
        queryClient.invalidateQueries({ queryKey: ["all-tickets"] });
        navigate("/");
        setIsLoading(false);
      },
      onError(res) {
        showToast(res.err_msg, "error");
        setIsLoading(false);
      },
    });
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="bg-white flex flex-col items-center min-h-full min-w-full text-gray-800 pt-30 gap-10">
        <ModalRegister isOpen={isOpen} onToggle={onToggle} />
        <div className="bg-white/65 w-full max-w-4xl min-h-[40vh] rounded-lg shadow-lg overflow-hidden border border-gray-300 flex">
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit(loginSubmitted)}>
              <Input
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                errorMsg={errors.email?.message}
                prefix={<Mail size={18} />}
                label="Email"
                placeholder="Enter email here..."
              />
              <Input
                required
                prefix={<Lock size={18} />}
                suffix={
                  <button
                    className="px-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewPassword(!viewPassword);
                    }}
                  >
                    {viewPassword ? (
                      <Eye size={16} color="gray" />
                    ) : (
                      <EyeClosed size={16} color="gray" />
                    )}
                  </button>
                }
                type={viewPassword ? "text" : "password"}
                label="Password"
                {...register("password", {
                  required: "Password is required",
                })}
                errorMsg={errors.password?.message}
                placeholder="Enter password here..."
              />
              {isLoading ? (
                <Button
                  className="w-full"
                  variant="monochrome"
                  type="submit"
                  disabled
                >
                  <LoadingSpinner isOpen={isLoading} />
                </Button>
              ) : (
                <Button className="w-full" variant="monochrome" type="submit">
                  Login
                </Button>
              )}
            </form>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Don't have an account?
            </h2>
            <p className="mb-4">
              Sign up now here to create an account and start managing your
              projects with ease!
            </p>
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-gray-800 to-gray-500 hover:from-gray-900 hover:to-gray-700 text-white py-2 rounded-md transition duration-200"
              onClick={onToggle}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
