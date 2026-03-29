"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Spinner } from "@heroui/react";
import { LogoIcon } from "@/components/icons/logo";
import { useTranslations } from "next-intl";
import { getCsrfToken, oauthCallback, getProfileQueryKey } from "@/lib/http/generated";
import { useQueryClient } from "@tanstack/react-query";

function OAuthCallbackContent() {
  const { provider } = useParams<{ provider: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.oauth");
  const [error, setError] = useState<string | null>(null);
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code) {
      setError(t("missing_params"));
      return;
    }

    (async () => {
      try {
        await getCsrfToken();
        await oauthCallback(provider, { params: { code, state } });
        await queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });
        router.push("/campaigns");
      } catch {
        setError(t("error"));
      }
    })();
  }, [provider, searchParams, router, queryClient, t]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <LogoIcon size={48} className="text-primary" />
        </div>

        {error ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-danger-50 border border-danger-200">
              <p className="text-sm text-danger">{error}</p>
            </div>
            <Link
              href="/auth/login"
              className="block text-center text-primary font-medium hover:underline"
            >
              {t("back_to_login")}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <p className="text-default-500 text-sm">{t("processing")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
