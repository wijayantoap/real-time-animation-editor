import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function InfoTab() {
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
        File specification
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, flex: 1 }}>Dimension</Typography>
        <Typography sx={{ fontSize: 12, backgroundColor: '#F3F6F8', p: 0.5, borderRadius: 1 }}>23.7 KB</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, flex: 1 }}>Bodymovin version</Typography>
        <Typography sx={{ fontSize: 12, backgroundColor: '#F3F6F8', p: 0.5, borderRadius: 1 }}>23.7 KB</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, flex: 1 }}>Generator</Typography>
        <Typography sx={{ fontSize: 12, backgroundColor: '#F3F6F8', p: 0.5, borderRadius: 1 }}>23.7 KB</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ mr: 2, fontSize: 12, flex: 1 }}>Lottie Web version</Typography>
        <Typography sx={{ fontSize: 12, backgroundColor: '#F3F6F8', p: 0.5, borderRadius: 1 }}>23.7 KB</Typography>
      </Box>
    </Box>
  );
}
