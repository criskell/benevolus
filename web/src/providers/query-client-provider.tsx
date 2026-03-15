'use client';

import { QueryClientProvider as QueryProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { getQueryClient } from '@/lib/get-query-client';

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};
