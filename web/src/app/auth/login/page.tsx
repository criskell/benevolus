"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";
import { useAuth } from "@/hooks/use-auth";
import { useTranslations } from "next-intl";
import { getCsrfToken, login } from "@/lib/http/generated";
import type { TranslateFn } from "@/types/i18n";

const createLoginSchema = (t: TranslateFn) =>
  z.object({
    email: z
      .string()
      .min(1, t("validation.email_required"))
      .email(t("validation.email_invalid")),
    password: z.string().min(1, t("validation.password_required")),
  });

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const t = useTranslations("auth.login");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await getCsrfToken();
    await login(data);

    auth.login({
      id: "1",
      name: data.email.split("@")[0],
      email: data.email,
    });

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <p className="text-default-500 text-sm mt-1">{t("subtitle")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("email_label")}
                placeholder={t("email_placeholder")}
                type="email"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                startContent={
                  <Icon
                    icon="solar:letter-linear"
                    className="text-default-400"
                    width={20}
                  />
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("password_label")}
                placeholder={t("password_placeholder")}
                type={showPassword ? "text" : "password"}
                isRequired
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                startContent={
                  <Icon
                    icon="solar:lock-linear"
                    className="text-default-400"
                    width={20}
                  />
                }
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-default-400 hover:text-default-600 cursor-pointer"
                  >
                    <Icon
                      icon={
                        showPassword
                          ? "solar:eye-closed-linear"
                          : "solar:eye-linear"
                      }
                      width={20}
                    />
                  </button>
                }
              />
            )}
          />

          <div className="flex justify-end">
            <Link
              href="/auth/reset-password"
              className="text-primary text-sm hover:underline"
            >
              {t("forgot_password")}
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            fullWidth
            size="lg"
            isLoading={isSubmitting}
          >
            {t("submit_button")}
          </Button>
        </form>

        <p className="text-center text-sm text-default-500">
          {t("no_account")}{" "}
          <Link
            href="/auth/sign-up"
            className="text-primary font-medium hover:underline"
          >
            {t("create_account")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
