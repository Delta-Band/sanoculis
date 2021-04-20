import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%)',
    width: '40vw'
  },
  white: {
    color: '#FFF'
  }
}));

function Hero({ tagline, description }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box position='relative'>
      <video style={{ width: '100vw' }} src='hero.mp4' autoPlay loop />
      <Box position='absolute' className={classes.textWrapper}>
        <img src='mims_for_hero.svg' />
        <Typography
          className={classes.white}
          style={{
            fontSize: 59,
            lineHeight: '72px',
            marginTop: theme.spacing(4)
          }}
        >
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
