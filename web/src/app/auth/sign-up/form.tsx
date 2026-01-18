"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";

const api = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
  withXSRFToken: true,
});

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.get("/sanctum/csrf-cookie");
    await api.post("/auth/register", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">Criar sua conta</h1>
            <p className="text-default-500 text-sm mt-1">
              Junte-se à nossa comunidade
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            name="name"
            placeholder="Seu nome completo"
            type="text"
            isRequired
            value={formData.name}
            onChange={handleChange}
            startContent={
              <Icon icon="solar:user-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label="Email"
            name="email"
            placeholder="seu@email.com"
            type="email"
            isRequired
            value={formData.email}
            onChange={handleChange}
            startContent={
              <Icon icon="solar:letter-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label="Senha"
            name="password"
            placeholder="Crie uma senha forte"
            type="password"
            isRequired
            value={formData.password}
            onChange={handleChange}
            startContent={
              <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label="Confirmar Senha"
            name="password_confirmation"
            placeholder="Confirme sua senha"
            type="password"
            isRequired
            value={formData.password_confirmation}
            onChange={handleChange}
            startContent={
              <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
            }
          />

          <Button type="submit" color="primary" fullWidth size="lg">
            Cadastrar
          </Button>
        </form>

        <p className="text-center text-sm text-default-500">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
};
