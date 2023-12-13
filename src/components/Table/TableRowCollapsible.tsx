import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

import TableCell from './TableCell';

export interface TableRowCollapsibleProps extends TableRowProps {
  children?: ReactNode;
  isSelected?: boolean;
  colSpan: number;
}

const TableRowCollapsible: FC<TableRowCollapsibleProps> = ({ children, colSpan, isSelected = false, ...props }) => {
  return (
    <TableRow {...props}>
      <TableCell colSpan={colSpan} sx={{ padding: 0, border: 0 }}>
        <Collapse in={isSelected} timeout="auto" unmountOnExit>
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableBody>{children}</TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default TableRowCollapsible;
