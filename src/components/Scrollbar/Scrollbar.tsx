import 'simplebar/dist/simplebar.min.css';

import type { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { ForwardedRef } from 'react';
import type { Props } from 'simplebar-react';
import SimpleBar from 'simplebar-react';

interface ScrollbarProps extends Props {
  ref?: ForwardedRef<any>;
  sx?: SxProps<Theme>;
}

const ScrollbarRoot = styled(SimpleBar)``;

const Scrollbar: React.FC<ScrollbarProps> = (props) => <ScrollbarRoot {...props} />;

export default Scrollbar;
