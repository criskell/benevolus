import { Card, CardBody } from "@heroui/react";
import { ReactNode } from "react";


interface AuthCardProps {
  title: string;
  children: ReactNode;
}

export const AuthCard = ({ title, children }:AuthCardProps) => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-[340px] mt-12">
        <CardBody className="overflow-hidden">
          <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
          {children}
        </CardBody>
      </Card>
    </div>
  );
};
