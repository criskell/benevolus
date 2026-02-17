import { Button } from "@heroui/react";
import { ReactNode } from "react";

type AuthButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  color?: "primary" | "default" | "danger" | "warning" | "success";
  fullWidth?: boolean;
}

export const AuthButton = ({
  children,
  onClick,
  type = "submit",
  color = "primary",
  fullWidth = true,
}:AuthButtonProps) => {
  return (
    <Button type={type} color={color} fullWidth={fullWidth} onClick={onClick}>
      {children}
    </Button>
  );
};
