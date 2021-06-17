import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { LottieInteractive } from 'lottie-interactive';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import screenfull from 'screenfull';
import { motion } from 'framer-motion';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { CloseCircle as CloseIcon } from '@styled-icons/evaicons-solid/CloseCircle';
import { SectionLayout, Modal } from './delta';

const useStyles = makeStyles((theme) => ({
  art: {
    width: '80vw',
    height: '80vw',
    [theme.breakpoints.up('sm')]: {
      width: '40vw',
      height: '40vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '34vw',
      height: '34vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '25vw',
      height: '25vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
    },
    [theme.breakpoints.up('xl')]: {
      width: '22vw',
      height: '22vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
    }
  },
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
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  // const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [openVideo, setOpenVideo] = useState(false);
  const classes = useStyles();
  const videoRef = useRef();

  // METHODS

  function playVideo() {
    setOpenVideo(true);
  }

  function closeVideo(e) {
    if (e.key === 'Escape') {
      setOpenVideo(false);
    }
  }

  // EFFECTS
  useEffect(() => {
    // videoRef.current.play();
    document.addEventListener('keyup', closeVideo);
    return document.removeEventListener('keyup', closeVideo);
  }, []);

  useEffect(() => {
    if (openVideo) {
      // if (!upMd && screenfull.isEnabled) {
      //   screenfull.request(videoRef.current);
      // }
      videoRef.current.play();
      console.log('playing video');
    } else {
      videoRef.current.pause();
      console.log('pausing video');
    }
  }, [openVideo]);

  /** SUB-COMPONENTS */
  function CloseButton() {
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
          <Box className={classes.art} onClick={playVideo}>
            <lottie-interactive
              path='lottie/2.json'
              interaction='morph'
              style={{
                cursor: 'pointer'
              }}
            />
          </Box>
        }
        content={[
          <Typography key={0} variant='h2'>
            {homePage.section2Title}
          </Typography>,
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
              <PlayIcon size={upSm ? 22 : 20} />
            </Box>
          </Button>
        ]}
      />
      <Modal
        show={openVideo && upMd}
        onClose={function () {
          setOpenVideo(false);
        }}
      >
        <video
          muted
          controls
          style={{
            height: '70vh',
            objectFit: 'cover',
            marginBottom: '-4px'
          }}
          onClick={(e) => e.stopPropagation()}
          ref={videoRef}
          src='/how_mims_works.mp4'
          type='video/mp4'
        />
        <CloseButton />
      </Modal>
    </Fragment>
  );
}
