// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// eslint-disable-next-line no-unused-vars
import { useSwipeable } from 'react-swipeable';
import screenfull from 'screenfull';
import {
  Box,
  Typography,
  Link as MuiLink,
  Button,
  Grid
  // Radio,
  // FormControl,
  // FormControlLabel,
  // RadioGroup
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
// import { motion } from 'framer-motion';
// import Moment from 'react-moment';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow';
// import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow';
// import { DownArrow } from '@styled-icons/boxicons-solid/DownArrow';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { Download as DownloadIcon } from '@styled-icons/octicons/Download';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import reactor from '../reactor';
import Head from '../head';
// import mockData from '../mock_data';
// eslint-disable-next-line no-unused-vars
import {
  DeltaModal,
  // Footer,
  DeltaMouseTip,
  DeltaTestimonials,
  Delta2ColLayout
} from '../shared';
import { Hero } from '../components';

export async function getServerSideProps(context) {
  console.log(context.req.headers['user-agent']);
  const isMobile = Boolean(
    context.req.headers['user-agent'].match(
      /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
    )
  );
  reactor.init();
  const homePage = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const testimonials = await reactor.getCollection('uZJDusr9qBPPkkxrxw6j');
  return {
    props: {
      homePage,
      testimonials,
      isMobile
    } // will be passed to the page component as props
  };
}

// function News({ isMobile }) {
//   const theme = useTheme();
//   const headerTxt = 'News, Publications & Events';
//   const [index, setIndex] = useState(0);
//   const bodyTxt = (
//     <Box>
//       <ul
//         style={{
//           marginBottom: theme.spacing(4),
//           display: 'flex',
//           flexWrap: 'nowrap',
//           overflow: 'hidden'
//         }}
//       >
//         {mockData.newsCollection.map((item, i) => (
//           <motion.li
//             key={item.id}
//             transition={{ type: 'spring', stiffness: 75, damping: 15 }}
//             animate={{
//               transform: `translateX(-${index * 100}%)`,
//               opacity: index === i ? 1 : 0
//             }}
//             style={{
//               width: '100%',
//               flexShrink: 0,
//               transition: theme.fastTransition
//             }}
//           >
//             <Typography
//               style={{
//                 color: 'white',
//                 marginBottom: theme.spacing(4)
//               }}
//             >
//               <Moment interval={0} format='MMM D, YYYY'>
//                 {item.date}
//               </Moment>
//             </Typography>
//             <Typography
//               style={{
//                 color: 'white',
//                 marginBottom: theme.spacing(4)
//               }}
//             >
//               <BlueText>
//                 <Link href={item.link}>{item.headline}</Link>
//               </BlueText>
//             </Typography>
//             <Typography
//               style={{
//                 color: 'white'
//               }}
//             >
//               {item.article}
//             </Typography>
//           </motion.li>
//         ))}
//       </ul>
//       <Box width={1} display='flex' justifyContent='space-between'>
//         <Button
//           onClick={() => {
//             setIndex(Math.max(0, index - 1));
//           }}
//           disabled={index === 0}
//           style={{
//             color: index === 0 ? 'rgba(255, 255, 255, 0.3)' : 'white'
//           }}
//         >
//           <LeftArrow
//             size={16}
//             style={{
//               transform: 'translateY(-1px)',
//               marginRight: theme.spacing(1)
//             }}
//           />
//           Newer
//         </Button>
//         <Button
//           onClick={() => {
//             setIndex(Math.min(mockData.newsCollection.length - 1, index + 1));
//           }}
//           style={{
//             color:
//               index === mockData.newsCollection.length - 1
//                 ? 'rgba(255, 255, 255, 0.3)'
//                 : 'white'
//           }}
//         >
//           Older
//           <RightArrow
//             size={16}
//             style={{
//               transform: 'translateY(-1px)',
//               marginLeft: theme.spacing(1)
//             }}
//           />
//         </Button>
//       </Box>
//     </Box>
//   );
//   return (
//     <SectionLayout
//       isMobile={isMobile}
//       headerTxt={headerTxt}
//       bodyTxt={bodyTxt}
//       headerColor='white'
//       backgroundColor={theme.palette.primary.dark}
//       left={
//         <Box
//           height='28vw'
//           width='28vw'
//           borderRadius='28vw'
//           style={{
//             backgroundColor: 'white'
//           }}
//         ></Box>
//       }
//       topMobile={
//         <Box
//           height='80vw'
//           width='80vw'
//           borderRadius='70vw'
//           flexShrink={0}
//           style={{
//             margin: '0 auto 50px',
//             backgroundColor: 'white'
//           }}
//         ></Box>
//       }
//     />
//   );
// }

// function DropMenu({ partner, setOpen, open }) {
//   const theme = useTheme();
//   return (
//     <Box
//       height={50}
//       width={390}
//       maxWidth='100%'
//       borderRadius={3}
//       display='flex'
//       justifyContent='space-between'
//       alignItems='center'
//       onClick={() => {
//         setOpen(!open);
//       }}
//       style={{
//         background: 'white',
//         overflow: 'hidden',
//         cursor: 'pointer'
//       }}
//     >
//       <Box pl={2} width={1}>
//         <Typography
//           noWrap
//           style={{
//             maxWidth: '100%',
//             overflow: 'hidden',
//             textOverflow: 'elipsses'
//           }}
//         >
//           {partner.name}
//         </Typography>
//       </Box>
//       <Box
//         height={1}
//         width={50}
//         p={1}
//         display='flex'
//         alignItems='center'
//         justifyContent='center'
//         style={{
//           backgroundColor: theme.palette.primary.main
//         }}
//       >
//         <DownArrow size={18} color='white' />
//       </Box>
//     </Box>
//   );
// }

// function Partners({ isMobile }) {
//   const theme = useTheme();
//   const [index, setIndex] = useState(0);
//   const [open, setOpen] = React.useState(false);
//   const headerTxt = 'Global Distribution & Partners';
//   const partner = mockData.partners[index];
//   const bodyTxt = (
//     <Fragment>
//       <DropMenu partner={partner} setOpen={setOpen} open={open} />
//       <Box mb={4} />
//       <Link href={partner.websiteLink}>{partner.name}</Link>
//       <Box mb={2} />
//       <Link href={partner.addressLink}>{partner.address}</Link>
//       <Box mb={2} />
//       <Link href={`tel:${partner.phone.replace('-', '')}`}>
//         {partner.phone}
//       </Link>
//       <Box mb={2} />
//       <Link href={`mailto:${partner.email}`}>{partner.email}</Link>
//       <Box mb={6} />
//       <Button
//         variant='contained'
//         size='large'
//         color='primary'
//         style={{
//           borderRadius: 40,
//           paddingLeft: 30,
//           paddingRight: 30
//         }}
//       >
//         Distributor Login
//       </Button>
//       <DeltaModal
//         isOpen={open}
//         title='SELECT YOUR COUNTRY / REGION'
//         onClose={() => {
//           setOpen(false);
//         }}
//       >
//         <Fragment>
//           <FormControl component='fieldset'>
//             <RadioGroup
//               aria-label='partners'
//               name='partners'
//               style={{
//                 width: 400,
//                 maxWidth: '100%'
//               }}
//             >
//               {mockData.partners.map((itm, i) => (
//                 <FormControlLabel
//                   key={itm.id}
//                   checked={index === i}
//                   control={<Radio color='primary' />}
//                   onChange={() => {
//                     setIndex(i);
//                     setTimeout(() => {
//                       setOpen(false);
//                     }, 250);
//                   }}
//                   value={0}
//                   label={itm.contryRegion}
//                   labelPlacement='end'
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </Fragment>
//       </DeltaModal>
//     </Fragment>
//   );
//   return (
//     <SectionLayout
//       isMobile={isMobile}
//       headerTxt={headerTxt}
//       bodyTxt={bodyTxt}
//       headerColor='white'
//       backgroundColor={theme.palette.primary.dark}
//       left={
//         <Box
//           height='28vw'
//           width='28vw'
//           borderRadius='28vw'
//           style={{
//             backgroundColor: 'white'
//           }}
//         ></Box>
//       }
//       topMobile={
//         <Box
//           height='80vw'
//           width='80vw'
//           borderRadius='70vw'
//           flexShrink={0}
//           style={{
//             margin: '0 auto 50px',
//             backgroundColor: 'white'
//           }}
//         ></Box>
//       }
//     />
//   );
// }

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
      margin: '0 2.5vw 0 0'
    },
    '& > img': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40vw'
      }
    }
  }
}));

