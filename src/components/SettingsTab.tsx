import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function SettingsTab() {
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
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{ mr: 1, '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
          InputProps={{
            startAdornment: <Typography variant="caption">w</Typography>,
          }}
        />
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }}
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
        <TextField id="outlined-basic" variant="outlined" size="small" sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, letterSpacing: 1, flex: 1 }}>Frame rate</Typography>
        <TextField id="outlined-basic" variant="outlined" size="small" sx={{ '& .MuiInputBase-input': { fontSize: 12, height: 8, padding: 1 } }} />
      </Box>
      <Button variant="outlined" fullWidth size="small" sx={{ borderRadius: 2 }}>
        Update
      </Button>
    </Box>
  );
}
