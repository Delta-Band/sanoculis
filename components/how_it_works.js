import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { LottieInteractive } from 'lottie-interactive';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import screenfull from 'screenfull';
import { motion } from 'framer-motion';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { CloseCircle as CloseIcon } from '@styled-icons/evaicons-solid/CloseCircle';
import { SectionLayout, Modal } from './delta';

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    zIndex: 1,
    cursor: 'pointer'
  },
  closeIcon: {
    width: 50,
    height: 50
  }
}));

export default function HowItWorks({ homePage, artClass }) {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const [openVideo, setOpenVideo] = useState(true);
  const videoRef = useRef();

  // METHODS
  function playFullScreen() {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  }

  function playVideo() {
    videoRef.current.play();
    upSM ? setOpenVideo(true) : playFullScreen();
  }

  function closeVideo(e) {
    if (e.key === 'Escape') {
      videoRef.current.pause();
      setOpenVideo(false);
    }
  }

  // EFFECTS
  useEffect(function () {
    document.addEventListener('keyup', closeVideo);
    return document.removeEventListener('keyup', closeVideo);
  }, []);

  /** SUB-COMPONENTS */
  function CloseButton() {
    const classes = useStyles();

    return (
      <motion.div
        className={classes.closeBtn}
        whileHover={{
          scale: 1.2
        }}
      >
        <CloseIcon className={classes.closeIcon} oncClick={closeVideo} />
      </motion.div>
    );
  }

  return (
    <Fragment>
      <SectionLayout
        art={
          <Box className={artClass} onClick={playVideo}>
            <lottie-interactive
              path='lottie/2.json'
              interaction='morph'
              style={{
                cursor: 'pointer'
              }}
            />
          </Box>
        }
        title={homePage.section2Title}
        content={[
          <Typography key={1}>{homePage.section2Description}</Typography>,
          <Button
            key={2}
            variant='contained'
            disableElevation
            color='primary'
            size='large'
            onClick={playVideo}
          >
            {homePage.section2BtnTxt}
            <Box ml={2} mt='-2px'>
              <PlayIcon size={upSM ? 22 : 20} />
            </Box>
          </Button>
        ]}
      />
      <Modal
        show={openVideo}
        onClose={function () {
          videoRef.current.pause();
          setOpenVideo(false);
        }}
      >
        <video
          controls
          style={{
            height: '70vh',
            objectFit: 'cover',
            marginBottom: '-4px'
          }}
          onClick={(e) => e.stopPropagation()}
          ref={videoRef}
        >
          <source src='/how_mims_works.mp4' type='video/mp4' />
        </video>
        <CloseButton />
      </Modal>
    </Fragment>
  );
}
