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
    padding: theme.spacing(1)
  },
  menuItemTxt: {
    color: 'inherit'
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
        height: upMd ? 65 : 56,
        background: theme.palette.primary.dark,
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        zIndex: 3,
        color: '#FFF',
        backdropFilter: 'blur(10px)',
        y: '-100%'
      }}
      transition={{
        duration: 0.35
      }}
      animate={{
        height: isOpen ? '100%' : upMd ? 65 : 56,
        y: hide ? '-100%' : '0%'
      }}
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
          alignItems='stretch'
          style={{ padding: theme.spacing(0.75) }}
        >
          <Grid item xs={12}>
            <Link href='/'>
              <a>
                <motion.div
                  transition={{ delay: isOpen ? 0.1 : 0, duration: 0.25 }}
                  animate={{
                    x: isOpen ? theme.spacing(30) : 0,
                    y: isOpen ? theme.spacing(13) : 0,
                    scale: isOpen ? 1.5 : 1
                  }}
                >
                  <img
                    onClick={() => setIsOpen(false)}
                    style={{
                      width: upMd ? '160px' : '90px',
                      padding: '12px 0',
                      marginLeft: theme.spacing(2)
                    }}
                    src={logo}
                  />
                </motion.div>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Box p={6}>
              {menuItems.map((itm) => (
                <Link href={`/${itm.toLowerCase()}`} key={itm}>
                  <a>
                    <motion.div
                      style={{ color: '#FFF' }}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ color: '#FF4F26' }}
                      transition={{ duration: 0.25, delay: isOpen ? 0.1 : 0 }}
                      className={classes.menuItem}
                      animate={{ opacity: isOpen ? 1 : 0 }}
                    >
                      <Typography variant='h1' className={classes.menuItemTxt}>
                        {itm}
                      </Typography>
                    </motion.div>
                  </a>
                </Link>
              ))}
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