export default function Home({ homePage, testimonials, isMobile }) {
  const theme = useTheme();
  const classes = useStyles();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
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
      <Box className={classes.art}>
        <img src={src} />
      </Box>
    );
  }

  function closeVideo(e) {
    if (e.key === 'Escape') {
      videoRef.current.pause();
      setOpenVideo(false);
    }
  }

  useEffect(function () {
    document.addEventListener('keyup', closeVideo);
    return window.removeEventListener('keyup', closeVideo);
  }, []);

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Hero tagline={homePage.tagline} description={homePage.description} />
      <Delta2ColLayout
        art={<ImageContainer src='section1.png' />}
        title={homePage.section1Title}
        content={[
          <Typography key={1}>{homePage.section1Description}</Typography>
        ]}
      />
      <Delta2ColLayout
        art={
          <DeltaMouseTip tip='PLAY'>
            <ImageContainer src='how_it_works.png' />
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
            onClick={function () {
              videoRef.current.play();
              upMD ? setOpenVideo(true) : playFullScreen();
            }}
          >
            {homePage.section2BtnTxt}
            <Box ml={2} mt='-2px'>
              <PlayIcon size={upSM ? 22 : 20} />
            </Box>
          </Button>
        ]}
      />
      <Delta2ColLayout
        art={<ImageContainer src='simple.png' />}
        title={homePage.section3Title}
        content={[
          <Typography key={1}>{homePage.section3Description}</Typography>
        ]}
      />
      <Delta2ColLayout
        extendTopWith={
          <img
            src='wave_spec.svg'
            style={{ width: '100vw', marginBottom: '-10px' }}
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
          <img key={2} src='israel_ce_stamp.svg' />,
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
        art={<ImageContainer src='performance.svg' />}
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
      {/* <MinimalIntervention isMobile={isMobile} />
      <ClinicalPerformance isMobile={isMobile} />
      <Testimonials isMobile={isMobile} />
      <News isMobile={isMobile} />
      <Partners isMobile={isMobile} /> */}
      <DeltaModal
        show={openVideo}
        onClose={function () {
          videoRef.current.pause();
          setOpenVideo(false);
        }}
      >
        <video
          controls
          style={{ height: '70vh', marginBottom: '-4px' }}
          ref={videoRef}
        >
          <source src='/how_mims_works.mp4' type='video/mp4' />
        </video>
      </DeltaModal>
      <Box>Spme more content</Box>
      {/* <Footer /> */}
    </Fragment>
  );
}
