import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ColorTab from './ColorTab';
import SettingsTab from './SettingsTab';
import { Layer } from './LayerList';
import { LottieJson } from '../pages/Editor';

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

interface PanelTabProps {
  lottie: LottieJson;
  layers: Layer[];
  setAnimation: React.Dispatch<React.SetStateAction<LottieJson>>;
}

const PanelTab: React.FC<PanelTabProps> = ({ lottie, layers, setAnimation }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {['Edit', 'Settings'].map((item, index) => (
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
        <ColorTab lottie={lottie} layers={layers} setAnimation={setAnimation} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SettingsTab lottie={lottie} setAnimation={setAnimation} />
      </CustomTabPanel>
    </Box>
  );
};

export default PanelTab;
