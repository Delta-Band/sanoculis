import React from 'react';
import reactor from '../reactor';
import { makeStyles } from '@material-ui/core/styles';
import Head from '../head';
import {
  //   Accordion as MuiAccordion,
  //   AccordionSummary,
  Typography
  //   AccordionDetails
} from '@material-ui/core';
import { Footer } from '../components/shared';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(17),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    backgroundColor: '#F1F5F8'
  },
  pageInner: {
    maxWidth: 1600,
    margin: '0 auto',
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column'
    // alignItems: 'center',
    // justifyContent: 'center'
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
    alignSelf: 'flex-start',
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

export default function StepByStep({
  homeData,
  footerData,
  distributorsPageData
}) {
  const classes = useStyles();

  return (
    <>
      <Head title='MIMS - Step by Step' />
      <div className={classes.root}>
        <div className={classes.pageInner}>
          <Typography variant='h1' className={classes.pageTitle}>
            {distributorsPageData.pageTitle}
          </Typography>
        </div>
      </div>
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
    </>
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
  const specsData = await reactor.getCollection('VGEKpRqusvnfrxxju3QF');
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
