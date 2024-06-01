import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Layer } from './LayerList';
import { LottieJson } from '../pages/Editor';
import { useEffect, useState } from 'react';
import { getColors } from '../helper/colorify';

interface ColorTabProps {
  lottie: LottieJson;
  layers: Layer[];
}

const ColorTab: React.FC<ColorTabProps> = ({ lottie, layers }) => {
  const [uniqueColors, setUniqueColors] = useState<number[][]>([]);
  const [allColors, setAllColors] = useState<number[][]>([]);
  type NumberArray = number[];

  function removeDuplicateArrays(arrOfArrays: NumberArray[]): NumberArray[] {
    // Convert each inner array to a JSON string
    const map = new Map<string, NumberArray>();
    arrOfArrays.forEach((arr: NumberArray) => {
      const str = JSON.stringify(arr);
      map.set(str, arr);
    });

    // Convert the unique JSON strings back to arrays
    const uniqueArrays: NumberArray[] = Array.from(map.values());

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
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Divider />
    </>
  );
};

export default ColorTab;
