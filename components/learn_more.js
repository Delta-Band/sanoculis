import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import cx from 'classnames';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  learnWrapper: {
    position: 'relative',
    width: '100%',
    height: 550,
    overflow: 'hidden',
    background: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '-40px',
    [theme.breakpoints.up('sm')]: {
      height: 650,
      marginBottom: '-48px'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      flexDirection: 'row',
      height: 350
    },
    [theme.breakpoints.up('lg')]: {
      height: 550
    },
    [theme.breakpoints.up('lg')]: {
      height: 750
    }
  },
  section: {
    height: '50%',
    width: '100%',
    flexShrink: 0,
    position: 'relative',
    '&:nth-of-type(2)': {
      marginTop: '-40px',
      [theme.breakpoints.up('sm')]: {
        marginTop: '-48px'
      },
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        left: '48.5%'
        // marginLeft: '-7%'marginTop: '-7vw',
      }
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
      width: '57%',
      position: 'absolute'
    }
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  },
  img1: {
    clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 85%)',
    [theme.breakpoints.up('md')]: {
      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%);'
    }
  },
  img2: {
    clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)',
    [theme.breakpoints.up('md')]: {
      clipPath: 'polygon(15% 0%, 100% 0, 100% 100%, 0 100%)'
    }
  },
  btn: {
    width: 'auto',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  muiBtn: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    }
  },
  transformBtn1: {
    top: '45%',
    [theme.breakpoints.up('md')]: {
      top: 'unset',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-60%)'
    }
  },
  transformBtn2: {
    top: '55%',
    [theme.breakpoints.up('md')]: {
      top: 'unset',
      left: 'unset',
      bottom: '10%',
      right: '50%',
      transform: 'translateX(60%)'
    }
  }
}));

export default function LearnMore() {
  const classes = useStyles();
  const theme = useTheme();
  const [colorize1, setColorize1] = useState(false);
  const [colorize2, setColorize2] = useState(false);

  function ImageFilter({ children, colorize }) {
    console.log(`colorize: ${colorize}`);
    return (
      <motion.div
        style={{
          height: '100%',
          filter: 'grayscale(1)'
        }}
        transition={{ duration: 1 }}
        animate={{
          filter: colorize ? 'grayscale(0)' : 'grayscale(1)'
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes.learnWrapper}>
      <div className={classes.section}>
        <ImageFilter colorize={colorize1}>
          <img
            src='images/vision.jpg'
            className={cx(classes.img, classes.img1)}
          />
        </ImageFilter>
        <Link href='/vision'>
          <a className={cx(classes.btn, classes.transformBtn1)}>
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              className={classes.muiBtn}
              onTouchStart={() => {
                setColorize1(true);
              }}
              onMouseEnter={() => {
                setColorize1(true);
              }}
              onTouchEnd={() => {
                setColorize1(false);
              }}
              onTouchCancel={() => {
                setColorize1(false);
              }}
              onMouseLeave={() => {
                setColorize1(false);
              }}
            >
              LEARN MORE ABOUT SANOCULIS
            </Button>
          </a>
        </Link>
      </div>
      <div className={classes.section}>
        <ImageFilter colorize={colorize2}>
          <img
            src='images/about.jpg'
            className={cx(classes.img, classes.img2)}
          />
        </ImageFilter>
        <Link href='/about'>
          <a className={cx(classes.btn, classes.transformBtn2)}>
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              size='large'
              className={classes.muiBtn}
              onTouchStart={() => {
                setColorize2(true);
              }}
              onMouseEnter={() => {
                setColorize2(true);
              }}
              onTouchEnd={() => {
                setColorize2(false);
              }}
              onTouchCancel={() => {
                setColorize2(false);
              }}
              onMouseLeave={() => {
                setColorize2(false);
              }}
            >
              Why INTERVENTIONAL GLAUCOMA helps
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
