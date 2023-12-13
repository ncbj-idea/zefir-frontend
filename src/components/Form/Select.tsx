import MenuItem from '@mui/material/MenuItem';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { useState } from 'react';

import { ChevronDownIcon } from '@/icons';

import InputBase from './InputBase';

export interface InputOption {
  value: string | number;
  label: string;
}

export type FormSelectProps = Omit<TextFieldProps, 'onChange'> & {
  errorMessage?: string;
  options: InputOption[];
  onChange: (value: InputOption) => void;
  iconColor?: string;
};

const Select: FC<FormSelectProps> = ({ label, errorMessage, options, error, onChange, iconColor, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <InputBase label={label} errorMessage={errorMessage} error={error}>
      <TextField
        {...props}
        fullWidth
        select
        SelectProps={{
          onOpen: () => {
            setIsOpen(true);
          },
          onClose: () => {
            setIsOpen(false);
          },
          defaultValue: '',
          // @TODO fix this error
          // eslint-disable-next-line react/no-unstable-nested-components
          IconComponent: () => (
            <ChevronDownIcon
              sx={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                width: '18px',
                color: iconColor || 'text.secondary',
                position: 'relative',
                right: '10px',
                pointerEvents: 'none',
              }}
            />
          ),
          ...props.SelectProps,
        }}
        InputProps={{
          onChange: (event) => {
            const option = options.find((o) => o.value === event.target.value);
            if (option) {
              onChange(option);
            }
          },
          sx: {
            borderRadius: '12px',
            backgroundColor: 'background.default',
            transition: 'border .2s linear',
            fontSize: '14px',
            lineHeight: '18px',
            fontWeight: 600,
            '& .MuiSelect-select': {
              padding: '12px',
              '&::placeholder': {
                color: 'text.secondary',
              },
            },
            '&.Mui-disabled': {
              backgroundColor: 'divider',
            },
          },
          ...props.InputProps,
        }}
      >
        {options.length ? (
          options.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{ backgroundColor: 'white !important' }}>Brak</MenuItem>
        )}
      </TextField>
    </InputBase>
  );
};
export default Select;
