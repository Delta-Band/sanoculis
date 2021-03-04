import React, { useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 4, 3),
    maxHeight: '70vh',
    maxWidth: '90vw',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { open, children, onEnter, onExited, ...other } = props;
  const variants = {
    enter: {
      x: '-50vw',
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: '50vw',
      opacity: 0
    }
  };

  return (
    <motion.div
      ref={ref}
      {...other}
      variants={variants}
      animate={open ? 'center' : 'exit'}
      initial='enter'
      transition={{
        type: 'spring',
        stiffness: 175,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
});

export default function SpringModal({ isOpen, onClose, children, title }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (isOpen !== open) {
      if (isOpen) {
        setOpen(true);
        setShow(true);
      } else {
        setShow(false);
        setTimeout(() => {
          setOpen(false);
        }, 500);
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
    onClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500
        // }}
      >
        <Fade
          open={show}
          style={{
            position: 'relative',
            borderRadius: 5,
            overflow: 'hidden',
            outline: 'none'
          }}
        >
          <Fragment>
            <Box
              borderBottom={1}
              width={1}
              p={2}
              position='absolute'
              zIndex={1}
              style={{
                backgroundColor: 'white',
                textAlign: 'center',
                border: 'none',
                boxShadow: '0 0px 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Typography
                variant='subtitle1'
                style={{ transform: 'translateY(2px)' }}
              >
                {title}
              </Typography>
            </Box>
            <Box className={classes.paper}>{children}</Box>
          </Fragment>
        </Fade>
      </Modal>
    </div>
  );
}
