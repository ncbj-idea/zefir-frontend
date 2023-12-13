import TableHeadMUI, { type TableHeadProps as TableHeadPropsMUI } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

import colors from '@/theme/colors';

export interface TableHeadProps extends TableHeadPropsMUI {
  children?: ReactNode;
}

const TableHead: FC<TableHeadProps> = ({ children, ...props }) => {
  return (
    <TableHeadMUI {...props}>
      <TableRow
        sx={{
          fontWeight: 700,
          '& th': {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
            backgroundColor: colors.gray2,
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      >
        {children}
      </TableRow>
    </TableHeadMUI>
  );
};

export default TableHead;
