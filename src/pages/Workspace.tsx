import { Box, Button, Container, Grid, Typography } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import FormDialog from '../components/FormDialog';
import { useState } from 'react';
import Header from '../components/Header';
import Lottie from 'react-lottie-player';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Workspace() {
  return (
    <Box sx={{ backgroundColor: '#F3F6F8', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={'bold'} sx={{ my: 3 }}>
            Workspace
          </Typography>
          <Box>
            <Button
              component={Link}
              to={'/featured'}
              variant="outlined"
              size="small"
              sx={{ fontWeight: 'bold', mr: 1, mb: { xs: 2, sm: 0 } }}
              startIcon={<ThumbUpOffAltIcon />}
            >
              Import featured animation
            </Button>
            <Button component="label" variant="contained" size="small" sx={{ fontWeight: 'bold' }} startIcon={<FileUploadOutlinedIcon />}>
              Upload animation
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
          <>
            <Grid container spacing={2} sx={{ flex: 1, my: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item) => (
                <Grid item component={Link} to={'/workspace/123'} sx={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      width: 214,
                      height: 220,
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      border: '1px solid #D8E0E5',
                      borderRadius: 2,
                      mb: 2,
                      '&:hover': {
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Lottie loop animationData={homeAnim} play style={{ width: '100%', height: 158 }} />
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <FileOpenOutlinedIcon sx={{ color: 'primary.main' }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '80%', ml: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            color: 'black',
                          }}
                        >
                          Workspace name loooooooooong
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '100%',
                            color: 'gray',
                          }}
                        >
                          Modified today
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        </Box>
      </Container>
    </Box>
  );
}

export default Workspace;
