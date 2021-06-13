import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Head from '../head';
import reactor from '../reactor';
import { Hero, ProfilesCarousel, Footer } from '../components/shared';
import { ParallaxCarousel, Cookies } from '../components/delta';

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const homeData = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const vision = await reactor.getDoc('7l4t8f1VUXEKmgtyeI3x');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const cookies = await reactor.getDoc('jD2rPC57vkYGWT7rvcdO');
  const leadership = await reactor.getCollection('v0duELYFMBPWaXzL9Q1M');
  const advisors = await reactor.getCollection('BxLbiTqgrOCEYFOpxZXM');
  const partners = await reactor.getCollection('TFonimSupP6KQaFfPONd');
  return {
    props: {
      vision,
      leadership,
      homeData,
      footerData,
      advisors,
      partners,
      cookies
    }
  };
}

const useStyles = makeStyles((theme) => ({
  pageContent: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    maxWidth: 1024 + theme.spacing(10),
    margin: '0 auto'
  },
  section: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  sectionTitle: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
  partners: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  partner: {
    width: 187,
    height: 94,
    padding: theme.spacing(1),
    backgroundColor: '#e7e4fe',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      mixBlendMode: 'darken'
    },
    '&:last-child': {
      marginRight: theme.spacing(0)
    },
    [theme.breakpoints.up('sm')]: {
      width: 260,
      height: 130
    }
  }
}));

export default function Vision({
  vision,
  leadership,
  homeData,
  footerData,
  advisors,
  partners,
  cookies
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <Head title='MIMS Vision' />
      <Hero
        imageSrc={vision.heroImg}
        imageSrcMobile={vision.heroImgMobile}
        title={vision.heroTitle}
        description={vision.heroDescription}
      />
      <div className={classes.pageContent}>
        <section className={classes.section}>
          <Typography variant='h2' className={classes.sectionTitle}>
            Sanoculis Leadership Team
          </Typography>
          <ProfilesCarousel profiles={leadership} />
        </section>
        <section className={classes.section}>
          <Typography variant='h2' className={classes.sectionTitle}>
            Sanoculis Medical Advisory Board
          </Typography>
          <ProfilesCarousel profiles={advisors} />
        </section>
        <section className={classes.section}>
          <Typography variant='h2' className={classes.sectionTitle}>
            Medical Institutional Partners
          </Typography>
          <ParallaxCarousel
            list={partners}
            itemsInRow={4}
            className={classes.partners}
            itemBuilder={(item) => <Partner pic={item.logo} />}
          />
        </section>
      </div>
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
      <Cookies text={cookies.statement} privacyPolicyUrl={cookies.pdf} />
    </Fragment>
  );
}

/** SUB COMPONENTS */
function Partner({ pic }) {
  const classes = useStyles();
  return (
    <div className={classes.partner}>
      <img src={pic} />
    </div>
  );
}
