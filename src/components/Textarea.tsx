import * as React from "react";
import { cn } from "../utils/classnames";

type CustomInputProps = {
  label: string;
  isResize?: boolean;
  height?: string;
  width?: string;
  errorMsg?: string;
};

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputProps = NativeTextareaProps & CustomInputProps;

function Textarea({
  name,
  label,
  isResize = false,
  placeholder,
  required,
  height,
  width,
  defaultValue,
  errorMsg,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm/6 font-medium text-gray-900 flex gap-1"
      >
        {label}
        {required && <p className="text-red-500">*</p>}
      </label>
      <div className="mt-2">
        <div
          className={cn(
            "flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600",
          )}
        >
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={props.onChange}
            {...props}
            className={cn(
              "block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6",
              width ? width : "w-full",
              height ? height : "h-full",
            )}
            style={{
              resize: isResize ? "both" : "none",
            }}
          />
        </div>
      </div>
      {errorMsg && <p className="text-red-500 text-xs">{errorMsg}</p>}
    </div>
  );
}

export { Textarea };
