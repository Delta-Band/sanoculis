import React from 'react';
import { Box, Typography, Button, Grid } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import cx from 'classnames';
import { Delta2ColLayout } from '../shared';

const useStyles = makeStyles((theme) => ({
  art: {
    height: '80vw',
    width: '80vw',
    [theme.breakpoints.up('md')]: {
      height: '40vw',
      width: '40vw'
    },
    [theme.breakpoints.up('md')]: {
      height: '25vw',
      width: '25vw'
    }
  }
}));

export default function ClinicalPerformance({ homePage, classes }) {
  const theme = useTheme();
  const _classes = useStyles();
  return (
    <Delta2ColLayout
      background={theme.palette.primary.dark}
      titleColor='#FFF'
      paddingTop={10}
      paddingBottom={5}
      art={
        <Box className={cx(classes.art, _classes.art)}>
          <img
            src='images/gradient_bg.svg'
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
          />
          <img
            src='images/performance.png'
            style={{
              position: 'absolute',
              right: '1%',
              top: '1.5%',
              width: '98%',
              height: '98%'
            }}
          />
          <lottie-interactive
            path='lottie/4.json'
            interaction='play-on-show'
            loop
            style={{
              width: '50%',
              position: 'absolute',
              bottom: 0,
              left: 0
            }}
          />
        </Box>
      }
      title={homePage.performanceTitle}
      content={[
        <Grid container key={1} spacing={4}>
          <Grid item xs={6}>
            <Typography variant='h3' className={classes.blueInfo}>
              {homePage.performanceMinDuration}
            </Typography>
            <Typography classes={{ root: classes.whiteText }}>
              Min Procedure
              <br />
              duration
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h3' className={classes.blueInfo}>
              {homePage.performanceIOP}
            </Typography>
            <Typography classes={{ root: classes.whiteText }}>
              IOP Reduction after 12
              <br />
              Months
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h3' className={classes.blueInfo}>
              {homePage.performanceMedReduction}
            </Typography>
            <Typography classes={{ root: classes.whiteText }}>
              Medication reduction
              <br />
              at 12 mo.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h3' className={classes.blueInfo}>
              {homePage.performanceComplication}
            </Typography>
            <Typography classes={{ root: classes.whiteText }}>
              Major intra/post-op
              <br />
              complications
            </Typography>
          </Grid>
        </Grid>,
        <Link key={2} href='/clinical'>
          <a>
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              size='large'
            >
              {homePage.performanceBtnTxt}
            </Button>
          </a>
        </Link>
      ]}
    />
  );
}
