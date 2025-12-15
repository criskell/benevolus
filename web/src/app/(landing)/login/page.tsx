"use client";
import React, { FormEvent } from "react";
import { Input, Link, Button, Card, CardBody } from "@heroui/react";

export default function App() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = new FormData(e.currentTarget);

    const payload = {
      name: inputs.get("email"),
      email: inputs.get("password"),
    };

    console.log(payload);
  };

  return (
    <div className="flex justify-center py-8">
      <Card className="w-[340px] mt-12">
        <CardBody className="overflow-hidden">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-4 py-4"
          >
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
              placeholder="Enter your password"
              type="password"
            />
            <p className="text-center text-small">
              Need to create an account? <Link href="/register">Sign up</Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button type="submit" fullWidth color="primary">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
