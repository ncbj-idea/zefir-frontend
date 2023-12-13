import { Box } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FC, useRef, useState } from 'react';

import { BackToTopButton, TabSelect } from '@/components';
import AggregatesInnerTab from '@/components/AggregatesInnerTab';
import { useBackToTopButton } from '@/hooks';
import { useDispatch } from '@/store';
import { updateTab } from '@/store/slices/uiSession';
import { AggregateType } from '@/types';

const groups = ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Inne'];
const tabs = [
  { title: 'Budynki jednorodzinne', type: AggregateType.SINGLE_FAMILY },
  { title: 'Budynki wielorodzinne', type: AggregateType.MULTI_FAMILY },
  { title: 'Budynki biurowe', type: AggregateType.OFFICES_SHOPS },
  { title: 'Budynki handlowo-usługowe', type: AggregateType.SERVICES },
  { title: 'Inne typy budynków', type: AggregateType.OTHER },
];

const ScenarioAggregatesTab: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const groupValue = Number(searchParams.get('group'));
  const [activeGroupIndex, setActiveGroupIndex] = useState(groupValue || 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { backToTopHandler, showBtn } = useBackToTopButton(containerRef);

  const handleGroupChange = (index: number) => {
    setActiveGroupIndex(index);

    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    currentSearchParams.set('group', index.toString());
    const search = currentSearchParams.toString();
    const query = search ? `?${search}` : '';
    const newPath = `${pathname}${query}`;

    router.replace(newPath);

    dispatch(
      updateTab({
        tabsType: 'baseline',
        tab: { tabID: 1, tabURL: newPath },
      }),
    );
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        height: 'calc(100% - 134px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        py: '32px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TabSelect items={groups} activeItemIndex={activeGroupIndex} setActiveItemIndex={handleGroupChange} />
        <Box
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: 'divider',
            position: 'absolute',
            top: '50%',
            left: 0,
            zIndex: 0,
          }}
        />
      </Box>
      <Box p="20px">
        {tabs.map(
          ({ title, type }, index) =>
            activeGroupIndex === index && <AggregatesInnerTab isScenario key={title} aggType={type} title={title} />,
        )}
      </Box>
      <BackToTopButton isVisible={showBtn} clickHandler={backToTopHandler} />
    </Box>
  );
};

export default ScenarioAggregatesTab;
