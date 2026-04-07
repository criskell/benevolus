import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const isServer = typeof window === 'undefined';

export const env = createEnv({
  shared: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_REVERB_APP_KEY: z.string().min(1),
    NEXT_PUBLIC_REVERB_HOST: z.string().min(1),
    NEXT_PUBLIC_REVERB_PORT: z.string().default('8080'),
    NEXT_PUBLIC_REVERB_SCHEME: z.enum(['http', 'https']).default('http'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_REVERB_APP_KEY: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    NEXT_PUBLIC_REVERB_HOST: process.env.NEXT_PUBLIC_REVERB_HOST,
    NEXT_PUBLIC_REVERB_PORT: process.env.NEXT_PUBLIC_REVERB_PORT,
    NEXT_PUBLIC_REVERB_SCHEME: process.env.NEXT_PUBLIC_REVERB_SCHEME,
  },
});
