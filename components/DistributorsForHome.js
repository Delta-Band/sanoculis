import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChevronDownCircle as Chevron } from '@styled-icons/boxicons-regular/ChevronDownCircle';
import { DeltaDropMenu } from '../shared';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(10),
    position: 'relative'
  },
  globalMap: {
    width: '100vw',
    height: '100vw',
    objectFit: 'cover'
  },
  whiteWave: {
    width: '100vw',
    height: 50,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translateY(-50%)'
  },
  contentLayer: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(9),
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h2': {
      textAlign: 'center'
    }
  },
  dropMenuTarget: {
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1.4),
    width: '70vw',
    height: theme.spacing(6),
    background: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(5),
    border: '2px solid',
    borderColor: theme.palette.primary.dark
  },
  menuMobile: {
    background: '#FFF',
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2)
  },
  menuItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    '&:last-child': {
      border: 'none'
    }
  }
}));

export default function DistributorsForHome() {
  /** HOOKS */
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src='images/white_wave.png' className={classes.whiteWave} />
      <img src='images/global_map.svg' className={classes.globalMap} />
      <div className={classes.contentLayer}>
        <Typography variant='h2'>Global Distribution & Partners</Typography>
        <DeltaDropMenu
          target={
            <div className={classes.dropMenuTarget}>
              <Typography>Trarget</Typography>
              <Chevron size={30} color={theme.palette.primary.dark} />
            </div>
          }
          menu={
            <div className={classes.menuMobile}>
              <div className={classes.menuItem}>
                <Typography>Menu Item1</Typography>
              </div>
              <div className={classes.menuItem}>
                <Typography>Menu Item2</Typography>
              </div>
              <div className={classes.menuItem}>
                <Typography>Menu Item3</Typography>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
