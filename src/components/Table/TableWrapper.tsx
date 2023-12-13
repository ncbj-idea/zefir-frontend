import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer, { type TableContainerProps } from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { forwardRef, useRef, useState } from 'react';

import { Scrollbar } from '@/components/Scrollbar';

export interface TableWrapperProps extends TableContainerProps {
  children: ReactNode;
  count?: number;
  rowsPerPageOptions?: number[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
}

const TableWrapper = forwardRef<HTMLDivElement, TableWrapperProps>((props, ref) => {
  const { children, count, onChangePage, onChangeRowsPerPage, rowsPerPageOptions = [25, 50, 100], ...rest } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0] as number);

  const scrollContainer = useRef<any | null>(null);

  const resetScrollPosition = () => {
    if (scrollContainer.current) {
      const scrollElement = scrollContainer.current.getScrollElement();
      scrollElement.scrollTop = 0;
    }
  };

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, currPage: number) => {
    setPage(currPage);
    resetScrollPosition();
    if (onChangePage) {
      onChangePage(currPage);
    }
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(newRowsPerPage);
    }
    setPage(0);
    if (onChangePage) {
      onChangePage(0);
    }
  };

  return (
    <TableContainer
      ref={ref}
      {...rest}
      variant="outlined"
      component={Paper}
      sx={{
        ...props.sx,
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      }}
    >
      <Scrollbar ref={scrollContainer} sx={{ maxHeight: `calc(100% ${count ? '- 52px' : ''})` }}>
        <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
          {children}
        </Table>
      </Scrollbar>
      {count && (
        <TablePagination
          component="div"
          sx={{
            left: 0,
            bottom: 0,
            width: '100%',
            position: 'absolute',
            backgroundColor: 'white',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'divider',
          }}
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage="Wierszy na stronie"
          labelDisplayedRows={({ from, to, count: rCount }) =>
            `${from}-${to} z ${rCount !== -1 ? rCount : `więcej niż ${to}`}`
          }
        />
      )}
    </TableContainer>
  );
});

TableWrapper.displayName = 'TableWrapper';

export default TableWrapper;
