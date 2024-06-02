import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import FormDialog from '../components/FormDialog';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import GET_FEATURED from '../queries/featuredPublicAnimations';
import { useQuery } from '@apollo/client';
import loader from '../assets/loader.json';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Player } from '@lottiefiles/react-lottie-player';
import LoaderBackdrop from '../components/LoaderBackdrop';
import useSession from '../hooks/useSession';
import { WorkspaceData } from './Workspace';
import supabase from '../client/supabase';
import { useNavigate } from 'react-router-dom';

function Featured() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState({
    first: 20,
    last: 0,
    after: '',
    before: '',
  });

  const { data: userData } = useSession();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_FEATURED, {
    variables: params,
  });

  const fetchAnimationData = async (url: string) => {
    try {
      // todo: handle redux load
      const response = await fetch(url);
      const lottieObj = await response.json();

      try {
        const newProject: WorkspaceData = {
          name: lottieObj?.nm || 'Your exciting animation',
          lottieObj: lottieObj,
          ownerId: userData?.user?.id || '',
          dateModified: new Date(),
          history: [],
          collaborators: [],
          isAllowEdit: false,
        };
        const { error } = await supabase.from('workspaces').insert(newProject);
        if (error) {
          console.error('Error saving workspace:', error);
          alert('Something went wrong');
          return;
        }
        navigate('/workspace');
      } catch (error: any) {
        console.error('Error saving workspace:', error?.message);
      }
      console.log('succ', data);
    } catch (error) {
      console.error('Error fetching the Lottie animation data:', error);
    }
  };

  const handleClick = (url: string) => {
    if (userData?.user?.id) {
      console.log(url);
      fetchAnimationData(url);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#FBFCFD', minHeight: '100vh', pb: 2 }}>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight={'bold'} gutterBottom sx={{ mt: 4, flex: 1, letterSpacing: 1.5 }}>
            Explore the Best Animations, Selected for You
          </Typography>
          <Typography variant="body1" color="gray">
            Bring your projects to life with top free animations from LottieFiles' extensive library.
          </Typography>
          {loading && <Player autoplay loop src={loader} />}
          {data && (
            <>
              <Grid container sx={{ flex: 1, my: 4, justifyContent: 'center' }} spacing={2}>
                {data?.featuredPublicAnimations?.edges?.map(
                  (
                    item: any, // TODO: Change to ts type,
                    index: number,
                  ) => (
                    <Grid item key={index}>
                      <Box onClick={() => handleClick(item?.node?.jsonUrl)}>
                        <Player
                          autoplay
                          loop
                          src={item?.node?.jsonUrl}
                          style={{ width: 212, height: 212, border: '1px solid #D7DFE6', borderRadius: 8, cursor: 'pointer' }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                          <Avatar src={item?.node?.createdBy?.avatarUrl} sx={{ mr: 1, height: 24, width: 24 }} />
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 120,
                            }}
                          >
                            {item?.node?.createdBy?.name}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#808E9A', fontSize: 14 }}>{item?.node?.downloads}</Typography>
                        <FileDownloadOutlinedIcon sx={{ color: '#808E9A', fontSize: 16 }} />
                      </Box>
                    </Grid>
                  ),
                )}
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignSelf: 'normal' }}>
                <Button
                  disabled={!data?.featuredPublicAnimations?.pageInfo?.hasPreviousPage}
                  onClick={() => {
                    setParams({
                      after: '',
                      before: data?.featuredPublicAnimations?.pageInfo?.startCursor,
                      first: 0,
                      last: 20,
                    });
                  }}
                  startIcon={<ArrowBackIosIcon />}
                  sx={{ fontWeight: 'bold' }}
                >
                  Prev
                </Button>
                <Button
                  disabled={!data?.featuredPublicAnimations?.pageInfo?.hasNextPage}
                  onClick={() => {
                    setParams({
                      after: data?.featuredPublicAnimations?.pageInfo?.endCursor,
                      before: '',
                      first: 20,
                      last: 0,
                    });
                  }}
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ fontWeight: 'bold' }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
          {error && (
            <Typography variant="body1" color="gray">
              Something went wrong, please refresh the page. :/
            </Typography>
          )}
        </Box>
        {/* TODO: Use redux */}
        <FormDialog open={open} setOpen={setOpen} />
        <LoaderBackdrop />
      </Container>
    </Box>
  );
}

export default Featured;
