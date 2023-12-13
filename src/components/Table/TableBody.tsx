import TableBodyMUI, { type TableBodyProps as TableBodyPropsMUI } from '@mui/material/TableBody';
import type { FC, ReactNode } from 'react';

export interface TableBodyProps extends TableBodyPropsMUI {
  children?: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return (
    <TableBodyMUI
      sx={{
        '& td': {
          fontSize: 14,
          fontWeight: 600,
        },
        '& td p, & td li': {
          fontSize: 14,
          fontWeight: 600,
        },
      }}
    >
      {children}
    </TableBodyMUI>
  );
};

export default TableBody;
