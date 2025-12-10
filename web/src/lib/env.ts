import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const isServer = typeof window === 'undefined';

export const env = createEnv({
  shared: {
    NEXT_PUBLIC_API_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
