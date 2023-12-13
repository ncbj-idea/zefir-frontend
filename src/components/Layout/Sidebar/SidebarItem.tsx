'use client';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, type ReactNode } from 'react';

interface ItemProps {
  name: string;
  href: string;
  icon: ReactNode;
  onlyIcon?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const SidebarItem: FC<ItemProps> = ({ name, icon, onlyIcon, isOpen, href, onClick }) => {
  const currentRoute = usePathname();
  const isRoot = href === '/';
  const isActive = isRoot ? currentRoute === '/' : currentRoute.indexOf(href) !== -1;
  const color = isActive ? 'primary.main' : 'text.secondary';

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <ListItemButton onClick={onClick} sx={{ pl: '30px' }}>
        <ListItemIcon sx={{ color, minWidth: '40px', py: onlyIcon ? '4px' : '0' }}>{icon}</ListItemIcon>
        {!onlyIcon && (
          <ListItemText
            primary={name}
            sx={{ color }}
            primaryTypographyProps={{ sx: { fontWeight: 600, fontSize: '14px' } }}
          />
        )}
        {isOpen !== undefined && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
    </Link>
  );
};

export default SidebarItem;
