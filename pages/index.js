import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Head from 'next/head';

function Left() {
  const theme = useTheme();
  return (
    <Box
      width='45%'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
      pr='5vw'
    >
      <Box
        height='28vw'
        width='28vw'
        borderRadius='28vw'
        style={{
          backgroundColor: theme.palette.primary.dark
        }}
      ></Box>
    </Box>
  );
}

function Right() {
  return (
    <Box
      width='55%'
      display='flex'
      alignItems='flex-start'
      flexDirection='column'
      justifyContent='center'
    >
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
    </Box>
  );
}

function Center() {
  const theme = useTheme();
  return (
    <Box width={1} pt={18} display='flex' flexDirection='column'>
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
          width: '80vw',
          minWidth: 393,
          margin: '0 auto'
        }}
      />
      <Box mb={6} />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 24,
          padding: '0 10vw'
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb={4} />
      <Typography
        style={{
          fontSize: 16,
          lineHeight: '1.8em',
          padding: '0 10vw'
        }}
      >
        Minimally Invasive Micro Sclerostomy is a Stentless,
        <br />
        Simple & Fast Glaucoma treatment to effectively lower
        <br />
        IOP without invasive surgery or medication.
      </Typography>
      <Box mb={4} />
    </Box>
  );
}

export default function Home() {
  const isPortrait = useMediaQuery('(max-width:1355px)');
  return (
    <Fragment>
      <Head>
        <title>Sanoculis</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      </Head>
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
        {!isPortrait && <Left />}
        {!isPortrait && <Right />}
        {isPortrait && <Center />}
      </Box>
    </Fragment>
  );
}
