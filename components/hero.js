import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import cx from 'classnames';
import { Delta2ColLayout } from '../shared';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
  }
}));

function Hero({ tagline, description, art }) {
  const theme = useTheme();
  const classes = useStyles();
  // const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Delta2ColLayout
      paddingTop={10}
      paddingBottom={10}
      background={theme.palette.primary.main}
      art={art}
      extendBottomWith={
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
