'use client';

import { ArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';

interface ScenariosTableProps {
  onRowClick: (scenarioId: number) => void;
  rows: GridRowsProp;
}

const ScenariosTable: FC<ScenariosTableProps> = ({ onRowClick, rows }) => {
  const router = useRouter();
  const goToScenario = (scenarioId: number) => {
    router.push(`/scenarios/${scenarioId}/?section=0`);
  };

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'NR', width: 20, disableColumnMenu: true },
    {
      field: 'col2',
      headerName: 'Nazwa scenariusza',
      flex: 2,
    },
    {
      field: 'col3',
      headerName: 'Koszty całkowite (TOTAL) [mld. PLN]',
      flex: 1.3,
    },
    {
      field: 'col4',
      headerName: 'Koszty inwestycyjne (CAPEX) [mld. PLN]',
      flex: 1.3,
    },
    {
      field: 'col5',
      headerName: 'Koszty stałe (OPEX) [mld. PLN]',
      flex: 1.3,
    },
    {
      field: 'col6',
      headerName: 'Koszty zmienne [mld. pln]',
      flex: 1,
    },
    {
      field: 'col7',
      headerName: 'Całk. emisje CO₂ [mld. ton]',
      flex: 1,
    },
    {
      field: 'col8',
      headerName: 'Data utworzenia',
      flex: 1,
    },
    {
      field: 'action',
      headerName: '',
      width: 20,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton sx={{ p: 0 }} onClick={() => goToScenario(params.id as number)}>
          <ArrowRight sx={{ fontSize: '30px' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      columnHeaderHeight={68}
      onRowClick={(params) => {
        onRowClick(params.id as number);
      }}
    />
  );
};

export default ScenariosTable;
