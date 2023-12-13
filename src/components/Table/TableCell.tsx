import TableCellMUI, { type TableCellProps as TableCellPropsMUI } from '@mui/material/TableCell';
import type { FC, ReactNode } from 'react';

export interface TableCellProps extends TableCellPropsMUI {
  children?: ReactNode;
}

const TableCell: FC<TableCellProps> = ({ children, ...props }) => {
  return <TableCellMUI {...props}>{children}</TableCellMUI>;
};

export default TableCell;
