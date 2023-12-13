'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { type FC } from 'react';

interface ScenarioInfoProps {
  scenarioId: number;
}

const ScenarioInfo: FC<ScenarioInfoProps> = ({ scenarioId }) => {
  return (
    <Box height="100%" p="20px">
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Nazwa scenariusza
        </Typography>
        <Typography fontSize="14px" fontWeight="bold">
          #{scenarioId} Warszawa bez paliw do 2030
        </Typography>
      </Box>
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Opis
        </Typography>
        <Typography fontSize="14px" fontWeight="600">
          Założono redukcję wykorzystania paliw kopalnych do 0 do roku 2030. Uwzględniono plany lokalnych ciepłowni w
          zakresie przejścia na biomasę w roku 2025.
        </Typography>
      </Box>
      <Box mb="30px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Data utworzenia
        </Typography>
        <Typography fontSize="14px" fontWeight="600">
          2023-08-22
        </Typography>
      </Box>
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Horyzont analizy
        </Typography>
        <Typography fontSize="14px" fontWeight="600">
          20 lat
        </Typography>
      </Box>
      <Box mb="30px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Krok analizy
        </Typography>
        <Typography fontSize="14px" fontWeight="600">
          1 rok
        </Typography>
      </Box>
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Dopuszczone technologie:
        </Typography>
        <Link href="/document-1" passHref style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Typography fontSize="14px" fontWeight="600">
            link do zbioru
          </Typography>
        </Link>
      </Box>
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Agregaty odbiorcze
        </Typography>
        <Link href="/document-2" passHref style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Typography fontSize="14px" fontWeight="600">
            link do zbioru
          </Typography>
        </Link>
      </Box>
      <Box mb="15px">
        <Typography color="text.secondary" fontSize="14px" mb="5px">
          Ścieżki kosztowe paliw
        </Typography>
        <Link href="/document-3" passHref style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <Typography fontSize="14px" fontWeight="600">
            link do zbioru
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default ScenarioInfo;
