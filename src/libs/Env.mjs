/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const Env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_MAPBOX_API_KEY: z.string().nonempty(),
    NEXT_PUBLIC_API_URL: z.string().nonempty(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
