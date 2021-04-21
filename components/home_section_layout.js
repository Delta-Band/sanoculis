import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

function HomeSectionLayout({
  title,
  content,
  art,
  extendTopWith,
  background,
  titleColor,
  isMobile
}) {
  // const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  // const bodyTxt =
  //   'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';

  return (
    <Box>
      {extendTopWith}
      <Box pt={10} pb={10} style={{ background: background || 'transparent' }}>
        <Grid container alignItems='center'>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Box mr={10} style={{ background: 'transparent' }}>
              {art}
            </Box>
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

export default HomeSectionLayout;
