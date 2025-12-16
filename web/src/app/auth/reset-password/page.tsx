"use client";
import React, { FormEvent, useState } from "react";
import { Link } from "@heroui/react";
import {
  AuthCard,
  AuthInput,
  AuthButton,
  AuthForm,
} from "@/app/auth/_components";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email enviado para:", email);
    setStep("code");
  };

  const handleCodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Código verificado");
    setStep("password");
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = new FormData(e.currentTarget);
    const payload = {
      password: inputs.get("password"),
      confirmPassword: inputs.get("confirmPassword"),
    };
    console.log("Senha redefinida:", payload);
  };

  return (
    <>
      {step === "email" && (
        <AuthCard title="Recuperar Senha">
          <AuthForm onSubmit={handleEmailSubmit}>
            <p className="text-sm text-center text-gray-600 mb-4">
              Digite seu email para receber um código de recuperação
            </p>
            <AuthInput
              label="Email"
              name="email"
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2">
              <AuthButton color="default" type="button">
                <Link href="/login" className="text-white">
                  Voltar
                </Link>
              </AuthButton>
              <AuthButton>Enviar Código</AuthButton>
            </div>
          </AuthForm>
        </AuthCard>
      )}

      {step === "code" && (
        <AuthCard title="Verificar Código">
          <AuthForm onSubmit={handleCodeSubmit}>
            <p className="text-sm text-center text-gray-600 mb-4">
              Digite o código de 6 dígitos enviado para {email}
            </p>
            <AuthInput
              label="Código de Verificação"
              name="code"
              placeholder="000000"
              type="text"
              value=""
            />
            <div className="flex gap-2">
              <AuthButton
                color="default"
                type="button"
                onClick={() => setStep("email")}
              >
                Voltar
              </AuthButton>
              <AuthButton>Verificar Código</AuthButton>
            </div>
          </AuthForm>
        </AuthCard>
      )}

      {step === "password" && (
        <AuthCard title="Definir Nova Senha">
          <AuthForm onSubmit={handlePasswordSubmit}>
            <AuthInput
              label="Nova Senha"
              name="password"
              placeholder="Digite sua nova senha"
              type="password"
            />
            <AuthInput
              label="Confirmar Senha"
              name="confirmPassword"
              placeholder="Confirme a senha"
              type="password"
            />
            <div className="flex gap-2 justify-end">
              <AuthButton>Redefinir Senha</AuthButton>
            </div>
          </AuthForm>
        </AuthCard>
      )}
    </>
  );
}
