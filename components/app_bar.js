import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import disableScroll from 'disable-scroll';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { Grid, Box, Typography } from '@material-ui/core';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useScrollYPosition } from 'react-use-scroll-position';
import { Rotate as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useReadyState } from '../context/ready.context';
import { DeltaCarousel } from '../shared';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    width: '100vw',
    background: theme.palette.primary.dark,
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    zIndex: 3,
    height: 'auto !important',
    color: '#FFF'
  },
  topSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  expandable: {
    overflow: 'hidden',
    paddingTop: 64,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '42vw',
    maxWidth: 190,
    marginLeft: theme.spacing(2)
  },
  menuItem: {
    color: '#FFF',
    cursor: 'pointer',
    padding: '18px 0'
  },
  menuItemTxt: {
    color: 'inherit',
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: '22px',
    textAlign: 'center'
  },
  linkWrap: {
    overflow: 'hidden',
    display: 'block'
  }
}));

// MOTION VARIANTS

const bar = {
  // collapse: {
  //   height: upMd ? '65px' : '56px',
  //   y: '0%',
  //   transition: {
  //     delay: 0.5,
  //     bounce: 0
  //   }
  // },
  // expand: {
  //   height: '100%',
  //   y: '0%',
  //   transition: {
  //     bounce: 0
  //   }
  // },
  show: {
    y: 0,
    transition: {
      bounce: 0
    }
  },
  hide: {
    y: '-100%',
    transition: {
      bounce: 0
    }
  }
};

const expandable = {
  collapse: {
    height: '0',
    transition: {
      bounce: 0,
      stiffness: 50,
      delay: 0.5
    }
  },
  expand: {
    height: '100vh',
    transition: {
      bounce: 0,
      stiffness: 50
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

// SUB-COMPONENTS
function Menu({ menuItems, expand, setExpand }) {
  const classes = useStyles();

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate={expand ? 'show' : 'hidden'}
    >
      {menuItems.map((itm) => (
        <motion.div
          key={itm.linkTo}
          style={{ color: '#FFF' }}
          onClick={() => setExpand(false)}
          whileHover={{ color: '#FF4F26' }}
          className={classes.menuItem}
          variants={item}
        >
          <Link href={`/${itm.linkTo}`}>
            <a className={classes.linkWrap}>
              <Typography variant='h1' className={classes.menuItemTxt}>
                {itm.label}
              </Typography>
            </a>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Contact() {
  return <Box>Contact</Box>;
}

function AppBar({ menuItems, logo }) {
  const [expand, setExpand] = useState(false);
  const [hide, setHide] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
  const scrollY = useScrollYPosition();
  const ref = useRef();
  const isReady = useReadyState();
  const classes = useStyles();

  // EFFECTS

  useEffect(() => {
    if (isScrollingDown && !hide && scrollY > 100) {
      setHide(true);
      console.log('hide app bar');
      setExpand(false);
    }
  }, [isScrollingDown]);

  useEffect(() => {
    if (isScrollingUp && hide) {
      setHide(false);
      console.log('show app bar');
    }
  }, [isScrollingUp]);

  useEffect(() => {
    if (isReady) {
      setHide(false);
    }
  }, [isReady]);

  useEffect(() => {
    if (expand) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [expand]);

  return (
    <motion.div
      ref={ref}
      className={classes.appBar}
      variants={bar}
      initial='show'
      animate={hide ? 'hide' : 'show'}
    >
      <Grid container direction='row' spacing={0}>
        <Grid
          item
          xs={12}
          key={111}
          container
          className={classes.topSection}
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            <Link href='/'>
              <a>
                <img
                  onClick={() => setExpand(false)}
                  className={classes.logo}
                  src={logo}
                />
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Hamburger
              toggled={expand}
              toggle={setExpand}
              size={upSM ? 36 : 26}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <motion.div
            className={classes.expandable}
            variants={expandable}
            initial='collapse'
            animate={expand ? 'expand' : 'collapse'}
          >
            <DeltaCarousel
              items={['menu', 'contact']}
              focus={showContact ? 1 : 0}
              itemBuilder={(item, i, index) => {
                return item === 'menu' ? (
                  <Menu
                    menuItems={menuItems}
                    expand={expand}
                    setExpand={setExpand}
                  />
                ) : (
                  <Contact />
                );
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}

export default AppBar;

{
  /* <Grid
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
                <img
                  onClick={() => setIsOpen(false)}
                  style={{
                    width: upMd ? '190px' : '140px',
                    padding: '12px 0',
                    marginLeft: theme.spacing(2)
                  }}
                  src={logo}
                />
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
            <Grid container justify='space-between'>
              <Grid item></Grid>
              <Grid item style={{ transform: 'translate(-25%, 10%)' }}>
                <motion.div animate={{ color: isOpen ? '#000' : '#FFF' }}>
                  <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    size={upSM ? 36 : 26}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Grid> */
}
