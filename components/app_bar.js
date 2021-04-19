import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { Grid, Box, Typography } from '@material-ui/core';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useScrollYPosition } from 'react-use-scroll-position';
import { Rotate as Hamburger } from 'hamburger-react';
import { useReadyState } from '../context/ready.context';

function AppBar({ menuItems, logo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
  const scrollY = useScrollYPosition();
  const ref = useRef();
  const isReady = useReadyState();

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

  // Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemSpring = {
    type: 'spring',
    duration: 1,
    bounce: 0.25,
    delay: 0.5
  };

  const menuItemStyle = {
    padding: upMd ? 22 : 14,
    cursor: 'pointer',
    display: 'inline-block'
  };

  // Methods
  function scrollToRef(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

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
        <Grid item xs={6} container style={{ padding: theme.spacing(0.75) }}>
          <Grid item xs={12}>
            <img
              style={{
                width: upMd ? '160px' : '90px',
                padding: '12px 0',
                marginLeft: theme.spacing(2)
              }}
              src={logo}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <motion.div
            style={{
              height: '100%'
            }}
            animate={{
              backgroundColor: isOpen ? '#000' : theme.palette.primary.dark
            }}
          >
            <Grid container style={{ padding: theme.spacing(0.75) }}>
              <Grid item xs={11}></Grid>
              <Grid item xs={1}>
                <Hamburger
                  toggled={isOpen}
                  toggle={setIsOpen}
                  size={upMd ? 36 : 26}
                />
              </Grid>
            </Grid>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default AppBar;
