import { Box, Button, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

import colors from '@/theme/colors';

export type LayoutTabHeaderProps =
  | {
      variant: 'add';
      onCancel: () => void;
      onSubmit: () => void;
    }
  | {
      variant: 'edit';
      title: string;
      subtitle?: string;
      onCancel: () => void;
      onSubmit: () => void;
    };

const LayoutTabHeader: FC<LayoutTabHeaderProps> = (props) => {
  const { variant, onCancel, onSubmit } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: variant === 'add' ? 'primary.main' : colors.yellow,
        p: '21px 16px 16px',
        height: '80px',
      }}
    >
      {variant === 'add' ? (
        <Typography fontWeight={600} ml={2}>
          Nowy: ...
        </Typography>
      ) : (
        <Typography fontWeight={600} ml={2} noWrap>
          Edycja: {props.title}
          <Typography component="span" display="block" fontSize="0.75rem" color="text.secondary" ml="62px" noWrap>
            {props.subtitle}
          </Typography>
        </Typography>
      )}
      <Stack direction="row" spacing="22px">
        <Button variant="contained" onClick={onCancel} data-cy="cancel-button">
          Anuluj
        </Button>
        <Button variant="contained" onClick={onSubmit} data-cy="confirm-button">
          Zapisz i zamknij
        </Button>
      </Stack>
    </Box>
  );
};

export default LayoutTabHeader;
