import TableRowMUI, { type TableRowProps as TableRowPropsMUI } from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

import colors from '@/theme/colors';

export interface TableRowProps extends TableRowPropsMUI {
  isSubRow?: boolean; // decides if :after should be visible on hover
  children?: ReactNode;
}

const TableRow: FC<TableRowProps> = ({ children, isSubRow = false, selected = false, ...props }) => {
  const separatorLineColor = colors.gray2;
  const activeColor = selected ? 'primary' : 'transparent';
  const defaultColor = selected ? 'primary' : separatorLineColor;
  return (
    <TableRowMUI
      {...props}
      sx={{
        ...props.sx,
        width: '100%',
        cursor: 'pointer',
        td: {
          borderTop: `1px solid ${defaultColor} !important`,
          borderBottom: `1px solid ${defaultColor} !important`,
          position: 'relative',
          '&:after': isSubRow
            ? {
                content: '""',
                width: '101%',
                height: '1px',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: activeColor,
              }
            : {},
        },
        '&:first-of-type': {
          td: {
            '&:after': {
              backgroundColor: 'transparent',
            },
          },
          '&:hover': {
            td: {
              '&:after': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
        'td:last-child': {
          borderTop: `1px solid ${defaultColor}`,
          borderBottom: `1px solid ${defaultColor}`,
          borderRight: `1px solid ${activeColor}`,
        },
        'td:first-of-type': {
          borderTop: `1px solid ${defaultColor}`,
          borderBottom: `1px solid ${defaultColor}`,
          borderLeft: `1px solid ${activeColor}`,
        },
      }}
    >
      {children}
    </TableRowMUI>
  );
};

export default TableRow;
