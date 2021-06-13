import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { SectionLayout } from '../components/delta';

const useStyles = makeStyles((theme) => ({
  art: {
    width: '80vw',
    height: '80vw',
    position: 'relative',
    marginBottom: theme.spacing(5),
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      height: '50vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      height: '40vw',
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
    }
  },
  gradientCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  image: {
    position: 'absolute',
    right: '1%',
    top: '1.5%',
    width: '98%',
    height: '98%'
  },
  whiteText: {
    color: '#FFF'
  },
  blueInfo: {
    color: theme.palette.primary.main
  }
}));

export default function ClinicalPerformance({ homePage }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <SectionLayout
      background={theme.palette.primary.dark}
      titleColor='#FFF'
      paddingTop={10}
      paddingBottom={5}
      art={
        <div className={classes.art}>
          <img
            src='images/gradient_bg.svg'
            className={classes.gradientCircle}
          />
          <img src='images/performance.png' className={classes.image} />
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
        </div>
      }
      content={[
        <Typography key={0} variant='h2' style={{ color: '#FFF' }}>
          {homePage.performanceTitle}
        </Typography>,
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
