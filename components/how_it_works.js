import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { LottieInteractive } from 'lottie-interactive';
import { useTheme } from '@material-ui/core/styles';
import screenfull from 'screenfull';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { Delta2ColLayout, DeltaModal } from '../shared';

export default function HowItWorks({ homePage, classes }) {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const [openVideo, setOpenVideo] = useState(false);
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

  return (
    <Fragment>
      <Delta2ColLayout
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
      <DeltaModal
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
          ref={videoRef}
        >
          <source src='/how_mims_works.mp4' type='video/mp4' />
        </video>
      </DeltaModal>
    </Fragment>
  );
}
