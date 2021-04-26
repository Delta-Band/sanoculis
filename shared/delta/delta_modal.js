import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import disableScroll from 'disable-scroll';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  screenCover: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100vw',
    backgroundColor: fade(theme.palette.primary.dark, 0.5),
    backdropFilter: 'blur(17px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    // backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[15],
    maxWidth: '80%',
    borderRadius: 15,
    overflow: 'hidden'
  }
}));

export default function DeltaModal({ show, onClose, children }) {
  const classes = useStyles();

  useEffect(() => {
    if (show) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [show]);

  const container = {
    hidden: {
      pointerEvents: 'none',
      opacity: 0,
      transition: {
        bounce: 0,
        when: 'afterChildren'
      }
    },
    show: {
      pointerEvents: 'all',
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        bounce: 0
      }
    }
  };

  const modal = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    show: {
      opacity: 1,
      scale: 1
    }
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate={show ? 'show' : 'hidden'}
      className={classes.screenCover}
      onClick={onClose}
    >
      <motion.div onClick={onClose} className={classes.modal} variants={modal}>
        {children}
      </motion.div>
    </motion.div>
  );
}
