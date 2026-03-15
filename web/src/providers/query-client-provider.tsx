'use client';

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';
import { useState, type PropsWithChildren } from 'react';

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};
