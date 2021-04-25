import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroWrapper: {
    background: theme.palette.primary.main,
    position: 'relative',
    paddingTop: 50
  },
  textWrapper: {
    width: '80vw',
    margin: '0 auto',
    padding: '40px 0 70px',
    [theme.breakpoints.up('sm')]: {
      width: '70vw'
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: '5%',
      transform: 'translateY(-40%)',
      width: '40vw'
    },
    '& img': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '70%'
      }
    }
  },
  tagline: {
    fontSize: 32,
    lineHeight: '38px',
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      fontSize: 59,
      lineHeight: '72px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 39,
      lineHeight: '52px'
    }
  },
  white: {
    color: '#FFF'
  }
}));

function Hero({ tagline, description }) {
  const theme = useTheme();
  const classes = useStyles();
  // const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={classes.heroWrapper}>
      <video style={{ width: '100vw' }} src='hero.mp4' autoPlay loop />
      <Box className={classes.textWrapper}>
        <img src='mims_for_hero.svg' />
        <Typography className={cx(classes.white, classes.tagline)}>
          {tagline}
        </Typography>
        <Typography
          className={classes.white}
          style={{ whiteSpace: 'pre-line', marginTop: theme.spacing(4) }}
        >
          {description}
        </Typography>
      </Box>
      <img
        src='wave_hero.svg'
        style={{
          width: '100vw',
          position: 'absolute',
          bottom: 0,
          left: 0,
          transform: 'scaleY(-1) scaleX(-1) translateY(-50%)'
        }}
      />
    </Box>
  );
}

export default Hero;
