import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Typography } from '@mui/material';

export default function ColorTab() {
  return (
    <>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary
          sx={{
            backgroundColor: 'white',
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={'bold'} variant="caption" letterSpacing={1}>
            All Colors
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              height: 20,
              width: 20,
              borderRadius: 8,
              backgroundColor: 'white',
              border: '1px solid lightgray',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'black',
              },
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
    </>
  );
}
