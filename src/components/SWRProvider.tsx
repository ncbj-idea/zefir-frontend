'use client';

import { type FC, type ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { isLocalhostEnv } from '@/config';
import { swrLogger } from '@/libs/swr-logger';

export const SWRProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        use: isLocalhostEnv ? [swrLogger] : undefined,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
