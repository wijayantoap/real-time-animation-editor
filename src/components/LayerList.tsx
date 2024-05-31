import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function LayerList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: '100%',
        '& .MuiListItemButton-root': {
          border: '1px solid white',
          '&, & .MuiListItemIcon-root': {
            color: 'black',
          },
        },
        '& .MuiListItemButton-root:hover': {
          bgcolor: 'white',
          border: '1px solid lightgray',
          '&, & .MuiListItemIcon-root': {
            color: 'black',
          },
        },
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Layers
        </ListSubheader>
      }
    >
      <ListItemButton disableRipple onClick={handleClick}>
        <ListItemIcon>
          <RectangleRoundedIcon sx={{ color: '#F3F6F8', width: 32, height: 32 }} />
        </ListItemIcon>
        <ListItemText primary="Main" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {[1, 2, 3].map((item, index) => (
            <ListItemButton disableRipple sx={{ pl: 4 }}>
              <ListItemIcon>
                <RectangleRoundedIcon sx={{ color: '#F3F6F8', width: 32, height: 32 }} />
              </ListItemIcon>
              <ListItemText primary={`Layers ${index + 1}`} />
              <IconButton size="small">
                <VisibilityIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
              <IconButton size="small">
                <DeleteForeverOutlinedIcon sx={{ width: 16, height: 16 }} />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
