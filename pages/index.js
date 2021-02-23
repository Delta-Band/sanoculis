import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Head from 'next/head';

function Left({ children }) {
  return (
    <Box
      width='45%'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
      pr='5vw'
    >
      {children}
    </Box>
  );
}

function Right({ children }) {
  return (
    <Box
      width='55%'
      display='flex'
      alignItems='flex-start'
      flexDirection='column'
      justifyContent='center'
    >
      {children}
    </Box>
  );
}

function Center({ children }) {
  return (
    <Box width={1} pt={12} pb={0} display='flex' flexDirection='column'>
      {children}
    </Box>
  );
}

function HeroLeft() {
  const theme = useTheme();
  return (
    <Left>
      <Box
        height='28vw'
        width='28vw'
        borderRadius='28vw'
        style={{
          backgroundColor: theme.palette.primary.dark
        }}
      ></Box>
    </Left>
  );
}

function SectionLayout({ headerTxt, bodyTxt, art, artMobile }) {
  const isPortrait = useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  return !isPortrait ? (
    <Box width={1} pt={18} pb={18} display='flex' flexDirection='row'>
      <Left>{art}</Left>
      <Right>
        <Typography
          variant='h2'
          style={{
            maxWidth: 500
          }}
        >
          {headerTxt}
        </Typography>
        <Box mb='5vh' />
        <Box maxWidth='40vw'>
          <Typography>{bodyTxt}</Typography>
        </Box>
      </Right>
    </Box>
  ) : (
    <Center>
      {artMobile}
      <Box mb={4} />
      <Typography
        variant='h2'
        style={{
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        {headerTxt}
      </Typography>
      <Box mb={3} />
      <Typography
        style={{
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        {bodyTxt}
      </Typography>
    </Center>
  );
}

function HeroRight() {
  return (
    <Right>
      <img
        src='/mims_for_hero.svg'
        style={{
          width: '32vw',
          minWidth: 393
        }}
      />
      <Box mb='5vh' />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 42
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb='5vh' />
      <Typography
        style={{
          lineHeight: '2em'
        }}
      >
        Minimally Invasive Micro Sclerostomy is a Stentless,
        <br />
        Simple & Fast Glaucoma treatment to effectively lower
        <br />
        IOP without invasive surgery or medication.
      </Typography>
    </Right>
  );
}

function HeroMobile() {
  const theme = useTheme();
  return (
    <Box width={1} pt={18} pb={4} display='flex' flexDirection='column'>
      <Box
        height='80vw'
        width='80vw'
        borderRadius='70vw'
        flexShrink={0}
        style={{
          margin: '0 auto 50px',
          backgroundColor: theme.palette.primary.dark
        }}
      ></Box>
      <img
        src='/mims_for_hero.svg'
        style={{
          width: `calc(100vw - ${theme.mobileGutter} - ${theme.mobileGutter})`,
          margin: '0 auto'
        }}
      />
      <Box mb={2} />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 24,
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb={4} />
      <Typography
        style={{
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        Minimally Invasive Micro Sclerostomy is a Stentless, Simple & Fast
        Glaucoma treatment to effectively lower IOP without invasive surgery or
        medication.
      </Typography>
      <Box mb={4} />
    </Box>
  );
}

function Hero() {
  const isPortrait = useMediaQuery('(max-width:1355px)');
  return (
    <Box
      width={1}
      height={isPortrait ? 'auto' : '54vw'}
      display='flex'
      style={{
        backgroundImage: 'url(/hero_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      {!isPortrait && <HeroLeft />}
      {!isPortrait && <HeroRight />}
      {isPortrait && <HeroMobile />}
    </Box>
  );
}

function Inovation() {
  const theme = useTheme();
  const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  const bodyTxt =
    'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';
  return (
    <SectionLayout
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function MinimalIntervention() {
  const theme = useTheme();
  const headerTxt = 'Minimal interventional Glaucoma helps earlier';
  const bodyTxt =
    'As the leading cause of blindness, Glaucoma is not yet curable. However, progression can be slowed with a proactive approach. Intervening early & quickly can reduce risky complications.';
  return (
    <SectionLayout
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function BlueText({ children }) {
  const theme = useTheme();
  return (
    <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
      {children}
    </span>
  );
}

function ClinicalPerformance() {
  const theme = useTheme();
  const headerTxt = 'Outstanding Clinical Performance';
  const bodyTxt = (
    <ul>
      <li>
        <Typography>
          <BlueText>1:50 &plusmn; 0:33</BlueText> Min. Procedure duration
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>57%</BlueText> IOP Reduction after 12 Months
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>99%</BlueText> Medication reduction at 12 months
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>ZERO </BlueText>Major intra/post-op complications
        </Typography>
      </li>
    </ul>
  );
  return (
    <SectionLayout
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function HowItWorksVideo({ width, height }) {
  return (
    <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <source src='/how_mims_works.mp4' type='video/mp4' />
    </video>
  );
}

function HowItWorks() {
  const headerTxt = 'How MIMS® Works';
  const bodyTxt = `Minimally Invasive Micro Sclerostomy is fast, accessible &
  effective. It works by inserting a specially designed needle into
  the sclera & removing a small channel of tissue. This channel will
  remain open & contentiously drain, effectively reducing IOP buildup.`;
  return (
    <SectionLayout
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      art={
        <Box width='28vw' height={`${0.56 * 28}vw`}>
          <HowItWorksVideo />
        </Box>
      }
      artMobile={<HowItWorksVideo />}
    />
  );
}

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Sanoculis</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      </Head>
      <Hero />
      <Inovation />
      <HowItWorks />
      <MinimalIntervention />
      <ClinicalPerformance />
    </Fragment>
  );
}
