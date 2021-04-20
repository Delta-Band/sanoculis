import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { Grid, Box, Typography } from '@material-ui/core';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useScrollYPosition } from 'react-use-scroll-position';
import { Rotate as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useReadyState } from '../context/ready.context';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    color: '#FFF',
    cursor: 'pointer',
    padding: theme.spacing(2)
  },
  menuItemTxt: {
    color: 'inherit',
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: '25pt'
  },
  linkWrap: {
    overflow: 'hidden',
    display: 'block'
  }
}));

function AppBar({ menuItems, logo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
  const scrollY = useScrollYPosition();
  const ref = useRef();
  const isReady = useReadyState();
  const classes = useStyles();

  const bar = {
    collapse: {
      height: upMd ? '65px' : '56px',
      transition: {
        delay: 0.5,
        bounce: 0
      }
    },
    expand: {
      height: '100%',
      y: '0%',
      transition: {
        bounce: 0
      }
    }
  };

  const container = {
    hidden: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
        bounce: 0,
        staggerDirection: -1
      }
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25,
        bounce: 0
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: '100%', transition: { bounce: 0 } },
    show: {
      opacity: 1,
      y: '0%',
      transition: { bounce: 0 }
    }
  };

  // Effect
  useEffect(() => {
    if (isScrollingDown && !hide && scrollY > 100) {
      setHide(true);
      setIsOpen(false);
    }
  }, [isScrollingDown]);

  useEffect(() => {
    if (isScrollingUp && hide) {
      setHide(false);
    }
  }, [isScrollingUp]);

  useEffect(() => {
    if (isReady) {
      setHide(false);
    }
  }, [isReady]);

  return (
    <motion.div
      ref={ref}
      id='appbar'
      style={{
        position: 'fixed',
        width: '100vw',
        background: theme.palette.primary.dark,
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        zIndex: 3,
        color: '#FFF',
        backdropFilter: 'blur(10px)'
      }}
      variants={bar}
      initial='hidden'
      animate={isOpen ? 'expand' : 'collapse'}
    >
      <Grid
        container
        direction='row'
        alignItems='stretch'
        style={{
          height: '100%'
        }}
      >
        <Grid
          item
          xs={6}
          container
          direction='row'
          // alignItems='stretch'
          style={{ padding: theme.spacing(0.75) }}
        >
          <Grid item xs={12}>
            <Link href='/'>
              <a>
                {/* <motion.div
                  transition={{ delay: isOpen ? 0.1 : 0, duration: 0.25 }}
                  animate={{
                    x: isOpen ? '27vw' : 0,
                    y: isOpen ? '17vh' : 0,
                    scale: isOpen ? 2 : 1
                  }}
                > */}
                <img
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: upMd ? '160px' : '90px',
                    padding: '12px 0',
                    marginLeft: theme.spacing(2)
                  }}
                  src={logo}
                />
                {/* </motion.div> */}
              </a>
            </Link>
          </Grid>
          <Grid item xs={12} style={{ transform: 'translateY(-100px)' }}>
            <Box style={{ paddingLeft: '5vw', paddingTop: '0vh' }}>
              <motion.div
                variants={container}
                initial='hidden'
                animate={isOpen ? 'show' : 'hidden'}
              >
                {menuItems.map((itm) => (
                  <motion.div
                    key={itm.linkTo}
                    style={{ color: '#FFF' }}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ color: '#FF4F26' }}
                    className={classes.menuItem}
                    variants={item}
                    // animate={{
                    //   opacity: isOpen ? 1 : 0,
                    //   y: isOpen ? 0 : 50
                    // }}
                  >
                    <Link href={`/${itm.linkTo}`}>
                      <a className={classes.linkWrap}>
                        <Typography
                          variant='h1'
                          className={classes.menuItemTxt}
                        >
                          {itm.label}
                        </Typography>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <motion.div
            style={{
              height: '100%'
            }}
            animate={{
              backgroundColor: isOpen ? '#FFDACE' : theme.palette.primary.dark
            }}
            transition={{
              delay: isOpen ? 0 : 0.5
            }}
          >
            <Grid container style={{ padding: theme.spacing(0.75) }}>
              <Grid item xs={11}></Grid>
              <Grid item xs={1}>
                <motion.div animate={{ color: isOpen ? '#000' : '#FFF' }}>
                  <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    size={upMd ? 36 : 26}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default AppBar;
