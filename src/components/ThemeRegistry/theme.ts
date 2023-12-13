import { blue, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { plPL } from '@mui/x-data-grid';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { Open_Sans } from 'next/font/google';

import colors from '@/theme/colors';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    lg2: true;
    lg3: true;
  }
}

export const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const mainTheme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1024,
        lg: 1366,
        lg2: 1535,
        lg3: 1679,
        xl: 1920,
      },
    },
    palette: {
      mode: 'light',
      background: {
        default: colors.background,
        paper: colors.background,
      },
      primary: {
        ...green,
        main: colors.mainGreen,
      },
      secondary: {
        ...blue,
        main: colors.blue,
      },
      text: {
        primary: colors.dark,
        secondary: colors.dark2,
      },
      divider: colors.gray,
    },
    typography: {
      fontFamily: openSans.style.fontFamily,
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          disableGutters: true,
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
            borderRadius: '5px',
            '& .MuiAccordionSummary-root': {
              padding: '30px 20px',
            },
            '&:hover': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-expanded': {
              borderColor: theme.palette.primary.main,
            },
            '&:before': {
              display: 'none',
            },
          }),
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          columnHeader: {
            background: colors.gray2,
          },
          columnHeaders: {
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          },
          columnHeaderTitle: {
            fontWeight: 'bold',
            fontSize: '12px',
            textOverflow: 'clip',
            whiteSpace: 'break-spaces',
            lineHeight: 1.2,
            textAlign: 'right',
          },
          columnHeaderTitleContainer: {
            marginBottom: 'auto',
            marginTop: '18px',
            alignItems: 'flex-start',
          },
          sortIcon: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
          cellContent: {
            fontWeight: '600',
            fontSize: '14px',
          },
          cell: {
            outline: 'none !important',
          },
          row: ({ theme }) => ({
            borderBottom: `2px solid ${theme.palette.divider}`,
          }),
          footerContainer: ({ theme }) => ({
            borderTop: `1px solid ${theme.palette.divider}`,
            borderColor: `${theme.palette.divider} !important`,
          }),
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
            '&.Mui-selected': {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& td': {
              color: `${theme.palette.text.primary} !important`,
            },
          }),
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& th': {
              color: `${theme.palette.text.primary} !important`,
            },
            '&:hover': {
              backgroundColor: colors.green,
              'td:first-of-type': {
                borderLeft: `1px solid ${theme.palette.primary.main}`,
                borderTop: `1px solid ${theme.palette.primary.main}`,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              },
              td: {
                borderTop: `1px solid ${theme.palette.primary.main} !important`,
                borderBottom: `1px solid ${theme.palette.primary.main} !important`,
                '&:after': {
                  backgroundColor: theme.palette.primary.main,
                },
              },
              'td:last-child': {
                borderTop: `1px solid ${theme.palette.primary.main}`,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                borderRight: `1px solid ${theme.palette.primary.main}`,
              },
            },
          }),
        },
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: colors.dark3,
            '& .MuiSvgIcon-root': {
              fontSize: 21,
            },
          },
        },
      },
    },
  },
  plPL,
);

export default mainTheme;
