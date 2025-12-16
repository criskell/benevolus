import React, { FormEvent } from "react";

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const AuthForm = ({ children, onSubmit }:AuthFormProps) => {
  return (
    <form className="flex flex-col gap-4 py-4" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
