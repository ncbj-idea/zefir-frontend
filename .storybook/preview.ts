import { CssBaseline, ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { type addDecorator } from '@storybook/client-api';
import type { Preview } from '@storybook/react';

import theme from '@/components/ThemeRegistry/theme';

type DecoratorFunction = Parameters<typeof addDecorator>[0];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators: DecoratorFunction[] = [
  withThemeFromJSXProvider({
    themes: {
      theme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
];

export default preview;
