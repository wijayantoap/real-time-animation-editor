import { Box, Button, Grid } from '@mui/material';
import homeAnim from '../assets/home_anim.json';
import Header from '../components/Header';
import LayerList from '../components/LayerList';
import PanelTab from '../components/PanelTab';
import { Controls, Player, PlayerEvent } from '@lottiefiles/react-lottie-player';
import { useCallback, useEffect, useRef, useState } from 'react';

function Editor() {
  const [originalAnimation, setOriginalAnimation] = useState(homeAnim);
  const [animation, setAnimation] = useState(originalAnimation);
  const [layersShown, setLayersShown] = useState(originalAnimation?.layers.map((_, index) => index));
  const [layersDeleted, setLayersDeleted] = useState(originalAnimation?.layers.map((_, index) => index));

  const animRef = useRef<any>(null);
  const [lottieRef, setLottieRef] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState({
    isPaused: false,
    frame: 0,
  });

  const hideLayer = (hide: boolean, index: number) => {
    setCurrentFrame({
      isPaused: lottieRef?.isPaused,
      frame: lottieRef?.currentFrame,
    });
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
    setCurrentFrame({
      isPaused: lottieRef?.isPaused,
      frame: lottieRef?.currentFrame,
    });
    setLayersDeleted((prevLayersDeleted) => prevLayersDeleted.filter((layerIndex) => layerIndex !== index));
  };

  const handleLottieEvent = useCallback(
    (event: PlayerEvent) => {
      if (event === 'load') setLoaded(true);
    },
    [setLoaded],
  );

  useEffect(() => {
    // Filter animation.layers based on layersShown changes
    const filteredLayers = originalAnimation.layers.filter((_, index) => layersShown.includes(index));
    setAnimation((prevAnimation) => ({ ...prevAnimation, layers: filteredLayers }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersShown]);

  useEffect(() => {
    // Filter animation.layers based on layersShown changes
    const filteredLayers = originalAnimation.layers.filter((_, index) => layersDeleted.includes(index));
    setAnimation((prevAnimation) => ({ ...prevAnimation, layers: filteredLayers }));
    setOriginalAnimation((prevAnimation) => ({ ...prevAnimation, layers: filteredLayers }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersDeleted]);

  useEffect(() => {
    console.log(lottieRef?.isPaused);
    if (lottieRef && loaded && currentFrame) {
      if (currentFrame?.isPaused) {
        lottieRef.goToAndStop(currentFrame?.frame, true);
        console.log('goToAndStop');
      } else {
        lottieRef.goToAndPlay(currentFrame?.frame, true);
        console.log('goToAndPlay');
      }
    }
  }, [lottieRef, loaded, currentFrame]);

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '100vh',
              borderRight: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <LayerList layers={originalAnimation?.layers} layersShown={layersShown} hideLayer={hideLayer} deleteLayer={deleteLayer} />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Player
              ref={animRef}
              lottieRef={(instance) => setLottieRef(instance)}
              autoplay={!currentFrame?.isPaused}
              loop
              src={animation}
              onEvent={handleLottieEvent}
              style={{ height: 500, width: '100%' }}
            >
              <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box
            sx={{
              height: '100vh',
              borderLeft: '1px solid #F3F6F8',
              minWidth: 300,
            }}
          >
            <PanelTab />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Editor;
