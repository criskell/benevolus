"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

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
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
        </div>

        {step === "email" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Recuperar senha</h1>
              <p className="text-default-500 text-sm mt-1">
                Digite seu email para receber um código
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Email"
                name="email"
                placeholder="seu@email.com"
                type="email"
                isRequired
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={
                  <Icon icon="solar:letter-linear" className="text-default-400" width={20} />
                }
              />

              <div className="flex gap-3">
                <Button
                  as={Link}
                  href="/auth/login"
                  variant="flat"
                  fullWidth
                  size="lg"
                >
                  Voltar
                </Button>
                <Button type="submit" color="primary" fullWidth size="lg">
                  Enviar código
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "code" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Verificar código</h1>
              <p className="text-default-500 text-sm mt-1">
                Digite o código enviado para {email}
              </p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <Input
                label="Código de Verificação"
                name="code"
                placeholder="000000"
                type="text"
                isRequired
                value={code}
                onChange={(e) => setCode(e.target.value)}
                startContent={
                  <Icon icon="solar:shield-keyhole-linear" className="text-default-400" width={20} />
                }
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="flat"
                  fullWidth
                  size="lg"
                  onPress={() => setStep("email")}
                >
                  Voltar
                </Button>
                <Button type="submit" color="primary" fullWidth size="lg">
                  Verificar
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "password" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Nova senha</h1>
              <p className="text-default-500 text-sm mt-1">
                Crie uma nova senha para sua conta
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Nova Senha"
                name="password"
                placeholder="Digite sua nova senha"
                type="password"
                isRequired
                startContent={
                  <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
                }
              />
              <Input
                label="Confirmar Senha"
                name="confirmPassword"
                placeholder="Confirme a senha"
                type="password"
                isRequired
                startContent={
                  <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
                }
              />

              <Button type="submit" color="primary" fullWidth size="lg">
                Redefinir senha
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
