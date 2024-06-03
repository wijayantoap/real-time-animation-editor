import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import GrassIcon from '@mui/icons-material/Grass';
import { Link } from 'react-router-dom';
import colors from '../constants/colors';

function EditorHeader() {
  const [toggleHeader, setToggleHeader] = useState(false);

  return (
    <AppBar position="sticky" color="transparent" sx={{ backgroundColor: 'white', borderBottom: `1px solid ${colors.lightgray}` }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 276, borderRight: `1px solid ${colors.lightgray}` }}
            onMouseEnter={() => setToggleHeader(true)}
            onMouseLeave={() => setToggleHeader(false)}
          >
            <Box
              sx={{
                backgroundColor: colors.secondary,
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

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
