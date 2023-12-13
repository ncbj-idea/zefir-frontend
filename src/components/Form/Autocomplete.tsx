import { ExpandMore } from '@mui/icons-material';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import type { AutocompleteProps } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

export type FilteringSearchProps = Omit<
  Omit<AutocompleteProps<any, false, false, false>, 'renderInput'>,
  'onChange'
> & {
  label: string;
  onChange: (value: any | null) => void;
};

const StyledTextfield = styled(TextField)({
  '& label': {
    fontSize: '13.34px',
    lineHeight: '18px',
    letterSpacing: '0.3px',
    fontWeight: 400,
  },
  '& .MuiInputBase-root': {
    borderRadius: '5px',
    padding: '0 !important',
    '& .MuiInputAdornment-positionStart': {
      marginLeft: '10px',
    },
    '& .MuiInputBase-input': {
      padding: '10px 12px',
      letterSpacing: '0.35px',
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 400,
    },
    '& .MuiOutlinedInput-notchedOutline > legend > span': {
      fontSize: '10px',
      lineHeight: '18px',
      letterSpacing: '0.3px',
      fontWeight: 400,
    },
    '& .MuiAutocomplete-endAdornment': {
      right: '5px',
    },
  },
});

const Autocomplete: FC<FilteringSearchProps> = ({ label, ...props }) => {
  return (
    <MuiAutocomplete
      {...props}
      onChange={(_, newValue) => props.onChange(newValue)}
      popupIcon={<ExpandMore sx={{ width: '18px', color: 'text.secondary' }} />}
      renderInput={(params) => (
        <StyledTextfield
          {...params}
          fullWidth
          label={label}
          placeholder={props.placeholder}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default Autocomplete;
