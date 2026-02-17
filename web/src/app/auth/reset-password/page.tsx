"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";
import { useTranslations } from 'next-intl';

const ResetPasswordPage = () => {
  const t = useTranslations('auth.reset_password');
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <h1 className="text-2xl font-bold">{t('title')}</h1>
              <p className="text-default-500 text-sm mt-1">
                {t('subtitle')}
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label={t('email_label')}
                name="email"
                placeholder={t('email_placeholder')}
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
                  {t('back_button')}
                </Button>
                <Button type="submit" color="primary" fullWidth size="lg">
                  {t('send_code_button')}
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "code" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t('verify_title')}</h1>
              <p className="text-default-500 text-sm mt-1">
                {t('verify_subtitle', { email })}
              </p>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <Input
                label={t('code_label')}
                name="code"
                placeholder={t('code_placeholder')}
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
                  {t('back_button')}
                </Button>
                <Button type="submit" color="primary" fullWidth size="lg">
                  {t('verify_button')}
                </Button>
              </div>
            </form>
          </>
        )}

        {step === "password" && (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t('new_password_title')}</h1>
              <p className="text-default-500 text-sm mt-1">
                {t('new_password_subtitle')}
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label={t('new_password_label')}
                name="password"
                placeholder={t('new_password_placeholder')}
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
              <Input
                label={t('confirm_password_label')}
                name="confirmPassword"
                placeholder={t('confirm_password_placeholder')}
                type={showConfirmPassword ? "text" : "password"}
                isRequired
                startContent={
                  <Icon icon="solar:lock-linear" className="text-default-400" width={20} />
                }
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-default-400 hover:text-default-600 cursor-pointer"
                  >
                    <Icon
                      icon={showConfirmPassword ? "solar:eye-closed-linear" : "solar:eye-linear"}
                      width={20}
                    />
                  </button>
                }
              />

              <Button type="submit" color="primary" fullWidth size="lg">
                {t('reset_button')}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
