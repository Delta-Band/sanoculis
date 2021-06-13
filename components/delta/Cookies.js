import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Grid, Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import useStorage from 'react-use-localstorage2';

const useStyles = makeStyles((theme) => ({
  cookiesRoot: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    zIndex: 1,
    background: theme.palette.primary.dark,
    borderColor: theme.palette.primary.contrastText,
    borderTop: '2px inset'
  },
  inner: {
    width: '100vw',
    padding: theme.spacing(3)
  },
  txt: {
    color: theme.palette.primary.contrastText
  },
  link: {
    color: 'inherit',
    fontWeight: '800'
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  container: {
    show: {
      y: '0%'
    },
    hide: {
      y: '100%'
    }
  }
};

function Cookies({ text, privacyPolicyUrl, immediate }) {
  const classes = useStyles();
  const [accept, setAccept] = useStorage('accept', false);
  const [waitForIt, setWaitForIt] = useState(!immediate);
  const to = useRef();

  function releaseWait() {
    window.removeEventListener('scroll', releaseWait);
    to.current = setTimeout(() => {
      if (to.current) {
        setWaitForIt(false);
      }
    }, 2000);
  }

  /** EFFECTS */
  useEffect(() => {
    window.addEventListener('scroll', releaseWait);
    return () => {
      window.removeEventListener('scroll', releaseWait);
    };
  }, []);

  return (
    <motion.div
      className={classes.cookiesRoot}
      variants={MOTION_VARIANTS.container}
      initial='hide'
      animate={!waitForIt && !accept ? 'show' : 'hide'}
      transition={{ duration: 0.5 }}
    >
      <div className={classes.inner}>
        <Grid
          container
          spacing={4}
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12} md={9}>
            <Typography className={classes.txt}>
              {text}{' '}
              <Link
                href={privacyPolicyUrl}
                rel='noopener noreferrer'
                target='_blank'
              >
                privacy policy & terms of use
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              disableElevation
              onClick={() => {
                setAccept(true);
              }}
            >
              Agree
            </Button>
          </Grid>
        </Grid>
      </div>
    </motion.div>
  );
}

export default Cookies;
