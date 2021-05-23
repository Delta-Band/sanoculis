import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import { Delta2ColLayout } from '../shared';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logo: { width: '100%', marginTop: -theme.spacing(5) },
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
    marginBottom: '40px',
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      marginTop: theme.spacing(0)
    }
  },
  gradientOverlay: {
    background:
      'linear-gradient(-90deg, rgba(97, 114, 255, 1) 0%, rgba(97, 114, 255, 0) 100%)',
    width: 50,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

function Hero({ tagline, description }) {
  const theme = useTheme();
  const classes = useStyles();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Delta2ColLayout
      paddingTop={upMD ? -2 : -10}
      paddingBottom={upMD ? -8 : 5}
      background={theme.palette.primary.main}
      fullWidth
      art={
        <div style={{ position: 'relative ' }}>
          <video
            playsInline
            muted
            className={classes.video}
            src='videos/hero.mp4'
            autoPlay
          />
          <div className={classes.gradientOverlay} />
        </div>
      }
      extendBottomWith={
        <img
          src='images/white_wave.png'
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'translateY(50%)'
          }}
        />
      }
      content={[
        <img key={0} src='mims_for_hero.svg' className={classes.logo} />,
        <Typography key={1} className={cx(classes.white, classes.tagline)}>
          {tagline}
        </Typography>,
        <Typography
          key={2}
          className={classes.white}
          style={{ whiteSpace: 'pre-line', marginTop: theme.spacing(4) }}
        >
          {description}
        </Typography>
      ]}
    />
  );
}

export default Hero;
