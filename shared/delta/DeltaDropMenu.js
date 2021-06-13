import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import disableScroll from 'disable-scroll';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      bottom: '50%',
      left: '50%',
      width: 'auto'
    }
  },
  trigger: {
    cursor: 'pointer'
  }
}));

/** MOTION VARIANTS */
const backDropMotion = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      delayChildren: 0.25
    }
  },
  close: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: 'afterChildren'
    }
  }
};

const bottomDrawer = {
  open: {
    y: '0%',
    transition: {
      bounce: 0
    }
  },
  close: {
    y: '100%',
    transition: {
      bounce: 0
    }
  }
};

const modal = {
  open: {
    scale: 1
    // transition: {
    //   type: 'spring',
    //   bounce: 0.25
    // }
  },
  close: {
    scale: 0
    // transition: {
    //   type: 'spring',
    //   bounce: 0
    // }
  }
};

export default function DeltaDropMenu({ target, menu }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));

  /** METHODS */
  function openMenu() {
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  /** EFFECTS */
  useEffect(() => {
    if (open) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [open]);

  return (
    <div className={classes.root}>
      <div onClick={openMenu} className={classes.trigger}>
        {target}
      </div>
      <motion.div
        className={classes.mobileMenu}
        onClick={closeMenu}
        variants={backDropMotion}
        initial='close'
        animate={open ? 'open' : 'close'}
        style={{
          pointerEvents: open ? 'all' : 'none'
        }}
      >
        <motion.div
          initial='close'
          variants={upSM ? modal : bottomDrawer}
          style={{
            x: upSM ? '-50%' : 0,
            y: upSM ? '50%' : 0,
            scale: upSM ? 0 : 1
          }}
          className={classes.menu}
        >
          {menu}
        </motion.div>
      </motion.div>
    </div>
  );
}
