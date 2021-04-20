import React from 'react';
import { Grid, Box } from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';

function Inovation({ isMobile }) {
  // const theme = useTheme();
  // const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  // const bodyTxt =
  //   'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';

  return (
    <Box mt={10}>
      <Grid container>
        <Grid item xs={6}>
          Left
        </Grid>
        <Grid item xs={6}>
          Right
        </Grid>
      </Grid>
    </Box>
  );
}

export default Inovation;
