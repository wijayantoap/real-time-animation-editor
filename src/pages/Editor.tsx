/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box, Grid } from '@mui/material';
import LayerList from '../components/LayerList';
import PanelTab from '../components/PanelTab';
import { Controls, Player, PlayerEvent } from '@lottiefiles/react-lottie-player';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditorHeader from '../components/EditorHeader';
import { Navigate, useParams } from 'react-router-dom';
import useSession from '../hooks/useSession';
import supabase from '../client/supabase';
import { WorkspaceData } from './Workspace';

export interface LottieJson {
  v: string; // Version
  w: number; // Width
  h: number; // Height
  fr: number; // Frame rate
  ip: number; // In point
  op: number; // Out point
  assets: any[]; // Assets used in the animation
  layers: any[]; // Layers of the animation
}

function Editor() {
  const [originalAnimation, setOriginalAnimation] = useState<LottieJson | null>(null);
  const [animation, setAnimation] = useState<LottieJson | any>(originalAnimation);
  const [layersShown, setLayersShown] = useState<number[]>([]);
  const [layersDeleted, setLayersDeleted] = useState<number[]>([]);
  const [animationHistory, setAnimationHistory] = useState<LottieJson[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [saveCount, setSaveCount] = useState<number>(0);

  const animRef = useRef<any>(null);
  const [lottieRef, setLottieRef] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState({
    isPaused: false,
    frame: 0,
  });

  const { data, loading } = useSession();
  let params = useParams();
  const workspaceId = params?.workspaceId;

  useEffect(() => {
    const fetchAnimation = async () => {
      const { data: project, error } = await supabase.from('workspaces').select('*').eq('id', workspaceId).single();

      const lottieObj = project?.lottieObj;

      if (lottieObj) {
        setOriginalAnimation(lottieObj);
        setAnimation(lottieObj);
        setLayersShown(lottieObj?.layers.map((_: any, index: number) => index));
        setLayersDeleted(lottieObj?.layers.map((_: any, index: number) => index));
      }

      if (error) setError(true);
    };

    if (workspaceId && data?.user?.id) {
      fetchAnimation();
    }
  }, [workspaceId, data?.user?.id]);

  const hideLayer = (hide: boolean, index: number) => {
    setLayersShown((prevLayersShown) => {
      if (hide) {
        return prevLayersShown.filter((layerIndex) => layerIndex !== index);
      } else {
        if (!prevLayersShown.includes(index)) {
          return [...prevLayersShown, index];
        } else {
          return prevLayersShown;
        }
      }
    });
  };

  const deleteLayer = (index: number) => {
    setLayersDeleted((prevLayersDeleted) => prevLayersDeleted.filter((layerIndex) => layerIndex !== index));
  };

  const handleLottieEvent = useCallback(
    (event: PlayerEvent) => {
      if (event === 'load') setLoaded(true);
    },
    [setLoaded],
  );

  const updateWorkspace = async (lottieObj: any) => {
    try {
      const newProject: WorkspaceData = {
        name: lottieObj?.nm || 'Your exciting animation',
        lottieObj: lottieObj,
        ownerId: data?.user?.id || '',
        dateModified: new Date(),
        history: [],
        collaborators: [],
        isAllowEdit: false,
        lastModifiedBy: data?.user?.id || '',
      };

      // Update existing workspace
      const { error } = await supabase.from('workspaces').update(newProject).eq('id', workspaceId).select();

      if (error) {
        console.error('Error updating workspace:', error);
        alert('Something went wrong');
        return;
      }
    } catch (error: any) {
      console.error('Error saving workspace:', error?.message);
    }
  };

  useEffect(() => {
    if (!originalAnimation) return;
    const filteredLayers = originalAnimation.layers.filter((_, index) => layersShown.includes(index));
    setAnimation((prevAnimation: LottieJson | any) => ({ ...prevAnimation, layers: filteredLayers }));
  }, [layersShown]);

  useEffect(() => {
    if (!originalAnimation) return;
    const filteredLayers = originalAnimation.layers.filter((_, index) => layersDeleted.includes(index));
    setAnimation((prevAnimation: LottieJson | any) => ({ ...prevAnimation, layers: filteredLayers }));
    setOriginalAnimation((prevAnimation: LottieJson | any) => ({ ...prevAnimation, layers: filteredLayers }));
    // setSaveCount((prevState) => prevState + 1); // todo: need this
  }, [layersDeleted]);

  useEffect(() => {
    if (lottieRef && loaded && currentFrame) {
      if (currentFrame?.isPaused) {
        lottieRef.goToAndStop(currentFrame?.frame, true);
      } else {
        lottieRef.goToAndPlay(currentFrame?.frame, true);
      }
    }
  }, [lottieRef, loaded, currentFrame]);

  useEffect(() => {
    if (lottieRef) {
      setCurrentFrame({
        isPaused: lottieRef?.isPaused,
        frame: lottieRef?.currentFrame,
      });
    }
  }, [animation, layersShown, layersDeleted]);

  useEffect(() => {
    const channel = supabase.channel('table_workspaces_changes');

    const subscribeToMessages = () => {
      channel
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'workspaces',
            filter: `id=eq.${params?.workspaceId}`,
          },
          (payload) => {
            const newRecord = payload.new as any;
            console.log(newRecord);
            console.log('compare', newRecord?.lottieObj && newRecord?.lastModifiedBy !== data?.user?.id);
            console.log('compare', newRecord?.lastModifiedBy, data?.user?.id);

            if (newRecord?.lottieObj) {
              const lottieObj = newRecord?.lottieObj;
              setAnimation(lottieObj);
              setOriginalAnimation(lottieObj);
              setLayersShown(lottieObj?.layers.map((_: any, index: number) => index));
              setLayersDeleted(lottieObj?.layers.map((_: any, index: number) => index));
            }
          },
        )
        .subscribe();

      console.log(supabase.realtime.connectionState());
    };

    if (params?.workspaceId && data?.user?.id) {
      subscribeToMessages();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params?.workspaceId, data?.user?.id]);

  useEffect(() => {
    if (saveCount) {
      updateWorkspace(animation);
      console.log('=c', saveCount);
    }
  }, [saveCount]);

  if (!data?.user && !loading) return <Navigate to="/" />;

  return (
    <>
      <EditorHeader />
      {error && (
        <Alert
          variant="filled"
          severity="error"
          sx={{
            mt: 2,
          }}
        >
          Could not find the animation, please try something else
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '90vh',
              borderRight: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <LayerList
              name={animation?.nm}
              layers={originalAnimation?.layers || []}
              layersShown={layersShown}
              hideLayer={hideLayer}
              deleteLayer={deleteLayer}
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '90vh',
            }}
          >
            <Player
              ref={animRef}
              lottieRef={(instance) => setLottieRef(instance)}
              autoplay={!currentFrame?.isPaused}
              loop
              src={animation}
              onEvent={handleLottieEvent}
              style={{ height: '70vh', width: '100%' }}
            >
              <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '90vh',
              borderLeft: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <PanelTab lottie={animation} setAnimation={setAnimation} layers={animation?.layers} setSaveCount={setSaveCount} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Editor;
