import { Box, Grid } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import Header from '../components/Header';
import LayerList from '../components/LayerList';
import PanelTab from '../components/PanelTab';
import { Player } from '@lottiefiles/react-lottie-player';

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
            <Player autoplay loop src={homeAnim} style={{ height: 500, width: '100%' }}></Player>
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
