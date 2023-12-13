'use client';

import { createSvgIcon } from '@mui/material/utils';
import * as React from 'react';

export const SvgArrowUp = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path
      id="icon-arrow-up"
      d="M10.293,3.293a1,1,0,0,1,1.414,0l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,1,1-1.414-1.414L14.586,11H3A1,1,0,0,1,3,9H14.586L10.293,4.707a1,1,0,0,1,0-1.414Z"
      transform="translate(-3 18) rotate(-90)"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>,
  'SvgArrowUpIcon',
);
export default SvgArrowUp;
