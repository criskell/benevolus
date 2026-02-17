import { Input } from "@heroui/react";
import React, { ChangeEvent } from "react";

type AuthInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({
  label,
  name,
  type = "text",
  placeholder,
  isRequired = true,
  value,
  onChange,
}: AuthInputProps) => {
  return (
    <Input
      isRequired={isRequired}
      label={label}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
