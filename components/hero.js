import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';

function Hero({ isMobile }) {
  const theme = useTheme();
  return (
    <Box>
      <video style={{ width: '100vw' }} src='hero.mp4' autoPlay loop />
      {/* <Grid container>
      <Grid item>Hero Section</Grid>
    </Grid> */}
    </Box>
    // <Box
    //   width={1}
    //   style={{
    //     backgroundImage: 'url(/hero_bg.png)',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center center'
    //   }}
    // >
    //   <SectionLayoutNew
    //     isMobile={isMobile}
    //     style={{
    //       paddingTop: theme.spacing(isMobile ? 20 : 25),
    //       paddingBottom: theme.spacing(isMobile ? 8 : 14)
    //     }}
    //     left={
    //       <Box
    //         width={isMobile ? '80vw' : '28vw'}
    //         height={isMobile ? '80vw' : '28vw'}
    //         borderRadius={theme.spacing(57)}
    //         style={{
    //           backgroundColor: theme.palette.primary.dark
    //         }}
    //       ></Box>
    //     }
    //     right={
    //       <Fragment>
    //         <img
    //           src='/mims_for_hero.svg'
    //           style={{
    //             width: isMobile ? '100%' : '32vw',
    //             minWidth: isMobile ? 'initial' : 393
    //           }}
    //         />
    //         <Box mb={5} />
    //         <Typography
    //           style={{
    //             lineHeight: '1em',
    //             fontSize: 42
    //           }}
    //         >
    //           LEAVE NO THING BEHIND
    //         </Typography>
    //         <Box mb={4} />
    //         <Typography
    //           style={{
    //             lineHeight: '2em'
    //           }}
    //         >
    //           Minimally Invasive Micro Sclerostomy is a Stentless,
    //           <br />
    //           Simple & Fast Glaucoma treatment to effectively lower
    //           <br />
    //           IOP without invasive surgery or medication.
    //         </Typography>
    //       </Fragment>
    //     }
    //   />
    // </Box>
  );
}

export default Hero;
