'use client';

import { createSvgIcon } from '@mui/material/utils';
import * as React from 'react';

export const SvgCheck = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path
      id="icon-check"
      d="M8.425,16a.652.652,0,0,1-.463-.192L4.692,12.541a.654.654,0,0,1,.925-.925l2.808,2.808,6.733-6.733a.654.654,0,0,1,.925.925l-7.2,7.2A.652.652,0,0,1,8.425,16Z"
      transform="translate(-4.5 -7.5)"
      fill="currentColor"
    />
  </svg>,
  'SvgCheckIcon',
);
export default SvgCheck;
