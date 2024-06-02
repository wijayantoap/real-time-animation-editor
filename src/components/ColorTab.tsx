import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Grid, Popover, Typography } from '@mui/material';
import { Layer } from './LayerList';
import { LottieJson } from '../pages/Editor';
import { useEffect, useState } from 'react';
import { colorify, getColors, replaceColor, rgbToHex } from '../helper/colorify';
import { SketchPicker } from 'react-color';

interface ColorTabProps {
  lottie: LottieJson;
  layers: Layer[];
  setAnimation: React.Dispatch<React.SetStateAction<LottieJson>>;
  setSaveCount: React.Dispatch<React.SetStateAction<number>>;
}

const ColorTab: React.FC<ColorTabProps> = ({ lottie, setAnimation, setSaveCount }) => {
  const [uniqueColors, setUniqueColors] = useState<number[][]>([]);
  const [allColors, setAllColors] = useState<number[][]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<number[] | string>([0, 0, 0]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>, color: number[], index: number) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setSelectedColor(color);
    setSelectedIndex(index);
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
      setUniqueColors(removeDuplicateArrays(getColors(lottie)));
      setAllColors(getColors(lottie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lottie]);

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
              {item.map((color, ci) => (
                <Grid item key={ci}>
                  <Box
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: 8,
                      backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                      border: `1px solid lightgray`,
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'black',
                      },
                    }}
                    onClick={(e) => handleClick(e, color, ci)}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        elevation={1}
      >
        <SketchPicker
          color={typeof selectedColor === 'string' ? selectedColor : rgbToHex(selectedColor)}
          onChangeComplete={(color) => {
            if (selectedIndex) {
              const colors = getColors(lottie);
              colors[selectedIndex] = [color.rgb.r, color.rgb.g, color.rgb.b];
              setAnimation(colorify(colors, lottie));
            } else {
              setAnimation(replaceColor(selectedColor, color.hex, lottie));
            }
            setSelectedColor(color.hex);
            setSaveCount((prevState) => prevState + 1);
          }}
        />
      </Popover>
      <Divider />
    </>
  );
};

export default ColorTab;
