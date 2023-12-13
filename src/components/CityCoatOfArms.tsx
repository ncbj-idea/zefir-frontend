import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { type FC } from 'react';

export interface CityCoatOfArmsProps {
  city: 'warszawa';
}

const CityCoatOfArms: FC<CityCoatOfArmsProps> = ({ city }) => {
  let cityName = '';
  let cityIcon = '';
  // eslint-disable-next-line default-case
  switch (city) {
    case 'warszawa':
      cityName = 'Warszawa';
      cityIcon = '/static/images/herb-warszawa.svg';
      break;
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap="10px">
      <Image src={cityIcon} width={40} height={70} alt={`Herb miasta ${cityName}`} />
      <Typography fontSize="20px" fontWeight="bold">
        {cityName}
      </Typography>
    </Box>
  );
};

export default CityCoatOfArms;
