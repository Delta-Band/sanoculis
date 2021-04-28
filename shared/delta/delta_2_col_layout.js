import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  layoutWrapper: {
    marginTop: '-1px',
    position: 'relative'
  },
  innerWrapper: {
    position: 'relative',
    maxWidth: 1620
  },
  contentWrapper: {
    width: '80vw',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '85%',
      // maxWidth: '500px',
      margin: 0
    }
  }
}));

function Delta2ColLayout({
  title,
  content,
  art,
  extendTopWith,
  extendBottomWith,
  background,
  titleColor,
  paddingTop = 0,
  paddingBottom = 0,
  isMobile
}) {
  // const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  // const bodyTxt =
  //   'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  return (
    <Box className={classes.layoutWrapper}>
      {extendTopWith}
      <Box
        pt={10 + paddingTop}
        pb={10 + paddingBottom}
        style={{ background: background || 'transparent' }}
        // display='flex'
        // justifyContent='center'
      >
        <Grid
          container
          alignItems='center'
          direction={upSM ? 'row' : 'column'}
          className={classes.innerWrapper}
        >
          <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
            {art}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.contentWrapper}>
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
      {extendBottomWith}
    </Box>
  );
}

export default Delta2ColLayout;
