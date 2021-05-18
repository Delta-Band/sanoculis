import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@material-ui/core';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';
import { useRouter } from 'next/router';
import { Footer } from '../components/shared';
import reactor from '../reactor';
import Head from '../head';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(17),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    backgroundColor: '#F1F5F8'
  },
  accordionContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
    // backgroundColor: theme.palette.secondary.dark
  },
  heading: {
    fontSize: 14
  }
}));

/** SUB-COMPONENTS */
function Accordion({ title }) {
  const classes = useStyles();
  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ChevronDown size={24} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={classes.heading}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
}

function Docs({
  disributorsData,
  regulatoryData,
  manualData,
  specsData,
  trainingData,
  abstractData,
  homeData,
  footerData
}) {
  const classes = useStyles();
  const router = useRouter();
  const validPasswords = disributorsData.map((item) => item.password);

  useEffect(() => {
    const password = window.localStorage.getItem('password');
    if (!validPasswords.includes(password)) {
      router.push('/login');
    }
  }, []);

  return (
    <Fragment>
      <Head title='MIMS - Docs' />
      <div className={classes.root}>
        <div className={classes.accordionContainer}>
          <Accordion title='REGULATORY DOCS' />
          <Accordion title='TECNICAL USER MANUAL' />
          <Accordion title='PRODUCT IMAGES & SPEC SHEETS' />
          <Accordion title='TRAINING DOCS & SURGICAL VIDEOS' />
          <Accordion title='ABSTRACTS & PUBLICATIONS' />
        </div>
      </div>
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const homeData = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const disributorsData = await reactor.getCollection('mQbnHW9wcV79q9SWOfXN');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const regulatoryData = await reactor.getCollection('lIlNrxE94i0QHCYHIM0Y');
  const manualData = await reactor.getCollection('yIHx3NaCdF2CbGAvvxad');
  const specsData = await reactor.getCollection('yIHx3NaCdF2CbGAvvxad');
  const trainingData = await reactor.getCollection('C31pBEH1BRd72vHfgkLk');
  const abstractData = await reactor.getCollection('ctFE6wXmvqESjGerIaIz');
  return {
    props: {
      homeData,
      disributorsData,
      footerData,
      regulatoryData,
      manualData,
      specsData,
      trainingData,
      abstractData
    }
  };
}

export default Docs;
