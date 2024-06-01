import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { LottieJson } from '../pages/Editor';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface SettingsTabProps {
  lottie: LottieJson;
  setAnimation: Dispatch<SetStateAction<LottieJson>>;
}

const SettingsTab: FC<SettingsTabProps> = ({ lottie, setAnimation }) => {
  const [width, setWidth] = useState<number>(lottie?.w);
  const [height, setHeight] = useState<number>(lottie?.h);
  const [duration, setDuration] = useState<number>(lottie?.op);
  const [frameRate, setFrameRate] = useState<number>(lottie?.fr);

  const changeAnimState = () => {
    setAnimation((prevState) => ({
      ...prevState,
      w: width,
      h: height,
      op: duration,
      fr: frameRate,
    }));
  };

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
