import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

function Delta2ColLayout({
  title,
  content,
  art,
  extendTopWith,
  background,
  titleColor,
  paddingTop = 0,
  paddingBottom = 0,
  isMobile
}) {
  // const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  // const bodyTxt =
  //   'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';

  return (
    <Box>
      {extendTopWith}
      <Box
        pt={10 + paddingTop}
        pb={10 + paddingBottom}
        style={{ background: background || 'transparent' }}
      >
        <Grid container alignItems='center'>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            {art}
          </Grid>
          <Grid item xs={6}>
            <Box maxWidth={540}>
              <Typography variant='h2' style={{ color: titleColor }}>
                {title}
              </Typography>
              {content.map((itm) => (
                <Box mt={5} key={`item-${itm.key}`}>
                  {itm}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Delta2ColLayout;
