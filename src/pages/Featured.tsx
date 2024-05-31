import { Box, Button, Container, Grid, Typography } from '@mui/material';
import FormDialog from '../components/FormDialog';
import { useState } from 'react';
import Header from '../components/Header';
import GET_FEATURED from '../queries/featuredPublicAnimations';
import { useQuery } from '@apollo/client';
import Lottie from 'react-lottie-player';
import loader from '../assets/loader.json';

function Featured() {
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_FEATURED);

  return (
    <Box sx={{ backgroundColor: '#FBFCFD' }}>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight={'bold'} gutterBottom sx={{ mt: 4, flex: 1, letterSpacing: 1.5 }}>
            Explore the Best Animations, Selected for You
          </Typography>
          <Typography variant="body1" color="gray">
            Bring your projects to life with top free animations from LottieFiles’ extensive library.
          </Typography>
          {loading && <Lottie play loop animationData={loader} />}
          {data && (
            <Grid container sx={{ flex: 1, my: 4, justifyContent: 'center' }} spacing={2}>
              {data?.featuredPublicAnimations?.edges?.map((item: any) => (
                <Grid item>
                  <Lottie
                    path={item?.node?.jsonUrl}
                    loop
                    play
                    style={{ width: 212, height: 212, border: '1px solid #D7DFE6', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => setOpen(true)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {error && (
            <Typography variant="body1" color="gray">
              Something went wrong, please refresh the page. :/
            </Typography>
          )}
        </Box>
        {/* TODO: Use redux */}
        <FormDialog open={open} setOpen={setOpen} />
      </Container>
    </Box>
  );
}

export default Featured;
