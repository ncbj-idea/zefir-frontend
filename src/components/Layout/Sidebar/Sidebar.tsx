'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { CloseMenuIcon, FlagIcon, ScenarioIcon } from '@/icons';
import { useDispatch, useSelector } from '@/store';
import { toggleSidebar } from '@/store/slices/ui';

import SidebarItem from './SidebarItem';

export interface SidebarProps {
  children?: ReactNode;
  logo?: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ logo, children }) => {
  const dispatch = useDispatch();

  const navbarHeight = 64;
  const fullWidth = 280;
  const collapsedWidth = 82;
  const transitionDuration = '0.3s';

  const asideRef = useRef<HTMLDivElement>(null);
  const asideParentRef = useRef<HTMLDivElement>(null);
  const collapseBtnRef = useRef<HTMLButtonElement>(null);
  const logoSpanRef = useRef<HTMLDivElement>(null);

  const [isSidebarStateChecked, setIsSidebarStateChecked] = useState(false);

  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  useEffect(() => {
    if (isSidebarStateChecked && asideRef.current) {
      asideRef.current.style.transition = `width ${transitionDuration}, left ${transitionDuration}`;
    }
    if (isSidebarStateChecked && asideParentRef.current) {
      asideParentRef.current.style.transition = `padding-left ${transitionDuration}`;
    }
    if (isSidebarStateChecked && collapseBtnRef.current) {
      collapseBtnRef.current.style.transition = `width ${transitionDuration}`;
    }
    if (isSidebarStateChecked && logoSpanRef.current) {
      logoSpanRef.current.style.transition = `width ${transitionDuration}, left ${transitionDuration}`;
    }
  }, [isSidebarStateChecked]);

  useEffect(() => {
    const savedSidebarState = window.localStorage.getItem('sidebar-state');

    if (savedSidebarState === 'false') {
      dispatch(toggleSidebar(false));
    }
    setIsSidebarStateChecked(true);
  }, [dispatch]);

  const menuItems = [
    { name: 'Stan obecny 2023', href: '/', icon: <FlagIcon /> },
    { name: 'Scenariusze transformacji', href: '/scenarios', icon: <ScenarioIcon /> },
  ];

  const handleCollapseBtnClick = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };

  return (
    <Box
      ref={asideParentRef}
      sx={{
        paddingLeft: isSidebarOpen ? `${fullWidth}px` : `${collapsedWidth}px`,
      }}
    >
      <Box
        ref={asideRef}
        component="aside"
        sx={{
          background: 'background.default',
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: '600',
          width: isSidebarOpen ? `${fullWidth}px` : `${collapsedWidth}px`,
          top: `${navbarHeight}px`,
          borderRight: '1px solid #E0E0E0',
        }}
      >
        <Box
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          {typeof logo !== 'undefined' && (
            <Box
              sx={{
                height: '112px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                textDecoration: 'none',
                backgroundColor: 'background.default',
                padding: 0,
                border: 0,
                borderBottomWidth: '1px',
                borderBottomColor: 'divider',
              }}
            >
              <Typography
                ref={logoSpanRef}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  width: isSidebarOpen ? '202px' : '0px',
                  overflow: 'hidden',
                  position: 'relative',
                  left: '21px',
                }}
                component="span"
              >
                {logo}
              </Typography>
              <Button
                ref={collapseBtnRef}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: '48px',
                  width: isSidebarOpen ? '48px' : '82px',
                  color: 'text.secondary',
                }}
                onClick={handleCollapseBtnClick}
              >
                <CloseMenuIcon
                  sx={{
                    width: '22px',
                    height: '22px',
                    transform: `rotate(${isSidebarOpen ? '0' : '180'}deg)`,
                    transformOrigin: 'center',
                    transition: `transform ${transitionDuration}`,
                  }}
                />
              </Button>
            </Box>
          )}
          <List>
            {menuItems.map((item) => (
              <SidebarItem key={`${item.name}_${item.href}`} onlyIcon={!isSidebarOpen} {...item} />
            ))}
          </List>
        </Box>
      </Box>
      <Box sx={{ overflowX: 'hidden' }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
