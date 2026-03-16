"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LogoIcon } from "@/components/icons/logo";
import { useTranslations } from "next-intl";
import { getCsrfToken, register, getProfileQueryKey } from "@/lib/http/generated";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import type { TranslateFn } from "@/types/i18n";

const createSignUpSchema = (t: TranslateFn) =>
  z
    .object({
      name: z
        .string()
        .min(1, t("validation.name_required"))
        .min(2, t("validation.name_min")),
      email: z
        .string()
        .min(1, t("validation.email_required"))
        .email(t("validation.email_invalid")),
      password: z
        .string()
        .min(1, t("validation.password_required"))
        .min(8, t("validation.password_min")),
      password_confirmation: z
        .string()
        .min(1, t("validation.password_confirmation_required")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("validation.password_mismatch"),
      path: ["password_confirmation"],
    });

type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;

export const SignUpForm = () => {
  const t = useTranslations("auth.signup");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    await getCsrfToken();
    await register(data);
    await queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });
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
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("name_label")}
                placeholder={t("name_placeholder")}
                type="text"
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                startContent={
                  <Icon
                    icon="solar:user-linear"
                    className="text-default-400"
                    width={20}
                  />
                }
              />
            )}
          />
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
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t("confirm_password_label")}
                placeholder={t("confirm_password_placeholder")}
                type={showConfirmPassword ? "text" : "password"}
                isRequired
                isInvalid={!!errors.password_confirmation}
                errorMessage={errors.password_confirmation?.message}
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
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-default-400 hover:text-default-600 cursor-pointer"
                  >
                    <Icon
                      icon={
                        showConfirmPassword
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
          {t("have_account")}{" "}
          <Link
            href="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};
