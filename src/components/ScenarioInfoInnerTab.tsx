import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const GridRow = ({
  leftText,
  rightText,
  extraSpacing = false,
  href = '',
}: {
  leftText: string;
  rightText: string;
  extraSpacing?: boolean;
  href?: string;
}) => (
  <Grid container item spacing={2} marginBottom={extraSpacing ? '15px' : ''}>
    <Grid item xs={2}>
      <Typography color="text.secondary" fontSize="14px">
        {leftText}
      </Typography>
    </Grid>
    <Grid item xs={10}>
      {href ? (
        <Link
          href={href}
          passHref
          style={{
            color: 'inherit',
            textDecoration: 'inherit',
          }}
        >
          <Typography fontSize="14px" fontWeight="600">
            {rightText}
          </Typography>
        </Link>
      ) : (
        <Typography fontWeight={600} fontSize="14px">
          {rightText}
        </Typography>
      )}
    </Grid>
  </Grid>
);

const ScenarioInfoInnerTab = () => {
  return (
    <Box
      sx={{
        height: 'calc(100% - 134px)',
        padding: '30px 20px',
      }}
    >
      <Box width="75%">
        <Grid container spacing={2}>
          <GridRow leftText="Nazwa scenariusza" rightText="Warszawa bez paliw kopalnych do 2030" />
          <GridRow
            leftText="Opis"
            rightText="Założono redukcję wykorzystania paliw kopalnych do 0 do roku 2030. Uwzględniono plany lokalnych ciepłowni w zakresie przejścia na biomasę w roku 2025."
          />
          <GridRow extraSpacing leftText="Data utworzenia" rightText="22-08-2023" />
          <GridRow leftText="Horyzont analizy" rightText="20 lat" />
          <GridRow extraSpacing leftText="Krok analizy" rightText="1 rok" />
          <GridRow leftText="Dopuszczone technologie" rightText="link do zbioru" href="/document-1" />
          <GridRow leftText="Agregaty odbiorcze" rightText="link do zbioru" href="/document-2" />
          <GridRow leftText="Ścieżki kosztowe paliw" rightText="link do zbioru" href="/document-3" />
        </Grid>
      </Box>
    </Box>
  );
};

export default ScenarioInfoInnerTab;
