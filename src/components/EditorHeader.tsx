import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import GrassIcon from '@mui/icons-material/Grass';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Link } from 'react-router-dom';

function EditorHeader() {
  const [toggleHeader, setToggleHeader] = React.useState(false);

  return (
    <AppBar position="sticky" color="transparent" sx={{ backgroundColor: 'white', borderBottom: '1px solid #F3F6F8' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 276, borderRight: '1px solid #F3F6F8' }}
            onMouseEnter={() => setToggleHeader(true)}
            onMouseLeave={() => setToggleHeader(false)}
          >
            <Box
              sx={{
                backgroundColor: '#00DDB3',
                borderRadius: 2,
              }}
            >
              <GrassIcon
                sx={{
                  width: 36,
                  height: 32,
                  color: 'white',
                }}
              />
            </Box>
            {!toggleHeader ? (
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/workspace"
                sx={{
                  ml: 1,
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                RottieEditor
              </Typography>
            ) : (
              <Typography
                component="a"
                href="/workspace"
                sx={{ ml: 1, textDecoration: 'none' }}
                variant="body2"
                fontWeight="bold"
                color="primary.main"
              >
                Back to workspace
              </Typography>
            )}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/workspace"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RottieEditor
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem onClick={() => alert('undo')}>
              <UndoIcon />
            </MenuItem>
            <MenuItem onClick={() => alert('redo')}>
              <RedoIcon />
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Go to workspace">
              <IconButton sx={{ p: 0 }} component={Link} to="/workspace">
                <Avatar alt="Avatar" src="https://avatar.iran.liara.run/public/17" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default EditorHeader;
