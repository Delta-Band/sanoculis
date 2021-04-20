import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textWrapper: {
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%)',
    width: '40vw'
  },
  white: {
    color: '#FFF'
  }
}));

function Hero({ tagline, description }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box position='relative'>
      <video style={{ width: '100vw' }} src='hero.mp4' autoPlay loop />
      <Box position='absolute' className={classes.textWrapper}>
        <img src='mims_for_hero.svg' />
        <Typography
          className={classes.white}
          style={{
            fontSize: 59,
            lineHeight: '72px',
            marginTop: theme.spacing(4)
          }}
        >
          {tagline}
        </Typography>
        <Typography
          className={classes.white}
          style={{ whiteSpace: 'pre-line', marginTop: theme.spacing(4) }}
        >
          {description}
        </Typography>
      </Box>
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
