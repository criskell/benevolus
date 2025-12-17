"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import {
  AuthCard,
  AuthInput,
  AuthButton,
  AuthForm,
  AuthLink,
} from "@/app/auth/_components";

export default function App() {
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
    <AuthCard title="Login">
      <AuthForm onSubmit={handleSubmit}>
        <AuthInput
          label="Email"
          name="email"
          placeholder="seu@email.com"
          type="email"
        />
        <AuthInput
          label="Senha"
          name="password"
          placeholder="Digite sua senha"
          type="password"
        />
        <div className="flex flex-col gap-2">
          <AuthLink text="Não tem conta?" linkText="Criar conta" href="/auth/sign-up" />
          <p className="text-center text-small">
            Esqueceu a senha? <Link href="/auth/reset-password" className="text-primary">Recuperar aqui</Link>
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <AuthButton>Entrar</AuthButton>
        </div>
      </AuthForm>
    </AuthCard>
  );
}
