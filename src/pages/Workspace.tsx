import { Box, Button, Container, Grid, Typography } from '@mui/material';
import loader from '../assets/loader.json';
import Header from '../components/Header';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Link, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';
import useSession from '../hooks/useSession';
import { ChangeEvent, useEffect, useState } from 'react';
import supabase from '../client/supabase';
import { LottieJson } from './Editor';

export interface WorkspaceData {
  id?: string;
  name: string;
  lottieObj: LottieJson;
  isAllowEdit: boolean;
  ownerId: string;
  dateModified: Date;
  history: any[];
  collaborators: string[];
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
    };

    if (data?.user?.id) fetchWorkspace();
  }, [data?.user?.id]);

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

  const saveWorkspace = async (lottieObj: any) => {
    try {
      const newProject: WorkspaceData = {
        name: lottieObj?.nm || 'Your exciting animation',
        lottieObj: lottieObj,
        ownerId: data?.user?.id || '',
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
      setProjects((prevState) => [newProject, ...prevState]);
    } catch (error: any) {
      console.error('Error saving workspace:', error?.message);
    }
  };

  const formatDate = (value: Date) => {
    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (!data?.user && !loading) return <Navigate to="/" />;

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
              <VisuallyHiddenInput type="file" accept=".json" onChange={handleFileUpload} />
            </Button>
          </Box>
          <>
            {loadingProjects && <Player autoplay loop src={loader} />}
            <Grid container spacing={2} sx={{ flex: 1, my: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {projects?.map((item, index) => (
                <Grid item key={index} component={Link} to={`/workspace/${item?.id}`} sx={{ textDecoration: 'none' }}>
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
