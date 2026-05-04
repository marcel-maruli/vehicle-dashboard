import { Eye, EyeClosed, Lock, Mail, UserKey, UserRound } from "lucide-react";
import { Input } from "@/components/Input";
import type { RegisterPayload } from "@/lib/users/models";
import { useQueryRegister } from "@/lib/users/queries";
import Modal from "@/components/Modal";
import Dropdown, { type Option } from "@/components/Dropdown";
import Button from "@/components/Button";
import { useToast } from "@/components/ToastProvider";
import { useForm } from "react-hook-form";
import { cn } from "@/utils/classnames";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useState } from "react";

const ROLE_OPTION = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Viewer",
  },
];

const ModalRegister = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [isLoadingSubmitted, setIsLoadingSubmitted] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      email: "",
      password: "",
      role: 1,
      username: "",
    },
  });
  const { showToast } = useToast();

  const { mutate: mutateRegister } = useQueryRegister();

  const registerSubmitted = () => {
    setIsLoadingSubmitted(true);
    mutateRegister(watch(), {
      onSuccess: (res) => {
        setIsLoadingSubmitted(false);
        showToast(`User ${res.username} registered!`, "success");
        reset();
        onToggle();
      },
      onError({ response }) {
        setIsLoadingSubmitted(false);
        showToast(String((response?.data as any)?.err_msg) || "Login failed");
      },
    });
  };

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            reset();
            onToggle();
          }}
          title="Register"
          className="w-150"
        >
          <form
            className="space-y-4"
            onSubmit={handleSubmit(registerSubmitted)}
          >
            <div
              className={cn(
                "flex gap-2 justify-between",
                errors.username || errors.role ? "" : "items-center",
              )}
            >
              <div className="w-full">
                <Input
                  {...register("username", {
                    required: "Username is required.",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters.",
                    },
                  })}
                  required
                  prefix={<UserRound size={18} />}
                  type="text"
                  label="Username"
                  placeholder="Enter username here..."
                  errorMsg={errors.username?.message}
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <p className="block text-sm/6 font-medium text-gray-900">
                  Role
                </p>
                <Dropdown
                  prefix={<UserKey size={18} />}
                  onChange={(e) => {
                    setValue("role", Number(e?.value));
                  }}
                  defaultValue={{
                    label: "Admin",
                    value: "1",
                  }}
                  classNameButton="w-full border border-gray-500"
                  options={
                    ROLE_OPTION?.map((option) => ({
                      label: option.name,
                      value: String(option.id),
                    })) as Option[]
                  }
                />
              </div>
            </div>

            <div>
              <Input
                prefix={<Mail size={18} />}
                type="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                errorMsg={errors.email?.message}
                required
                label="Email"
                placeholder="Enter email here..."
              />
            </div>
            <div>
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
            </div>
            {isLoadingSubmitted ? (
              <Button className="w-full" variant="primary" type="submit">
                <LoadingSpinner isOpen={isLoadingSubmitted} />
              </Button>
            ) : (
              <Button className="w-full" variant="primary" type="submit">
                Submit
              </Button>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalRegister;
