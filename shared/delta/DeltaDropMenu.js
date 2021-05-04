import React, { useState, useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
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
    background: 'rgba(0, 0, 0, 0.6)'
  },
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }
}));

/** MOTION VARIANTS */
const menuMotion = {
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

export default function DeltaDropMenu({ target, menu }) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
      <div onClick={openMenu}>{target}</div>
      <motion.div
        className={classes.mobileMenu}
        onClick={closeMenu}
        variants={menuMotion}
        initial='close'
        animate={open ? 'open' : 'close'}
        style={{
          pointerEvents: open ? 'all' : 'none'
        }}
      >
        <motion.div variants={bottomDrawer} className={classes.bottomDrawer}>
          {menu}
        </motion.div>
      </motion.div>
    </div>
  );
}
