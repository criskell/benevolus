"use client";

import axios from "axios";
import { useState } from "react";
import {
  AuthCard,
  AuthInput,
  AuthButton,
  AuthForm,
  AuthLink,
} from "@/app/auth/_components";

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
    <AuthCard title="Criar Conta">
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          label="Nome Completo"
          name="name"
          placeholder="Seu nome completo"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <AuthInput
          label="Email"
          name="email"
          placeholder="seu@email.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <AuthInput
          label="Senha"
          name="password"
          placeholder="Crie uma senha forte"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <AuthInput
          label="Confirmar Senha"
          name="password_confirmation"
          placeholder="Confirme sua senha"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        <AuthLink text="Já tem uma conta?" linkText="Fazer login" href="/auth/login" />
        <div className="flex gap-2 justify-end">
          <AuthButton>Cadastrar</AuthButton>
        </div>
      </AuthForm>
    </AuthCard>
  );
};
