import { FC, useState } from 'react';
import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LayersIcon from '@mui/icons-material/Layers';
import colors from '../constants/colors';

export interface Layer {
  nm: string; // name
  ty: number; // type
  st: number; // start frame
  op: number; // end frame
  [key: string]: any; // to allow other properties that we may not explicitly define
  shapes: Shape[];
}

export interface Shape {
  ty: string;
  c?: {
    k: number[];
  };
}

interface LayerListProps {
  name: string;
  layers: Layer[];
  layersShown: number[];
  hideLayer: (show: boolean, index: number) => void;
  deleteLayer: (index: number) => void;
}

const LayerList: FC<LayerListProps> = ({ name, layers, layersShown, hideLayer, deleteLayer }) => {
  const [open, setOpen] = useState(true);

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
          <RectangleRoundedIcon sx={{ color: colors.lightgray, width: 32, height: 32 }} />
        </ListItemIcon>
        <ListItemText primary={name || 'Main'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {layers?.map((item, index) => {
            const isShown = layersShown.includes(index);
            return (
              <ListItemButton disableRipple key={index} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LayersIcon sx={{ color: colors.lightgray, width: 32, height: 32 }} />
                </ListItemIcon>
                <ListItemText primary={item?.nm} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                <IconButton size="small" onClick={() => hideLayer(isShown, index)}>
                  {isShown ? <VisibilityIcon sx={{ width: 16, height: 16 }} /> : <VisibilityOffIcon sx={{ width: 16, height: 16 }} />}
                </IconButton>
                <IconButton size="small" onClick={() => deleteLayer(index)}>
                  <DeleteForeverOutlinedIcon sx={{ width: 16, height: 16 }} />
                </IconButton>
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default LayerList;
