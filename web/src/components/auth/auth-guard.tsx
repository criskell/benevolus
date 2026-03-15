'use client';

import { useEffect, type ComponentType } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { Spinner } from '@heroui/react';
import { useGetProfile } from '@/lib/http/generated/hooks/useGetProfile';

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthGuard = (props: P) => {
    const { data: profile, isLoading } = useGetProfile();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !profile?.id) {
        router.replace('/auth/login');
      }
    }, [isLoading, profile, router]);

    if (isLoading || !profile?.id) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spinner size="lg" />
        </div>
      );
    }

    return <Component {...props} />;
  };

  AuthGuard.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return AuthGuard;
};
