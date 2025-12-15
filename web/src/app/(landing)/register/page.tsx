"use client";

import { Button, Card, Link, CardBody, Input } from "@heroui/react";
import { FormEvent } from "react";

const registerPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = new FormData(e.currentTarget);

    if (inputs.get("password") != inputs.get("passwordConfirm")) {
      console.log({ mensagem: "Password e Confirm Password estão diferentes" });
      return;
    }

    const payload = {
      name: inputs.get("name"),
      email: inputs.get("email"),
      password: inputs.get("password"),
    };

    console.log(payload);
  };
  return (
    <div className="flex justify-center py-8">
      <Card className="w-[340px]">
        <CardBody className="overflow-hidden">
          <form
            className="flex flex-col gap-4 py-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              isRequired
              label="Name"
              name="name"
              placeholder="Enter your name"
              type="text"
            />
            <Input
              isRequired
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <Input
              isRequired
              label="Password"
              name="password"
              placeholder="Create a password"
              type="password"
            />
            <Input
              isRequired
              name="passwordConfirm"
              label="Password"
              placeholder="Comfirm Password"
              type="password"
            />
            <p className="text-center text-small">
              Already have an account? <Link href={"/login"}>Login</Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button fullWidth type="submit" color="primary">
                Sign Up
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default registerPage;
