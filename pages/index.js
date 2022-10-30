import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import reactor from '../reactor';
import Head from '../head';
import { DeltaTestimonials } from '../shared';
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
import { SectionLayout, Cookies } from '../components/delta';

export async function getServerSideProps(context) {
  reactor.init();
  const homePage = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const cookies = await reactor.getDoc('jD2rPC57vkYGWT7rvcdO');
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
      disributors,
      cookies
    }
  };
}

const useStyles = makeStyles(theme => ({
  blueInfo: {
    color: theme.palette.primary.main
  },
  whiteText: {
    color: '#FFF'
  },
  art: {
    width: '80vw',
    height: '80vw',
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      height: '50vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      height: '40vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
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

export default function Home({
  homePage,
  testimonials,
  news,
  footer,
  disributors,
  cookies
}) {
  // const theme = useTheme();
  const classes = useStyles();
  // const upMD = useMediaQuery(theme.breakpoints.up('md'));
  // const _isMobile = isMobile || matches;

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Hero tagline={homePage.tagline} description={homePage.description} />
      <SectionLayout
        art={
          <Box className={classes.art}>
            <lottie-interactive
              loop='true'
              path='lottie/1.json'
              interaction='play-on-show'
            />
          </Box>
        }
        content={[
          <Typography key={0} variant='h2'>
            {homePage.section1Title}
          </Typography>,
          <Typography key={1}>{homePage.section1Description}</Typography>
        ]}
      />
      <HowItWorks homePage={homePage} artClass={classes.art} />
      <SectionLayout
        art={
          <Box className={classes.art}>
            <lottie-interactive
              loop='true'
              path='lottie/3.json'
              interaction='play-on-show'
            />
          </Box>
        }
        content={[
          <Typography key={0} variant='h2'>
            {homePage.section3Title}
          </Typography>,
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
      <Cookies text={cookies.statement} privacyPolicyUrl={cookies.pdf} />
    </Fragment>
  );
}

// trigger build
