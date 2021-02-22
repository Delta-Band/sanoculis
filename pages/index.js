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
    <Box width={1} pt={12} pb={12} display='flex' flexDirection='column'>
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
          width: `calc(100vw - ${theme.spacing(2) * 2}px)`,
          margin: '0 auto'
        }}
      />
      <Box mb={2} />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 24,
          padding: `0 ${theme.spacing(2)}px`
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb={4} />
      <Typography
        style={{
          padding: `0 ${theme.spacing(2)}px`
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
  const isPortrait = useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  return !isPortrait ? (
    <Box width={1} pt={18} pb={18} display='flex' flexDirection='row'>
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
      <Right>
        <Typography variant='h2'>
          A Simple & Stent-less
          <br />
          Treatment Innovation
        </Typography>
        <Box mb='5vh' />
        <Box maxWidth='40vw'>
          <Typography
            style={{
              padding: `0 ${theme.spacing(2)}px`
            }}
          >
            MIMS is a rapid & minimal procedure at the forefront of
            Interventional Glaucoma treatments. Fewer complications and less
            reliance on medications allows for effective IOP management.
          </Typography>
        </Box>
      </Right>
    </Box>
  ) : (
    <Center>
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
      <Box mb={4} />
      <Typography
        variant='h2'
        style={{
          padding: `0 ${theme.spacing(2)}px`
        }}
      >
        A Simple & Stent-less
        <br />
        Treatment Innovation
      </Typography>
      <Box mb='5vh' />
      <Typography
        style={{
          padding: `0 ${theme.spacing(2)}px`
        }}
      >
        MIMS is a rapid & minimal procedure at the forefront of Interventional
        Glaucoma treatments. Fewer complications and less reliance on
        medications allows for effective IOP management.
      </Typography>
    </Center>
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
    </Fragment>
  );
}
