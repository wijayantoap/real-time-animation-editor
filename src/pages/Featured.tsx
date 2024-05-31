import { Box, Button, Container, Typography } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import Lottie from 'lottie-react';
import FormDialog from '../components/FormDialog';
import { useState } from 'react';
import Header from '../components/Header';

function Featured() {
  const [open, setOpen] = useState(false);

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
