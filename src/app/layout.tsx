import { Box, Toolbar } from '@mui/material';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { CityCoatOfArms, Header, Sidebar } from '@/components';
import { SWRProvider } from '@/components/SWRProvider';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { ReduxProvider } from '@/store';
import { AppConfig } from '@/utils/AppConfig';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: AppConfig.title,
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/static/images/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/images/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/images/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/static/images/favicon.ico',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={AppConfig.locale} className={openSans.className}>
      <body>
        <ReduxProvider>
          <SWRProvider>
            <ThemeRegistry>
              <NextTopLoader color="#16B559" showSpinner={false} />
              <Box
                sx={{
                  position: 'relative',
                  minHeight: '100vh',
                  display: 'flex',
                }}
              >
                <Header />
                <Sidebar logo={<CityCoatOfArms city="warszawa" />} />
                <Box flexGrow={1}>
                  <Toolbar />
                  {children}
                </Box>
              </Box>
            </ThemeRegistry>
          </SWRProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
