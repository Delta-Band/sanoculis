import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
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
  pageInner: {
    maxWidth: 1600,
    margin: '0 auto'
  },
  accordionContainer: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
    // backgroundColor: theme.palette.secondary.dark
  },
  heading: {
    fontSize: 14
  },
  pageTitle: {
    color: theme.palette.primary.main,
    fontSize: 20,
    textTransform: 'uppercase',
    paddingLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: 30
    }
  },
  lastUpdate: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4)
  },
  date: {
    marginLeft: theme.spacing(2)
  },
  docsList: {
    display: 'flex',
    flexDirection: 'column'
  },
  docContainer: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      marginBottom: 0
    }
  },
  docTitle: {
    fontWeight: 500,
    fontSize: 14
  },
  docSubtitle: {
    fontSize: 14,
    textTransform: 'uppercase'
  },
  whiteTxt: {
    color: '#FFF',
    fontSize: 14
  },
  link: {
    border: '1px solid',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 34,
    paddingTop: 1,
    borderRadius: 4,
    marginTop: theme.spacing(1)
  }
}));

/** SUB-COMPONENTS */
function Accordion({ title, docs }) {
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
        <div className={classes.docsList}>
          {docs.map((doc) => (
            <div key={doc.id} className={classes.docContainer}>
              <Typography className={classes.docTitle}>{doc.title}</Typography>
              <Typography className={classes.docSubtitle}>
                {doc.subtItle}
              </Typography>
              <a
                className={classes.link}
                href={doc.pdf || doc.videoLink}
                target='_blank'
                rel='noreferrer'
              >
                <Typography className={classes.whiteTxt}>VIEW</Typography>
              </a>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </MuiAccordion>
  );
}

function Docs({
  disributorsData,
  distributorsPageData,
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
        <div className={classes.pageInner}>
          <Typography variant='h1' className={classes.pageTitle}>
            {distributorsPageData.pageTitle}
          </Typography>
          <Typography className={classes.lastUpdate}>
            LAST UPDATE:{' '}
            <span className={classes.date}>
              <Moment format='MM/DD/YYYY'>
                {distributorsPageData.lastUpdate}
              </Moment>
            </span>
          </Typography>
          <div className={classes.accordionContainer}>
            <Accordion title='REGULATORY DOCS' docs={regulatoryData} />
            <Accordion title='TECNICAL USER MANUAL' docs={manualData} />
            <Accordion title='PRODUCT IMAGES & SPEC SHEETS' docs={specsData} />
            <Accordion
              title='TRAINING DOCS & SURGICAL VIDEOS'
              docs={trainingData}
            />
            <Accordion title='ABSTRACTS & PUBLICATIONS' docs={abstractData} />
          </div>
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
  const distributorsPageData = await reactor.getDoc('XN7drzeOjj81uxLEF5Xf');
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
      distributorsPageData,
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
