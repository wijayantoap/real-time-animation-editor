import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Grid, Popover, Typography } from '@mui/material';
import { Layer } from './LayerList';
import { LottieJson } from '../pages/Editor';
import { useEffect, useState } from 'react';
import { getColors, rgbToHex } from '../helper/colorify';
import { SketchPicker } from 'react-color';

interface ColorTabProps {
  lottie: LottieJson;
  layers: Layer[];
}

const ColorTab: React.FC<ColorTabProps> = ({ lottie, layers }) => {
  const [uniqueColors, setUniqueColors] = useState<number[][]>([]);
  const [allColors, setAllColors] = useState<number[][]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<number[]>([0, 0, 0]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>, color: number[]) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setSelectedColor(color);
  };

  function removeDuplicateArrays(arrOfArrays: number[][]): number[][] {
    // Convert each inner array to a JSON string
    const map = new Map<string, number[]>();
    arrOfArrays.forEach((arr: number[]) => {
      const str = JSON.stringify(arr);
      map.set(str, arr);
    });

    // Convert the unique JSON strings back to arrays
    const uniqueArrays: number[][] = Array.from(map.values());

    return uniqueArrays;
  }

  useEffect(() => {
    if (lottie) {
      try {
        setUniqueColors(removeDuplicateArrays(getColors(lottie)));
        setAllColors(getColors(lottie));
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lottie]);

  console.log(selectedColor && rgbToHex(selectedColor));

  return (
    <>
      {[uniqueColors, allColors].map((item, index) => (
        <Accordion elevation={0} defaultExpanded={index === 0} key={index}>
          <AccordionSummary
            sx={{
              backgroundColor: 'white',
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={'bold'} variant="subtitle2" letterSpacing={1}>
              {index === 0 ? `Unique Colors (${uniqueColors.length})` : `All colors (${allColors.length})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: 'white',
            }}
          >
            <Grid container spacing={1}>
              {item.map((color, index) => (
                <Grid item>
                  <Box
                    key={index}
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: 8,
                      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                      border: '1px solid lightgray',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'black',
                      },
                    }}
                    onClick={(e) => handleClick(e, color)}
                  />
                </Grid>
              ))}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                elevation={1}
              >
                <SketchPicker color={rgbToHex(selectedColor)} />
              </Popover>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Divider />
    </>
  );
};

export default ColorTab;
