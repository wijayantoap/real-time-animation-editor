import { Box, Button, Container, Typography } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import FormDialog from '../components/FormDialog';
import { useState } from 'react';
import Header from '../components/Header';
import { Player } from '@lottiefiles/react-lottie-player';
import useSession from '../hooks/useSession';

function Home() {
  const [open, setOpen] = useState(false);

  const { data } = useSession();

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: '90vh',
          }}
        >
          <Box>
            <Typography variant="h2" gutterBottom fontWeight={'bold'} sx={{ mt: 3 }}>
              Real-Time Animation Collaboration for{' '}
              <Typography
                variant="h2"
                sx={{
                  color: 'primary.main',
                }}
                fontWeight={'bold'}
                component={'span'}
              >
                Everyone
              </Typography>
            </Typography>
            <Typography variant="h5" color={'gray'}>
              Welcome to our creative space, where imagination knows no bounds! Join the fun, collaborate with friends, and bring your ideas to life
              with animations that sparkle with creativity and innovation.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                fontSize: 16,
                letterSpacing: 1.5,
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 4,
              }}
              onClick={() => setOpen(true)}
            >
              {data ? 'Go to workspace' : "Join Now - It's Free"}
            </Button>
          </Box>
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
          >
            <Player autoplay loop src={homeAnim} style={{ height: '100%', width: '100%' }} />
          </Box>
        </Box>
        <FormDialog open={open} setOpen={setOpen} />
      </Container>
    </>
  );
}

export default Home;
