'use client';

import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { type FC } from 'react';

import { ZefirLogoTextHorizontalIcon } from '@/icons';

const Header: FC = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: 'flex',
          color: 'white',
          justifyContent: 'space-between',
          backgroundColor: 'text.primary',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <ZefirLogoTextHorizontalIcon sx={{ height: '100%', width: '110px' }} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>Warszawa</Typography>
          <IconButton>
            <Avatar
              sx={{
                height: 32,
                width: 32,
                backgroundColor: 'background.default',
              }}
            >
              <Image
                src="/static/images/herb-warszawa.svg"
                width={15}
                height={40}
                alt="Herb miasta Warszawa"
                style={{ marginRight: '1px' }}
              />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
