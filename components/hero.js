import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroRoot: {
    position: 'relative',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(14),
    background: theme.palette.primary.main,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(0)
    }
  },
  content: {
    width: '100vw',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: '80vw',
      margin: '0 auto',
      marginTop: theme.spacing(8)
    },
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginTop: theme.spacing(3),
      transform: 'translate(5%, -50%)',
      width: '40vw',
      maxWidth: 700
    },
    [theme.breakpoints.up('lg')]: {}
  },
  logo: { width: '100%' },
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
  },
  video: {
    width: '100%',
    objectFit: 'cover'
  },
  wave: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    transform: 'translateY(65%)'
  }
}));

function Hero({ tagline, description }) {
  const theme = useTheme();
  const classes = useStyles();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.heroRoot}>
      <video
        playsInline
        muted
        loop
        className={classes.video}
        src={`videos/${upMD ? 'desktop' : 'mobile'}/hero.mp4`}
        autoPlay
      />
      <div className={classes.content}>
        <img src='mims_for_hero.svg' className={classes.logo} />
        <Typography className={cx(classes.white, classes.tagline)}>
          {tagline}
        </Typography>
        <Typography
          className={classes.white}
          style={{ whiteSpace: 'pre-line', marginTop: theme.spacing(4) }}
        >
          {description}
        </Typography>
      </div>
      <img src='images/white_wave.png' className={classes.wave} />
    </div>
  );
}

export default Hero;
