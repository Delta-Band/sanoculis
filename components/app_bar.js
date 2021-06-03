import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { motion } from 'framer-motion';
import { Grid, Box, Typography } from '@material-ui/core';
import { Rotate as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import cx from 'classnames';
import { useReadyState } from '../context/ready.context';
import { DeltaCarousel } from '../shared';
import ContactForm from './contact_form';

const useStyles = makeStyles((theme) => ({
  appBar: {
    userSelect: 'none',
    position: 'fixed',
    width: '100vw',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    zIndex: 3,
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  menuWrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    background: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      width: '50%',
      paddingLeft: theme.spacing(10)
    }
  },
  logo: {
    width: '42vw',
    maxWidth: 190,
    marginLeft: theme.spacing(2),
    transform: 'translateY(2px)'
  },
  menuItem: {
    color: '#FFF',
    cursor: 'pointer',
    padding: '18px 0'
  },
  menuItemTxt: {
    color: 'inherit',
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: '22px',
    [theme.breakpoints.up('md')]: {
      fontSize: '32px',
      textAlign: 'left'
    }
  },
  linkWrap: {
    overflow: 'hidden',
    display: 'block'
  },
  contactWrapper: {
    height: '100%',
    background: theme.palette.primary.dark
  },
  contactWrapperInner: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    background: '#FFDACE',
    height: '100%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridForDesktop: {
    height: '100%'
  },
  backToMenu: {
    width: '100%',
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(3)
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

const contactForm = {
  hide: { opacity: 0, y: 50, transition: { bounce: 0 } },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 1 }
  }
};

const contactWrapper = {
  hide: { background: '#07003C', transition: { bounce: 0 }, y: '100%' },
  show: {
    background: '#FFDACE',
    y: 0,
    transition: { delay: 0.5, bounce: 0 }
  }
};

// SUB-COMPONENTS
function TopSection({ setExpand, expand, upSM, showContact }) {
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
            <motion.div
              onClick={() => setExpand(false)}
              className={classes.logo}
              animate={{
                fill: showContact ? '#000' : '#FFF'
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='155.672'
                height='21.996'
                viewBox='0 0 155.672 21.996'
              >
                <defs></defs>
                <path
                  d='M1073.552,614.3c2.449,0,3.874,2.075,5.149,4.724h.05l-.15-5.224a1.912,1.912,0,0,1-1.351.676c-.95,0-2.05-.676-3.8-.676-3.472,0-5.971,2.049-5.971,5.3,0,3.224,2.249,4.4,4.5,5.349,2.249.925,4.5,1.625,4.5,3.9a2.768,2.768,0,0,1-3.074,2.949c-2.25,0-4.474-2.3-6-5.549h-.051l.375,6.048a2.5,2.5,0,0,1,1.621-.7c.978,0,2.25.7,4.127.7,3.349,0,6.248-2,6.248-5.472,0-3.85-2.774-4.874-5.224-5.824-1.95-.776-3.674-1.477-3.674-3.5a2.6,2.6,0,0,1,2.506-2.7q.109,0,.219,0m19.92,16.221a1.943,1.943,0,0,1-.525.1c-.975,0-1.175-.75-1.175-2,0-2.1.025-3.949.025-5.524,0-3.1-2.1-4.174-5.6-4.174-2.849,0-4.849,1.175-4.849,3.1a2.077,2.077,0,0,0,2.071,2.084q.1,0,.2-.009a2.47,2.47,0,0,0,2.449-1.475,1.108,1.108,0,0,1-.375.075c-.65,0-1.05-.5-1.05-1.525s.5-1.8,1.45-1.8c1.075,0,1.475.975,1.475,2.124v2.874l-1.625.325c-2.7.575-5.224,1.225-5.224,3.949,0,2.049,1.525,3.074,3.349,3.074a3.39,3.39,0,0,0,3.549-2.6c0,.075.05.473.05.525.274,1.325,1.225,2.125,3,2.125a3.588,3.588,0,0,0,2.8-1.2Zm-5.9-5.7V627.6c-.025,1.4-.55,2.424-1.525,2.424-.775,0-1.2-.775-1.2-2.074,0-1.65.65-2.574,1.974-2.949Zm5.749-5.649v.05c.95.625,1.1,1,1.1,2.724v6.923c0,1.65-.075,2-.975,2.624v.05h6.2v-.05c-.878-.625-.975-.975-.975-2.624V623.9c0-1.95.75-2.874,1.75-2.874.975,0,1.351.75,1.351,1.725v6.123c0,1.65-.075,2-.95,2.624v.05h6.2v-.05c-.9-.625-.976-.975-.976-2.624v-6.023c0-2.249-1.125-3.924-3.524-3.924a3.874,3.874,0,0,0-3.85,3.2v-2.949Zm20.62,12.622a6.14,6.14,0,0,0,6.254-6.025q0-.2-.005-.4a6.239,6.239,0,1,0-6.633,6.417q.192.009.385.006m0-.425c-1.3,0-1.725-2.124-1.725-6,0-3.9.425-6.023,1.725-6.023s1.75,2.124,1.75,6.023c0,3.877-.45,6-1.75,6m13.971-12.024c1,0,1.5.676,1.5,1.824,0,.95-.375,1.725-1.225,1.725a.9.9,0,0,1-.425-.075,1.862,1.862,0,0,0,2.049,1.4,2.116,2.116,0,0,0,2.223-2q.005-.1,0-.2c0-2-1.775-3.1-4.2-3.1a6.4,6.4,0,0,0-6.553,6.245q-.005.215,0,.431c0,3.874,2.6,6.2,5.749,6.2a4.918,4.918,0,0,0,5.149-4.323l-.15-.05a3.084,3.084,0,0,1-3.024,2.224c-2.125,0-3.4-1.9-3.4-5.174,0-2.975.8-5.124,2.3-5.124Zm13.022,7.425c0,1.974-.725,2.9-1.7,2.9-.925,0-1.325-.8-1.325-1.75v-8.748h-5.374v.05c.95.625,1.1,1,1.1,2.724v5.9c0,2.275,1.125,3.949,3.5,3.949a3.825,3.825,0,0,0,3.8-3.224v2.974h5.3v-.05c-.875-.6-1.025-1-1.025-2.624v-9.7h-5.374v.05c.95.625,1.1,1,1.1,2.724Zm11.172-13.947h-5.448v.05c.95.575,1.175,1,1.175,2.724v13.272c0,1.65-.075,2-.95,2.624v.05h6.2v-.05c-.9-.625-.975-.975-.975-2.624Zm2.375,2.524a2.343,2.343,0,0,0,2.335,2.35h.064a2.364,2.364,0,0,0,2.424-2.3c0-.015,0-.031,0-.046a2.349,2.349,0,0,0-2.347-2.351h-.078a2.327,2.327,0,0,0-2.4,2.256c0,.031,0,.062,0,.093Zm4.549,3.824h-5.349v.05c.95.625,1.1,1,1.1,2.724v6.923c0,1.65-.075,2-.975,2.624v.05h6.2v-.05c-.875-.625-.975-.975-.975-2.624Zm6.224.2c1.621,0,3.224,1.5,4.249,3.674h.05V618.9a1.856,1.856,0,0,1-1.3.6c-.825,0-1.621-.575-3.074-.575a3.952,3.952,0,0,0-4.2,3.924c0,2.349,1.3,3.524,4.049,4.526,1.7.6,2.574,1.025,2.574,2.224a1.715,1.715,0,0,1-1.9,1.775c-1.875,0-3.449-1.6-4.724-4.274h-.05l.25,4.724a1.76,1.76,0,0,1,1.225-.55,32.867,32.867,0,0,0,3.374.525c2.724,0,4.7-1.625,4.7-4.174,0-2.324-1.3-3.474-4.174-4.526-2.05-.75-2.7-1.148-2.7-2.249a1.47,1.47,0,0,1,1.652-1.477Z'
                  transform='translate(-1014.807 -612.825)'
                />
                <path
                  d='M3.82,15.084h0A10.069,10.069,0,0,1,3.01,0L4.337.124a9.166,9.166,0,0,0-1.306,1.3A9.049,9.049,0,0,0,1.372,4.54,9.126,9.126,0,0,0,1.34,9.725a9.054,9.054,0,0,0,.666,1.659,9.136,9.136,0,0,0,3,3.351l13.434-3.949a9.1,9.1,0,0,0-1.4-9.472l1.324.124a10.1,10.1,0,0,1,1.259,9ZM17.036,1.314h0L4.337.124h0L17.032,1.309l0,0h0Z'
                  transform='translate(12.368 3.595)'
                />
                <path
                  d='M4.808,9.615h0a4.785,4.785,0,0,1-2.688-.822A4.822,4.822,0,0,1,.377,6.678,4.8,4.8,0,0,1,.821,2.119,4.822,4.822,0,0,1,2.936.378,4.823,4.823,0,0,1,6.514.312,1.849,1.849,0,0,0,6.5.533,1.826,1.826,0,0,0,7.615,2.214a1.813,1.813,0,0,0,.71.143,1.822,1.822,0,0,0,.565-.089,4.8,4.8,0,0,1-.1,5.228A4.822,4.822,0,0,1,6.679,9.237,4.778,4.778,0,0,1,4.808,9.615Z'
                  transform='translate(17.642 5.968)'
                />
                <path
                  d='M399.174,674.561c-.29-.956-4.781-.509-11.275.95a.553.553,0,0,1,.01.059c4.585-.957,7.65-1.206,7.864-.507.363,1.2-7.755,4.715-18.128,7.857s-19.076,4.729-19.439,3.532c-.245-.811,3.4-2.691,9.011-4.8a.464.464,0,0,0-.02-.046c-7.642,2.77-12.776,5.337-12.448,6.421.446,1.464,10.749-.363,23.018-4.081s21.851-7.923,21.407-9.39'
                  transform='translate(-354.734 -666.541)'
                />
                <path
                  d='M450.243,613.1c-9.885-.915-18.1.511-18.345,3.183-.135,1.465,2.158,3,5.888,4.244,0-.038,0-.068,0-.109-2.359-.993-3.74-2.132-3.63-3.217.235-2.333,7.268-3.532,15.71-2.681,5.451.55,10.155,1.824,12.74,3.283,1.252-.24,2.387-.426,3.387-.557-2.8-1.854-8.755-3.5-15.753-4.148'
                  transform='translate(-426.203 -609.826)'
                />
              </svg>
            </motion.div>
          </a>
        </Link>
      </Grid>
      <Grid item>
        <motion.div
          animate={{
            color: (upSM && expand) || showContact ? '#000' : '#FFF'
          }}
        >
          <Hamburger
            toggled={expand}
            toggle={setExpand}
            size={upSM ? 36 : 26}
          />
        </motion.div>
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
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Grid item xs={12}>
      <motion.div
        className={classes.expandable}
        variants={expandable}
        initial='collapse'
        animate={expand ? 'expand' : 'collapse'}
      >
        {upMD ? (
          <Grid container className={classes.gridForDesktop}>
            <Grid xs={6} item>
              <Menu
                setShowContact={setShowContact}
                menuItems={menuItems}
                expand={expand}
                setExpand={setExpand}
              />
            </Grid>
            <Grid xs={6} item>
              <Contact expand={expand} setShowContact={setShowContact} />
            </Grid>
          </Grid>
        ) : (
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
                <Contact expand={expand} setShowContact={setShowContact} />
              );
            }}
          />
        )}
      </motion.div>
    </Grid>
  );
}

