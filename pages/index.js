import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Head from 'next/head';

export default function Home() {
  const theme = useTheme();

  return (
    <Fragment>
      <Head>
        <title>Sanoculis</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      </Head>
      <Box
        width={1}
        height='54vw'
        display='flex'
        style={{
          backgroundImage: 'url(/hero_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <Box
          width='45%'
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          pr={8}
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
        <Box
          width='55%'
          display='flex'
          alignItems='flex-start'
          flexDirection='column'
          justifyContent='center'
        >
          <Typography
            style={{
              lineHeight: '1em',
              fontSize: 42
            }}
          >
            LEAVE NO THING BEHIND
          </Typography>
          <Box mb={6} />
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
      </Box>
    </Fragment>
  );
}
