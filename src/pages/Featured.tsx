import { Box, Button, Container, Typography } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import Lottie from 'lottie-react';
import FormDialog from '../components/FormDialog';
import { useState } from 'react';
import Header from '../components/Header';
import GET_FEATURED from '../queries/featuredPublicAnimations';
import { useQuery } from '@apollo/client';

function Featured() {
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_FEATURED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
          Featured
        </Box>
        {/* TODO: Use redux */}
        <FormDialog open={open} setOpen={setOpen} />
      </Container>
    </>
  );
}

export default Featured;
