import { Link } from "@heroui/react";
import React from "react";

type AuthLinkProps = {
  text: string;
  linkText: string;
  href: string;
}

export const AuthLink = ({ text, linkText, href }:AuthLinkProps) => {
  return (
    <p className="text-center text-small">
      {text} <Link href={href}>{linkText}</Link>
    </p>
  );
};
