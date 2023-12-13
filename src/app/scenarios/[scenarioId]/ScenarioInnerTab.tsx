import { Box } from '@mui/material';
import { type FC, type ReactNode, useRef } from 'react';

import { BackToTopButton } from '@/components';
import { useBackToTopButton } from '@/hooks';

interface ScenarioInnerTabProps {
  config: ReactNode[];
}

const ScenarioInnerTab: FC<ScenarioInnerTabProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { backToTopHandler, showBtn } = useBackToTopButton(containerRef);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: 'calc(100% - 134px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        p: '12px',
      }}
    >
      {config.map((chartRow) => chartRow)}
      <BackToTopButton isVisible={showBtn} clickHandler={backToTopHandler} />
    </Box>
  );
};

export default ScenarioInnerTab;