function Menu({ menuItems, expand, setExpand, setShowContact }) {
  const classes = useStyles();
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <motion.div
      variants={container}
      initial='hidden'
      className={classes.menuWrapper}
      style={{
        pointerEvents: expand ? 'all' : 'none'
      }}
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
      {!upMD && (
        <motion.div
          style={{ color: '#FFF' }}
          onClick={() => setShowContact(true)}
          whileHover={{ color: '#FF4F26' }}
          className={classes.menuItem}
          variants={item}
        >
          <Typography variant='h1' className={cx(classes.menuItemTxt)}>
            Contact <ChevronRight size={28} />
          </Typography>
        </motion.div>
      )}
    </motion.div>
  );
}

function Contact({ expand, setShowContact }) {
  const classes = useStyles();
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box className={classes.contactWrapper}>
      <motion.div
        variants={contactWrapper}
        className={classes.contactWrapperInner}
        initial={downSm ? 'show' : 'hide'}
        animate={downSm ? 'show' : expand ? 'show' : 'hide'}
      >
        <motion.div
          variants={contactForm}
          animate={expand ? 'show' : 'hide'}
          initial='hide'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant='h1'
            style={{ width: '100%', paddingLeft: theme.spacing(5) }}
          >
            Contact
          </Typography>
          <Box mb={5} />
          <ContactForm clear={!expand} />
          {!upMD && (
            <div
              onClick={() => setShowContact(false)}
              className={classes.backToMenu}
            >
              <Typography
                variant='h1'
                className={classes.menuItemTxt}
                style={{ color: '#000' }}
              >
                <ChevronLeft size={28} /> Menu
              </Typography>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Box>
  );
}

function AppBar({ menuItems, logo }) {
  const [expand, setExpand] = useState(false);
  const [hide, setHide] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const ref = useRef();
  const isReady = useReadyState();
  const classes = useStyles();

  // EFFECTS

  useEffect(() => {
    if (isReady) {
      setHide(false);
    }
  }, [isReady]);

  useEffect(() => {
    if (expand) {
      // disableScroll.on();
    } else {
      // disableScroll.off();
      setShowContact(false);
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
          showContact={showContact}
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
