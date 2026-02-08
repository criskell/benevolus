"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";
import { useTranslations } from 'next-intl';

const api = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
  withXSRFToken: true,
});

export const SignUpForm = () => {
  const t = useTranslations('auth.signup');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <p className="text-default-500 text-sm mt-1">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('name_label')}
            name="name"
            placeholder={t('name_placeholder')}
            type="text"
            isRequired
            value={formData.name}
            onChange={handleChange}
            startContent={
              <Icon icon="solar:user-linear" className="text-default-400" width={20} />
            }
          />
          <Input
            label={t('email_label')}
            name="email"
            placeholder={t('email_placeholder')}
            type="email"
            isRequired
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            name="password_confirmation"
            placeholder={t('confirm_password_placeholder')}
            type={showConfirmPassword ? "text" : "password"}
            isRequired
            value={formData.password_confirmation}
            onChange={handleChange}
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
            {t('submit_button')}
          </Button>
        </form>

        <p className="text-center text-sm text-default-500">
          {t('have_account')}{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
};
