import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Typography, Link as MuiLink } from '@material-ui/core';
import { ChevronDownCircle as Chevron } from '@styled-icons/boxicons-regular/ChevronDownCircle';
import { DeltaDropMenu } from '../shared';
import { motion, AnimatePresence } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(25),
    position: 'relative',
    display: 'flex'
  },
  globalMap: {
    width: '100vw',
    height: '100vw',
    maxHeight: '50vh',
    objectFit: 'contain',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '80vh'
    }
  },
  whiteWave: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translateY(-50%)'
    // [theme.breakpoints.up('lg')]: {
    //   transform: 'translateY(-50%)'
    // }
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
    maxWidth: 300,
    height: theme.spacing(6),
    background: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(5),
    border: '2px solid',
    borderColor: theme.palette.primary.dark,
    position: 'relative'
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  menuInner: {
    background: '#FFF',
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    maxWidth: 600,
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      borderRadius: theme.spacing(2)
    }
  },
  menuItem: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    cursor: 'pointer',
    '&:last-child': {
      border: 'none'
    }
  },
  distributiorDetails: {
    padding: theme.spacing(3),
    background: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(1),
    border: '2px solid',
    borderColor: theme.palette.primary.dark,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '80vw',
    '& > *': {
      marginBottom: theme.spacing(1),
      '&:last-child': {
        marginBottom: 0
      }
    },
    [theme.breakpoints.up('sm')]: {
      width: 380
    }
  }
}));

export default function DistributorsForHome({ disributors }) {
  /** HOOKS */
  const theme = useTheme();
  const classes = useStyles();
  const [selection, setSelection] = useState(disributors[0]);

  /** METHODS */
  function selectCountry(item) {
    setSelection(item);
  }

  return (
    <div className={classes.root}>
      <img src='images/white_wave.png' className={classes.whiteWave} />
      <img src='images/global_map.svg' className={classes.globalMap} />
      <div className={classes.contentLayer}>
        <Typography variant='h2'>Global Distribution & Partners</Typography>
        <DeltaDropMenu
          target={
            <div className={classes.dropMenuTarget}>
              <Typography>{selection.country}</Typography>
              <Chevron size={30} color={theme.palette.primary.dark} />
              <AnimatePresence>
                <motion.div
                  key={selection.country}
                  transition={{
                    type: 'spring',
                    bounce: 0.25
                  }}
                  initial={{ opacity: 0, y: 210, x: '-50%' }}
                  animate={{ opacity: 1, y: 60, x: '-50%' }}
                  exit={{ opacity: 0, y: 210, x: '-50%' }}
                  exitBeforeEnter
                  className={classes.distributiorDetails}
                >
                  <Typography>{selection.company}</Typography>
                  <Typography>{selection.address}</Typography>
                  <MuiLink
                    key={3}
                    target='_blank'
                    rel='noreferrer'
                    href={`tel:${selection.phone}`}
                  >
                    <Typography>{selection.phone}</Typography>
                  </MuiLink>
                  <MuiLink
                    key={3}
                    target='_blank'
                    rel='noreferrer'
                    href={`mailto:${selection.email}`}
                  >
                    <Typography>{selection.email}</Typography>
                  </MuiLink>
                  <MuiLink
                    key={3}
                    target='_blank'
                    rel='noreferrer'
                    href={selection.website}
                  >
                    <Typography>{selection.website}</Typography>
                  </MuiLink>
                </motion.div>
              </AnimatePresence>
            </div>
          }
          menu={
            <div className={classes.menuInner}>
              {disributors.map((item) => (
                <div
                  key={item.email}
                  className={classes.menuItem}
                  onClick={() => selectCountry(item)}
                >
                  <Typography
                    style={{
                      color:
                        item.country === selection.country
                          ? theme.palette.primary.main
                          : theme.palette.secondary.contrastText
                    }}
                  >
                    {item.country}
                  </Typography>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
}
