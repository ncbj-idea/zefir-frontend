import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { FC } from 'react';

import colors from '@/theme/colors';

import type { TabID, TabType } from './LayoutTabTypes';

const TabBtn = styled(Button)(({ theme }) => ({
  height: '100%',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  lineHeight: '40px',
  overflow: 'hidden',
  paddingLeft: '14px',
  ':focus-visible': {
    outline: `1px solid ${theme.palette.primary.main}`,
    outlineOffset: -1,
  },
}));

export interface LayoutTabProps {
  activeTabID: TabID;
  tab: TabType;
  handleTabChange: (tabID: TabID, tabURL: string) => void;
  handleRemoveTab?: (tabID: TabID, tabURL: string) => void;
  isMain?: boolean;
}

const LayoutTab: FC<LayoutTabProps> = ({ activeTabID, handleTabChange, handleRemoveTab, isMain = false, tab }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: isMain ? '1fr' : '1fr 32px',
      border: `1px solid ${tab.tabID === activeTabID ? colors.gray : colors.gray3}`,
      borderBottomColor: 'transparent',
      borderTopLeftRadius: '7px',
      borderTopRightRadius: '7px',
      fontSize: '14px',
      fontWeight: 600,
      minWidth: '182px',
      maxWidth: '280px',
      height: '39px',
      backgroundColor: tab.tabID === activeTabID ? 'background.default' : colors.gray3,
      cursor: 'pointer',
      transition: 'all 200ms ease-in-out',
      position: 'relative',
      ml: isMain ? '20px' : 0,
      top: '1px',
    }}
  >
    <TabBtn
      onClick={() => handleTabChange(tab.tabID, tab.tabURL)}
      tabIndex={0}
      focusRipple={false}
      sx={{ pr: isMain ? '14px' : '' }}
    >
      <Typography component="h2" fontSize="0.875rem" fontWeight={600} noWrap textTransform="none">
        {tab.label}
      </Typography>
    </TabBtn>
    {!isMain && (
      <IconButton
        size="small"
        aria-label="delete"
        title="Remove tab"
        onClick={() => (handleRemoveTab ? handleRemoveTab(tab.tabID, tab.tabURL) : null)}
        sx={{ '& :hover': { color: 'text.primary' } }}
      >
        <CloseIcon />
      </IconButton>
    )}
  </Box>
);

export default LayoutTab;
