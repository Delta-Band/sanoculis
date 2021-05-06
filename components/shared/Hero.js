import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    height: 876,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: '80vh'
    }
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  heroImageOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%,${fade(
      theme.palette.primary.main,
      0
    )} 80%)`,
    top: 0,
    left: 0
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      boxSizing: 'unset',
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(0),
      paddingBottom: theme.spacing(10)
    },
    [theme.breakpoints.up('md')]: {
      width: 1300,
      padding: 0,
      maxWidth: '80vw',
      left: '50%',
      bottom: theme.spacing(10),
      transform: 'translateX(-50%)'
    }
  },
  whiteTxt: {
    color: '#FFF',
    marginTop: theme.spacing(5.5)
  },
  title: {
    whiteSpace: 'break-spaces'
  }
}));

export default function Hero({
  imageSrc,
  imageSrcMobile,
  title,
  description,
  mobileHeight
}) {
  const classes = useStyles();
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div
      className={classes.root}
      style={{
        height: upMD ? undefined : mobileHeight
      }}
    >
      <img
        src={upMD ? imageSrc : imageSrcMobile}
        className={classes.heroImage}
      />
      <div className={classes.heroImageOverlay} />
      <div className={classes.contentWrapper}>
        <Typography
          variant='h2'
          className={cx(classes.whiteTxt, classes.title)}
        >
          {title}
        </Typography>
        {description ? (
          <Typography className={classes.whiteTxt}>{description}</Typography>
        ) : null}
      </div>
    </div>
  );
}
