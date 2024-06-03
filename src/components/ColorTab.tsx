import { useEffect, useState } from 'react';
import { Box, Divider, Grid, Popover, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { SketchPicker } from 'react-color';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLottie } from '../context/LottieContext';
import { colorify, getColors, replaceColor, rgbToHex } from '../helper/colorify';

const ColorTab: React.FC = () => {
  const { animation: lottie, setAnimation, setSaveCount } = useLottie();

  const [uniqueColors, setUniqueColors] = useState<number[][]>([]);
  const [allColors, setAllColors] = useState<number[][]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<number[] | string>([0, 0, 0]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>, color: number[], index: number | null) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
    setSelectedColor(color);
    setSelectedIndex(index);
  };

  const removeDuplicateArrays = (arrOfArrays: number[][]): number[][] => {
    const map = new Map<string, number[]>();
    arrOfArrays.forEach((arr: number[]) => {
      const str = JSON.stringify(arr);
      map.set(str, arr);
    });

    const uniqueArrays: number[][] = Array.from(map.values());

    return uniqueArrays;
  };

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
                    onClick={(e) => handleClick(e, color, index !== 0 ? ci : null)}
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
              let colors = getColors(lottie);
              colors[selectedIndex] = [color.rgb.r, color.rgb.g, color.rgb.b];
              setAnimation(colorify(colors, lottie, true));
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
