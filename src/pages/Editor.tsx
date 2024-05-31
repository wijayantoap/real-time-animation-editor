import { Box, Grid } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import Header from '../components/Header';
import Lottie from 'react-lottie-player';
import LayerList from '../components/LayerList';
import PanelTab from '../components/PanelTab';

function Editor() {
  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '100vh',
              borderRight: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <LayerList />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Lottie loop animationData={homeAnim} play style={{ width: 500, height: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '100vh',
              borderLeft: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <PanelTab />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Editor;
