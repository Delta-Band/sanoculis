import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import reactor from '../reactor';
import Head from '../head';
import { DeltaTestimonials, Delta2ColLayout } from '../shared';
import { Footer } from '../components/shared';
import {
  Hero,
  News,
  LearnMore,
  ClinicalPerformance,
  HowItWorks,
  SpecSection,
  DistributorsForHome
} from '../components';

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
  const disributors = await reactor.getCollection('mQbnHW9wcV79q9SWOfXN');
  const footer = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  return {
    props: {
      homePage,
      testimonials,
      news,
      footer,
      disributors
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
    position: 'relative',
    margin: '0 auto 10vw',
    width: '80vw',
    // height: '80vw',
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      width: '400px',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      width: '550px',
      height: '550px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
    // '& > img': {
    //   width: '100%',
    //   [theme.breakpoints.up('md')]: {
    //     width: '90%'
    //   }
    // }
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

export default function Home({
  homePage,
  testimonials,
  news,
  footer,
  disributors
}) {
  // const theme = useTheme();
  const classes = useStyles();
  // const upMD = useMediaQuery(theme.breakpoints.up('md'));
  // const _isMobile = isMobile || matches;

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Hero tagline={homePage.tagline} description={homePage.description} />
      <Delta2ColLayout
        art={
          <Box className={classes.art}>
            <lottie-interactive
              loop
              path='lottie/1.json'
              interaction='play-on-show'
            />
          </Box>
        }
        title={homePage.section1Title}
        content={[
          <Typography key={1}>{homePage.section1Description}</Typography>
        ]}
      />
      <HowItWorks homePage={homePage} artClass={classes.art} />
      <Delta2ColLayout
        art={
          <Box className={classes.art}>
            <lottie-interactive
              loop
              path='lottie/3.json'
              interaction='play-on-show'
            />
          </Box>
        }
        title={homePage.section3Title}
        content={[
          <Typography key={1}>{homePage.section3Description}</Typography>
        ]}
      />
      <SpecSection artClass={classes.art} homePage={homePage} />
      <ClinicalPerformance homePage={homePage} classes={classes} />
      <DeltaTestimonials
        testimonials={testimonials}
        title={homePage.testimonialsTitle}
      />
      <News artClass={classes.art} title={homePage.newsTitle} items={news} />
      <DistributorsForHome disributors={disributors} />
      <LearnMore />
      <Footer specPDF={homePage.specPdf} footerData={footer} />
    </Fragment>
  );
}
