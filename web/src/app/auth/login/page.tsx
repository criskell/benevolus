"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from 'next-intl';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const t = useTranslations('auth.login');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = new FormData(e.currentTarget);

    const payload = {
      email: inputs.get("email"),
      password: inputs.get("password"),
    };

    console.log(payload);

    login({
      id: "1",
      name: payload.email?.toString().split("@")[0] || "Usuário",
      email: payload.email?.toString() || "",
    });

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-default-500 text-sm mt-1">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('email_label')}
            name="email"
            placeholder={t('email_placeholder')}
            type="email"
            isRequired
            startContent={
              <Icon icon="solar:letter-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label={t('password_label')}
            name="password"
            placeholder={t('password_placeholder')}
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
              {t('forgot_password')}
            </Link>
          </div>

          <Button type="submit" color="primary" fullWidth size="lg">
            {t('submit_button')}
          </Button>
        </form>

        <p className="text-center text-sm text-default-500">
          {t('no_account')}{" "}
          <Link href="/auth/sign-up" className="text-primary font-medium hover:underline">
            {t('create_account')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
