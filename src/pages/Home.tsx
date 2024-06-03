import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Player } from '@lottiefiles/react-lottie-player';
import Header from '../components/Header';
import FormDialog from '../components/FormDialog';
import homeAnim from '../assets/home_anim.json';
import useSession from '../hooks/useSession';
import { toggleForm } from '../redux/slices/overlaySlice';

function Home() {
  const navigate = useNavigate();
  const { data } = useSession();
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <FormDialog />
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
              onClick={() => (data?.user ? navigate('/workspace') : dispatch(toggleForm()))}
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
      </Container>
    </>
  );
}

export default Home;
