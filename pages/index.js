import React, { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import screenfull from 'screenfull';
import {
  Box,
  Typography,
  Link as MuiLink,
  Button,
  Grid
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { Download as DownloadIcon } from '@styled-icons/octicons/Download';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Lottie from 'react-lottie';
import reactor from '../reactor';
import Head from '../head';
import lottie1 from '../public/lottie/1.json';
import lottie2 from '../public/lottie/2.json';
import lottie3 from '../public/lottie/3.json';
import lottie4 from '../public/lottie/4.json';
import lottie5 from '../public/lottie/5.json';
import {
  DeltaModal,
  DeltaMouseTip,
  DeltaTestimonials,
  Delta2ColLayout,
  Footer
} from '../shared';
import { Hero, News, LearnMore } from '../components';

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const homePage = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const testimonials = await reactor.getCollection('uZJDusr9qBPPkkxrxw6j');
  const news = await reactor.getCollection('wTe6w2bKS0b2mNdHCHYu');
  const footer = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  return {
    props: {
      homePage,
      testimonials,
      news,
      footer
    }
  };
}

const useStyles = makeStyles((theme) => ({
  blueInfo: {
    color: theme.palette.primary.main
  },
  whiteText: {
    color: '#FFF'
  },
  art: {
    margin: '0 0 20px 0',
    [theme.breakpoints.up('md')]: {
      // margin: '0 2.5vw 0 0'
    },
    '& > img': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '90%'
      }
    }
  },
  newsLogo: {
    width: '100%',
    objectFit: 'contain'
  },
  newsVerticalSpacing: {
    marginBottom: theme.spacing(4)
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  carouselNavBtn: {
    width: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF'
  }
}));

export default function Home({ homePage, testimonials, news, footer }) {
  const theme = useTheme();
  const classes = useStyles();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  // const upMD = useMediaQuery(theme.breakpoints.up('md'));
  // const _isMobile = isMobile || matches;
  const [openVideo, setOpenVideo] = useState(false);
  const videoRef = useRef();

  function playFullScreen() {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
    // videoRef.current.play();
  }

  function ImageContainer({ src }) {
    return (
      <Lottie
        className={classes.art}
        options={{
          loop: true,
          autoplay: true,
          animationData: src,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
      />
    );
  }

  function closeVideo(e) {
    if (e.key === 'Escape') {
      videoRef.current.pause();
      setOpenVideo(false);
    }
  }

  function playVideo() {
    videoRef.current.play();
    upSM ? setOpenVideo(true) : playFullScreen();
  }

  useEffect(function () {
    document.addEventListener('keyup', closeVideo);
    return document.removeEventListener('keyup', closeVideo);
  }, []);

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Hero
        tagline={homePage.tagline}
        description={homePage.description}
        art={
          <Box className={classes.art}>
            <video
              playsInline
              muted
              style={{ width: '100%' }}
              src={`videos/${upSM ? 'desktop' : 'mobile'}/hero.mp4`}
              autoPlay
            />
          </Box>
        }
      />
      <Delta2ColLayout
        art={<ImageContainer src={lottie1} />}
        title={homePage.section1Title}
        content={[
          <Typography key={1}>{homePage.section1Description}</Typography>
        ]}
      />
      <Delta2ColLayout
        art={
          <DeltaMouseTip
            tip='PLAY'
            style={{ width: '100%' }}
            onClick={playVideo}
          >
            <ImageContainer src={lottie2} />
          </DeltaMouseTip>
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
      <Delta2ColLayout
        art={<ImageContainer src={lottie3} />}
        title={homePage.section3Title}
        content={[
          <Typography key={1}>{homePage.section3Description}</Typography>
        ]}
      />
      <Delta2ColLayout
        extendTopWith={
          <img
            src='images/white_wave.png'
            style={{ width: '100%', transform: 'translateY(50%) scaleY(-1)' }}
          />
        }
        background={theme.palette.primary.main}
        art={
          <Box mr={10} mt='-90px' mb='-90px' width={1} textAlign='left'>
            <img
              src='spec.png'
              style={{
                width: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        }
        title={homePage.specTitle}
        titleColor='#FFF'
        content={[
          <Typography key={1} style={{ color: '#FFF' }}>
            {homePage.specDescription}
          </Typography>,
          <img key={2} src='images/israel_ce_stamp.png' />,
          <MuiLink
            key={3}
            target='_blank'
            rel='noreferrer'
            href={homePage.specPdf}
            style={{
              textDecoration: 'none'
            }}
          >
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              size='large'
            >
              {homePage.specBtnTxt}
              <Box ml={2}>
                <DownloadIcon size={22} />
              </Box>
            </Button>
          </MuiLink>
        ]}
      />
      <Delta2ColLayout
        background={theme.palette.primary.dark}
        titleColor='#FFF'
        paddingTop={10}
        paddingBottom={5}
        art={<ImageContainer src={lottie4} />}
        title={homePage.performanceTitle}
        content={[
          <Grid container key={1} spacing={4}>
            <Grid item xs={6}>
              <Typography variant='h3' className={classes.blueInfo}>
                {homePage.performanceMinDuration}
              </Typography>
              <Typography classes={{ root: classes.whiteText }}>
                Min Procedure
                <br />
                duration
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h3' className={classes.blueInfo}>
                {homePage.performanceIOP}
              </Typography>
              <Typography classes={{ root: classes.whiteText }}>
                IOP Reduction after 12
                <br />
                Months
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h3' className={classes.blueInfo}>
                {homePage.performanceMedReduction}
              </Typography>
              <Typography classes={{ root: classes.whiteText }}>
                Medication reduction
                <br />
                at 12 mo.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h3' className={classes.blueInfo}>
                {homePage.performanceComplication}
              </Typography>
              <Typography classes={{ root: classes.whiteText }}>
                Major intra/post-op
                <br />
                complications
              </Typography>
            </Grid>
          </Grid>,
          <Link key={2} href='/clinical'>
            <a>
              <Button
                variant='contained'
                disableElevation
                color='secondary'
                size='large'
              >
                {homePage.performanceBtnTxt}
              </Button>
            </a>
          </Link>
        ]}
      />
      <DeltaTestimonials
        testimonials={testimonials}
        title={homePage.testimonialsTitle}
      />
      <News
        art={<ImageContainer src={lottie5} />}
        title={homePage.newsTitle}
        items={news}
      />
      <LearnMore />
      <Footer specPDF={homePage.specPdf} footerData={footer} />
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
