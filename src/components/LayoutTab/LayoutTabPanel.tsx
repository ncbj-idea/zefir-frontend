import type { BoxProps, CardProps } from '@mui/material';
import { Box, Card, CardContent } from '@mui/material';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import type { FC } from 'react';

import type { TabID } from './LayoutTabTypes';

const fallbackVariant: Variants = {
  active: { opacity: 1 },
  inactive: { opacity: 0 },
};

export interface LayoutTabPanelProps extends BoxProps {
  activeTabID: TabID;
  tabID: TabID;
  tabHeight?: string;
  children?: React.ReactNode;
  innerCardProps?: CardProps;
  tabContentVariant?: Variants;
  noBorder?: boolean;
  noPadding?: boolean;
}

const LayoutTabPanel: FC<LayoutTabPanelProps> = ({
  children,
  tabID,
  activeTabID,
  tabHeight = '100%',
  innerCardProps,
  tabContentVariant = fallbackVariant,
  noBorder = false,
  noPadding = false,
  ...props
}) => (
  <Box
    {...props}
    sx={{
      ...props.sx,
      height: tabHeight,
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderColor: 'divider',
    }}
    role="tabpanel"
    hidden={tabID !== activeTabID}
    id={`tabpanel-${tabID}`}
    aria-labelledby={`tab-${tabID}`}
  >
    {tabID === activeTabID && (
      <motion.div
        animate="active"
        initial="inactive"
        exit="inactive"
        variants={tabContentVariant}
        style={{ height: '100%' }}
      >
        <Card
          {...innerCardProps}
          sx={{
            ...innerCardProps?.sx,
            border: noBorder ? 'none' : '',
            boxShadow: 'none',
            borderTopLeftRadius: 'unset',
            height: '100%',
          }}
        >
          <CardContent sx={{ height: '100%', p: `${noPadding ? 0 : 21}px !important` }}>{children}</CardContent>
        </Card>
      </motion.div>
    )}
  </Box>
);

export default LayoutTabPanel;
