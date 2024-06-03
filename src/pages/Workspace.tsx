import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { Box, Button, Container, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import loader from '../assets/loader.json';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../components/Header';
import useSession from '../hooks/useSession';
import supabase from '../client/supabase';
import { LottieJson } from './Editor';
import { formatDate } from '../helper/dateHelper';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { toggleBackdrop } from '../redux/slices/overlaySlice';

export interface WorkspaceData {
  id?: string;
  name: string;
  lottieObj: LottieJson;
  ownerId: string;
  dateModified: Date;
}

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
  const { data, loading } = useSession();
  const [projects, setProjects] = useState<WorkspaceData[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const dispatch = useDispatch();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const lottieObj = JSON.parse(reader.result as string);
        await saveWorkspace(lottieObj);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteWorkspace = async (id: string, index: number) => {
    dispatch(toggleBackdrop());
    const response = await supabase.from('workspaces').delete().eq('id', id);
    if (response) dispatch(toggleBackdrop());
    setProjects((prevState) => prevState.filter((_, idx) => idx !== index));
  };

  const saveWorkspace = async (lottieObj: any) => {
    try {
      const newProject: WorkspaceData = {
        name: lottieObj?.nm || 'Your exciting animation',
        lottieObj: lottieObj,
        ownerId: data?.user?.id || '',
        dateModified: new Date(),
      };
      const { data: project, error } = await supabase.from('workspaces').insert(newProject).select();
      if (error) {
        console.error('Error saving workspace:', error);
        alert('Something went wrong');
        return;
      }
      setProjects((prevState) => [project[0], ...prevState]);
    } catch (error: any) {
      console.error('Error saving workspace:', error?.message);
    }
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      const { data: projects, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('ownerId', data?.user?.id)
        .order('dateModified', { ascending: false });

      if (!error) {
        setProjects(projects);
      }
      setLoadingProjects(false);
      window.scrollTo(0, 0);
    };

    if (data?.user?.id) fetchWorkspace();
  }, [data?.user?.id]);

  if (!data?.user && !loading) return <Navigate to="/" />;

  return (
    <Box sx={{ backgroundColor: colors.lightgray, minHeight: '100vh' }}>
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
              <VisuallyHiddenInput type="file" accept=".json" onChange={handleFileUpload} />
            </Button>
          </Box>
          <>
            {loadingProjects && <Player autoplay loop src={loader} />}
            <Grid container spacing={2} sx={{ flex: 1, my: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {projects?.map((item, index) => (
                <Grid item key={index}>
                  <Box component={Link} to={`/workspace/${item?.id}`} sx={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        width: 214,
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
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1 }} />
                        <IconButton
                          aria-label="delete"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleDeleteWorkspace(item?.id || '', index);
                          }}
                        >
                          <DeleteIcon sx={{ color: colors.lightred }} />
                        </IconButton>
                      </Box>
                      <Player autoplay loop src={item?.lottieObj} style={{ width: '100%', height: 158 }} />
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
                            {item?.name}
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
                            Last modified {formatDate(item?.dateModified)}
                          </Typography>
                        </Box>
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
