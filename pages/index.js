// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { useSwipeable } from 'react-swipeable';
import {
  Box,
  Typography,
  Link,
  Button
  // Radio,
  // FormControl,
  // FormControlLabel,
  // RadioGroup
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// import { motion } from 'framer-motion';
// import Moment from 'react-moment';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow';
// import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow';
// import { DownArrow } from '@styled-icons/boxicons-solid/DownArrow';
import { PlayCircleFill as PlayIcon } from '@styled-icons/bootstrap/PlayCircleFill';
import { Download as DownloadIcon } from '@styled-icons/octicons/Download';
import reactor from '../reactor';
import Head from '../head';
// import mockData from '../mock_data';
// eslint-disable-next-line no-unused-vars
import { DeltaModal, SectionLayout, Footer, DeltaMouseTip } from '../shared';
import { Hero, HomeSectionLayout } from '../components';

export async function getServerSideProps(context) {
  console.log(context.req.headers['user-agent']);
  const isMobile = Boolean(
    context.req.headers['user-agent'].match(
      /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
    )
  );
  reactor.init();
  const homePage = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  return {
    props: {
      homePage,
      isMobile
    } // will be passed to the page component as props
  };
}

// function MinimalIntervention({ isMobile }) {
//   const theme = useTheme();
//   const headerTxt = 'Minimal interventional Glaucoma helps earlier';
//   const bodyTxt =
//     'As the leading cause of blindness, Glaucoma is not yet curable. However, progression can be slowed with a proactive approach. Intervening early & quickly can reduce risky complications.';
//   return (
//     <SectionLayout
//       isMobile={isMobile}
//       lessPaddingTop
//       headerTxt={headerTxt}
//       bodyTxt={<Typography>{bodyTxt}</Typography>}
//       left={
//         <Box
//           height='28vw'
//           width='28vw'
//           borderRadius='28vw'
//           style={{
//             backgroundColor: theme.palette.primary.dark
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
//             backgroundColor: theme.palette.primary.dark
//           }}
//         ></Box>
//       }
//     />
//   );
// }

// function BlueText({ children }) {
//   const theme = useTheme();
//   return (
//     <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
//       {children}
//     </span>
//   );
// }

// function ClinicalPerformance({ isMobile }) {
//   const theme = useTheme();
//   const headerTxt = 'Outstanding Clinical Performance';
//   const bodyTxt = (
//     <ul>
//       <li>
//         <Typography>
//           <BlueText>1:50 &plusmn; 0:33</BlueText> Min. Procedure duration
//         </Typography>
//       </li>
//       <li>
//         <Typography>
//           <BlueText>57%</BlueText> IOP Reduction after 12 Months
//         </Typography>
//       </li>
//       <li>
//         <Typography>
//           <BlueText>99%</BlueText> Medication reduction at 12 months
//         </Typography>
//       </li>
//       <li>
//         <Typography>
//           <BlueText>ZERO </BlueText>Major intra/post-op complications
//         </Typography>
//       </li>
//     </ul>
//   );
//   return (
//     <SectionLayout
//       isMobile={isMobile}
//       lessPaddingTop
//       headerTxt={headerTxt}
//       bodyTxt={bodyTxt}
//       left={
//         <Box
//           height='28vw'
//           width='28vw'
//           borderRadius='28vw'
//           style={{
//             backgroundColor: theme.palette.primary.dark
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
//             backgroundColor: theme.palette.primary.dark
//           }}
//         ></Box>
//       }
//     />
//   );
// }

// function Testimonials({ isMobile }) {
//   const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
//   const theme = useTheme();
//   const [item, setItem] = useState(0);
//   const timeoutRef = useRef(null);
//   const myRef = React.useRef();
//   const handlers = useSwipeable({
//     onSwipedLeft: () => {
//       setItem(Math.min(mockData.testimonials.length - 1, item + 1));
//     },
//     onSwipedRight: () => {
//       setItem(Math.max(0, item - 1));
//     }
//   });
//   const refPassthrough = (el) => {
//     // call useSwipeable ref prop with el
//     handlers.ref(el);

//     // set myRef el so you can access it yourself
//     myRef.current = el;
//   };

//   function incrementItemIndex() {
//     if (timeoutRef.current !== null) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       timeoutRef.current = null;
//       setItem(item < mockData.testimonials.length - 1 ? item + 1 : 0);
//     }, 5000);
//   }

//   useEffect(() => {
//     incrementItemIndex();
//     return () => {
//       clearTimeout(timeoutRef.current);
//     };
//   }, [item]);

//   const itemsInRow = Math.ceil(Math.sqrt(mockData.testimonials.length));
//   const itemSize = `calc(${28 / itemsInRow}vw)`;

//   const headerTxt = 'MIMS® Testimonials';
//   const bodyTxt = (
//     <Fragment>
//       <Box maxWidth={isPortrait ? '100%' : '40vw'}>
//         <Box height={theme.spacing(isPortrait ? 17 : 22)}>
//           <Typography
//             style={{ fontSize: isPortrait ? '18px' : '28px', color: 'white' }}
//           >
//             &#34;{mockData.testimonials[item].testimonial}&#34;
//           </Typography>
//         </Box>
//         <Typography
//           style={{
//             color: 'white'
//           }}
//         >
//           {mockData.testimonials[item].name}
//         </Typography>
//         <Typography
//           style={{
//             color: 'white'
//           }}
//         >
//           {mockData.testimonials[item].title}
//         </Typography>
//       </Box>
//     </Fragment>
//   );
//   return (
//     <SectionLayout
//       isMobile={isMobile}
//       lessPaddingTop
//       headerTxt={headerTxt}
//       bodyTxt={bodyTxt}
//       backgroundColor={theme.palette.primary.main}
//       headerColor='white'
//       left={
//         <Box
//           display='flex'
//           width='28vw'
//           height='28vw'
//           flexWrap='wrap'
//           alignItems='center'
//           alignContent='center'
//           justifyContent='stretch'
//         >
//           {mockData.testimonials.map((itm, i) => (
//             <Box
//               width={itemSize}
//               height={itemSize}
//               key={itm.id}
//               border={`4px solid ${
//                 item === i ? 'white' : theme.palette.primary.main
//               }`}
//               boxShadow={`0 0 ${item === i ? 5 : 0}px rgba(0, 0, 0, 0.2)`}
//               borderRadius='13vw'
//               flexGrow={0}
//               flexShrink={0}
//               zIndex={item === i ? 1 : 0}
//               overflow='hidden'
//               style={{
//                 background:
//                   item === i ? 'transparent' : theme.palette.primary.main,
//                 cursor: 'pointer',
//                 opacity: item === i ? 1 : 0.75,
//                 transition: theme.fastTransition,
//                 transform:
//                   item === i
//                     ? `scale(${mockData.testimonials.length / 10 + 1})`
//                     : 'scale(1)'
//               }}
//               onClick={() => {
//                 setItem(i);
//               }}
//             >
//               <img
//                 src={itm.pic}
//                 alt='profile image'
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   objectFit: 'cover',
//                   objectPosition: 'center',
//                   mixBlendMode: 'multiply',
//                   filter: item === i ? 'none' : 'grayscale(1)'
//                 }}
//               />
//             </Box>
//           ))}
//         </Box>
//       }
//       topMobile={
//         <Box
//           {...handlers}
//           ref={refPassthrough}
//           display='flex'
//           alignItems='center'
//           width={1}
//           pt={7}
//           pb={7}
//           style={{
//             overflow: 'hidden'
//           }}
//         >
//           {mockData.testimonials.map((itm, i) => (
//             <Box
//               key={itm.id}
//               height='40vw'
//               width='40vw'
//               borderRadius='50vw'
//               border={`4px solid rgba(255, 255, 255, ${item === i ? 1 : 0.5})`}
//               boxShadow={`0 0 ${item === i ? 5 : 0}px rgba(0, 0, 0, 0.2)`}
//               flexShrink={0}
//               zIndex={item === i ? 1 : 0}
//               p={0}
//               style={{
//                 overflow: 'hidden',
//                 background:
//                   item === i ? 'transparent' : theme.palette.primary.main,
//                 opacity: item === i ? 1 : 0.75,
//                 transition: theme.fastTransition,
//                 transform: `translateX(calc(${item * -100}% + 30vw)) ${
//                   item === i ? 'scale(1.5)' : 'scale(1)'
//                 }`
//               }}
//               onClick={() => setItem(i)}
//             >
//               <img
//                 src={itm.pic}
//                 alt='profile image'
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   objectFit: 'cover',
//                   objectPosition: 'center',
//                   mixBlendMode: 'multiply',
//                   filter: item === i ? 'none' : 'grayscale(1)'
//                 }}
//               />
//             </Box>
//           ))}
//         </Box>
//       }
//     />
//   );
// }

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

export default function Home({ homePage, isMobile }) {
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // const _isMobile = isMobile || matches;
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Hero tagline={homePage.tagline} description={homePage.description} />
      <HomeSectionLayout
        art={<img src='section1.png' />}
        title={homePage.section1Title}
        content={[
          <Typography key={1}>{homePage.section1Description}</Typography>
        ]}
      />
      <HomeSectionLayout
        art={
          <DeltaMouseTip tip='PLAY'>
            <img
              src='how_it_works.png'
              onClick={() => setOpenVideo(true)}
              style={{ cursor: 'pointer' }}
            />
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
              setOpenVideo(true);
            }}
          >
            <Box pl={4} pr={4} display='flex' justifyContent='center'>
              {homePage.section2BtnTxt}
              <Box ml={2}>
                <PlayIcon size={22} />
              </Box>
            </Box>
          </Button>
        ]}
      />
      <HomeSectionLayout
        art={<img src='simple.png' />}
        title={homePage.section3Title}
        content={[
          <Typography key={1}>{homePage.section3Description}</Typography>
        ]}
      />
      <HomeSectionLayout
        extendTopWith={
          <img
            src='wave_spec.svg'
            style={{ width: '100vw', marginBottom: '-90px' }}
          />
        }
        background={theme.palette.primary.main}
        art={<img src='simple.png' />}
        title={homePage.specTitle}
        titleColor='#FFF'
        content={[
          <Typography key={1} style={{ color: '#FFF' }}>
            {homePage.specDescription}
          </Typography>,
          <img key={2} src='israel_ce_stamp.svg' />,
          <Link
            key={2}
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
              <Box pl={4} pr={4} display='flex' justifyContent='center'>
                {homePage.specBtnTxt}
                <Box ml={2}>
                  <DownloadIcon size={22} />
                </Box>
              </Box>
            </Button>
          </Link>
        ]}
      />
      {/* <MinimalIntervention isMobile={isMobile} />
      <ClinicalPerformance isMobile={isMobile} />
      <Testimonials isMobile={isMobile} />
      <News isMobile={isMobile} />
      <Partners isMobile={isMobile} /> */}
      <DeltaModal show={openVideo} onClose={() => setOpenVideo(false)}>
        <video controls style={{ height: '70vh', marginBottom: '-4px' }}>
          <source src='/how_mims_works.mp4' type='video/mp4' />
        </video>
      </DeltaModal>
      {/* <Footer /> */}
    </Fragment>
  );
}
