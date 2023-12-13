import { Tab, Tabs } from '@mui/material';
import { type FC, type SyntheticEvent } from 'react';

interface InnerTabsProps {
  tabNames: string[];
  value?: number | string;
  onChange?: (value: number | string) => void;
}

const InnerTabs: FC<InnerTabsProps> = ({ tabNames, value, onChange }) => (
  <Tabs
    sx={{
      backgroundColor: 'background.default',
      borderBottom: 1,
      borderColor: 'divider',
    }}
    value={value}
    onChange={(_: SyntheticEvent<Element, Event>, onChangeValue: number | string) => onChange?.(onChangeValue)}
  >
    {tabNames.map((tabName) => (
      <Tab
        key={`${tabName}`}
        label={tabName}
        sx={{
          padding: '15px 30px',
          fontWeight: 600,
          textTransform: 'none',
        }}
      />
    ))}
  </Tabs>
);

export default InnerTabs;
