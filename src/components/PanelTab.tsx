import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ColorTab from './ColorTab';
import SettingsTab from './SettingsTab';
import ChatTab from './ChatTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PanelTab: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {['Edit', 'Settings', 'Chat'].map((item, index) => (
            <Tab
              label={
                <Typography variant="caption" fontWeight={'bold'}>
                  {item}
                </Typography>
              }
              key={index}
              sx={{ p: 2, minWidth: 0 }}
              {...a11yProps(index)}
              disableRipple
            />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ColorTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SettingsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ChatTab />
      </CustomTabPanel>
    </Box>
  );
};

export default PanelTab;
