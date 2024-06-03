import { FC, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { cloneDeep } from '../helper/colorify';
import { useLottie } from '../context/LottieContext';

const SettingsTab: FC = () => {
  const { animation: lottie, setAnimation, setSaveCount } = useLottie();
  const [originalWidth, setOriginalWidth] = useState(lottie?.w);
  const [originalHeight, setOriginalHeight] = useState(lottie?.h);
  const [width, setWidth] = useState<number>(lottie?.w);
  const [height, setHeight] = useState<number>(lottie?.h);
  const [duration, setDuration] = useState<number>(lottie?.op);
  const [frameRate, setFrameRate] = useState<number>(lottie?.fr);

  const changeAnimState = () => {
    const _lottie = updateScale(width, height);
    setAnimation({
      ..._lottie,
      w: width,
      h: height,
      op: duration,
      fr: frameRate,
    });
    setSaveCount((prevState) => prevState + 1);
  };

  // obj.layers[].ks.s.k[].s[val1,val2]
  // obj.layers[].ks.p.k[].s[val1,val2]

  function updateScale(width: number, height: number) {
    const _width = width / originalWidth;
    const _height = height / originalHeight;
    const obj = cloneDeep(lottie);
    if (!obj?.layers) {
      return;
    }

    obj.layers.forEach((layer: any) => {
      if (layer.ks?.s) {
        if (typeof layer.ks?.s?.k?.[0] === 'number' && typeof layer.ks?.s?.k?.[1] === 'number') {
          const lastItemWidth = layer.ks?.s?.k?.[0];
          const lastItemHeight = layer.ks?.s?.k?.[1];
          layer.ks.s.k[0] = _width * lastItemWidth;
          layer.ks.s.k[1] = _height * lastItemHeight;
        }

        layer.ks.s.k.forEach((item: any) => {
          if (item.s) {
            const lastItemWidth = item.s[0];
            const lastItemHeight = item.s[1];
            item.s[0] = _width * lastItemWidth;
            item.s[1] = _height * lastItemHeight;
          }
        });
      }

      if (layer.ks?.p) {
        if (typeof layer.ks?.p?.k?.[0] === 'number' && typeof layer.ks?.p?.k?.[1] === 'number') {
          const lastItemWidth = layer.ks?.p?.k?.[0];
          const lastItemHeight = layer.ks?.p?.k?.[1];
          layer.ks.p.k[0] = _width * lastItemWidth;
          layer.ks.p.k[1] = _height * lastItemHeight;
        }

        layer.ks.p.k.forEach((item: any) => {
          if (item.s) {
            const lastItemWidth = item.s[0];
            const lastItemHeight = item.s[1];
            item.s[0] = _width * lastItemWidth;
            item.s[1] = _height * lastItemHeight;
          }
        });
      }
    });

    return obj;
  }

  useEffect(() => {
    if (lottie) {
      setOriginalWidth(lottie.w);
      setOriginalHeight(lottie.h);
      setWidth(lottie.w);
      setHeight(lottie.h);
      setDuration(lottie.op);
      setFrameRate(lottie.fr);
    }
  }, [lottie]);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography fontWeight={'bold'} variant="caption" letterSpacing={1}>
        Animation settings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, letterSpacing: 1, flex: 1 }}>Dimension</Typography>
        <TextField
          value={width}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWidth(parseInt(event.target.value))}
          variant="outlined"
          size="small"
          sx={{ mr: 1, '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
          type="number"
          InputProps={{
            startAdornment: <Typography variant="caption">w</Typography>,
          }}
        />
        <TextField
          value={height}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHeight(parseInt(event.target.value))}
          variant="outlined"
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
          type="number"
          InputProps={{
            startAdornment: <Typography variant="caption">h</Typography>,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, letterSpacing: 1, flex: 1 }}>Duration</Typography>
        <TextField
          value={duration}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDuration(parseInt(event.target.value))}
          variant="outlined"
          size="small"
          type="number"
          sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, letterSpacing: 1, flex: 1 }}>Frame rate</Typography>
        <TextField
          value={frameRate}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFrameRate(parseInt(event.target.value))}
          variant="outlined"
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
          type="number"
        />
      </Box>
      <Button
        onClick={changeAnimState}
        variant="outlined"
        fullWidth
        size="small"
        sx={{ borderRadius: 2 }}
        disabled={!width || !height || !frameRate || !duration}
      >
        Update
      </Button>
    </Box>
  );
};

export default SettingsTab;
