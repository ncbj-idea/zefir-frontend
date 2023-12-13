import Box from '@mui/material/Box';
import type { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/system';
import type { FC, ReactNode } from 'react';

interface InputBaseProps {
  label?: TextFieldProps['label'];
  error?: TextFieldProps['error'];
  errorMessage?: string;
  children: ReactNode;
  errorSx?: SxProps;
}

const InputBase: FC<InputBaseProps> = ({ label, errorMessage, error, children, errorSx }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <Typography
      sx={{
        color: 'text.secondary',
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0.3px',
        fontWeight: 400,
        marginBottom: label ? '8px' : 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {label}
    </Typography>
    {children}
    <Typography
      sx={{
        ...errorSx,
        color: 'error.main',
        fontSize: '11px',
        lineHeight: '18px',
        letterSpacing: '0.28px',
        fontWeight: 400,
        marginLeft: '6px',
        pointerEvents: 'none',
        transition: 'opacity .2s linear',
        opacity: error && !!errorMessage ? 1 : 0,
        position: 'absolute',
        bottom: '-18px',
      }}
    >
      {errorMessage}
    </Typography>
  </Box>
);

export default InputBase;
