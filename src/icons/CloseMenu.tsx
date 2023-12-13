'use client';

import { createSvgIcon } from '@mui/material/utils';
import * as React from 'react';

export const SvgCloseMenu = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor">
    <path
      id="icon_close_menu"
      d="M641,4679.854v-18.208a.9.9,0,0,1,1.793,0v18.208a.9.9,0,0,1-1.793,0Zm8.606-2.482-5.977-5.969a.894.894,0,0,1,0-1.267l5.977-5.969a.9.9,0,0,1,1.269,1.266l-4.447,4.442H660.1a.9.9,0,1,1,0,1.792H646.428l4.447,4.44a.9.9,0,0,1-1.269,1.267Z"
      transform="translate(-641 -4660.75)"
      fill="currentColor"
    />
  </svg>,
  'SvgCloseMenuIcon',
);
export default SvgCloseMenu;