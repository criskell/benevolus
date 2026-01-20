"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = new FormData(e.currentTarget);

    const payload = {
      email: inputs.get("email"),
      password: inputs.get("password"),
    };

    console.log(payload);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-default-500 text-sm mt-1">
              Entre na sua conta para continuar
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            placeholder="seu@email.com"
            type="email"
            isRequired
            startContent={
              <Icon icon="solar:letter-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            isRequired
            startContent={
              <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
            }
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-default-400 hover:text-default-600 cursor-pointer"
              >
                <Icon
                  icon={showPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                  width={20}
                />
              </button>
            }
          />

          <div className="flex justify-end">
            <Link href="/auth/reset-password" className="text-primary text-sm hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <Button type="submit" color="primary" fullWidth size="lg">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-default-500">
          Não tem conta?{" "}
          <Link href="/auth/sign-up" className="text-primary font-medium hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
