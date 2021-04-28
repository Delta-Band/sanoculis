import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import disableScroll from 'disable-scroll';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { Grid, Box, Typography } from '@material-ui/core';
import { useScrollDirection } from 'react-use-scroll-direction';
import { useScrollYPosition } from 'react-use-scroll-position';
import { Rotate as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useReadyState } from '../context/ready.context';
import { DeltaCarousel } from '../shared';

const useStyles = makeStyles((theme) => ({
  appBar: {
    userSelect: 'none',
    position: 'fixed',
    width: '100vw',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    // overflow: 'hidden',
    zIndex: 3,
    // height: 'auto !important',
    color: '#FFF'
  },
  topSection: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '64px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  expandable: {
    overflow: 'hidden',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  },
  menuWrapper: {
    height: '100%',
    width: '100%'
  },
  menuWrapperInner: {
    position: 'absolute',
    width: '100%',
    height: '100%'
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
  },
  contactWrapper: {
    paddingTop: 64,
    paddingBottom: 64,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFDACE'
  },
  blueBg: {
    background: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: 0,
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2)
  },
  peachBg: {
    background: '#FFDACE',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    paddingTop: 64,
    paddingBottom: 64
  },
  circleBtn: {
    background: '#FFF',
    width: 80,
    height: 80,
    borderRadius: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${theme.palette.primary.dark}`
  },
  contactCircle: {
    marginLeft: -64
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
    height: '64px',
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
function TopSection({ logo, setExpand, expand, upSM }) {
  const classes = useStyles();
  return (
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
        <Hamburger toggled={expand} toggle={setExpand} size={upSM ? 36 : 26} />
      </Grid>
    </Grid>
  );
}

function ExpandableSection({
  expand,
  showContact,
  menuItems,
  setExpand,
  setShowContact
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <motion.div
        className={classes.expandable}
        variants={expandable}
        initial='collapse'
        animate={expand ? 'expand' : 'collapse'}
      >
        <DeltaCarousel
          noFade
          items={['menu', 'contact']}
          focus={showContact ? 1 : 0}
          disableClickOnItem
          onChange={(index) => setShowContact(index)}
          itemBuilder={(item, i, index) => {
            return item === 'menu' ? (
              <Menu
                setShowContact={setShowContact}
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
  );
}

function Menu({ menuItems, expand, setExpand, setShowContact }) {
  const classes = useStyles();

  return (
    <motion.div
      variants={container}
      initial='hidden'
      className={classes.menuWrapper}
      animate={expand ? 'show' : 'hidden'}
    >
      <Grid
        container
        alignItems='stretch'
        direction='row'
        justify='flex-start'
        className={classes.menuWrapperInner}
      >
        <Grid item xs={10} className={classes.blueBg}>
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
        </Grid>
        <Grid item xs={2} className={classes.peachBg}>
          <motion.div
            className={cx(classes.contactCircle, classes.circleBtn)}
            onTouchStart={() => setShowContact(1)}
            animate={{
              scale: expand ? 1 : 0
            }}
            transition={{
              delay: expand ? 1 : 0
            }}
          >
            <Typography>Contact</Typography>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}

function Contact() {
  const classes = useStyles();
  return <Box className={classes.contactWrapper}>Contact</Box>;
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
        <TopSection
          logo={logo}
          setExpand={setExpand}
          expand={expand}
          upSM={upSM}
        />
        <ExpandableSection
          setShowContact={setShowContact}
          expand={expand}
          showContact={showContact}
          menuItems={menuItems}
          setExpand={setExpand}
        />
      </Grid>
    </motion.div>
  );
}

export default AppBar;
