import React from 'react';
import reactor from '../reactor';
import { makeStyles } from '@material-ui/core/styles';
import Head from '../head';
import { Typography, Button } from '@material-ui/core';
import { Footer, Accordion } from '../components/shared';

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
    flexDirection: 'column',
    '& > h2': {
      marginBlockEnd: 32
    },
    '& > a': {
      alignSelf: 'flex-start',
      marginBlockStart: 24
    }
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  spacer: {
    height: 64
  }
}));

export default function StepByStep({
  homeData,
  footerData,
  preparation,
  preoperative,
  intraoperative,
  followUp,
  specialSteps,
  pdfs
}) {
  const classes = useStyles();
  console.log('preparation: ', preparation);

  return (
    <>
      <Head title='MIMS - Step by Step' />
      <div className={classes.root}>
        <div className={classes.pageInner}>
          <Typography variant='h1'>MIMS STEP BY STEP</Typography>
          <Typography>
            Please see below a summary of the required surgical steps for the
            MIMS proceedure
          </Typography>
          <div className={classes.spacer} />
          <Typography variant='h2'>Preparation</Typography>
          {preparation.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {pdfs.preparation && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={pdfs.preparation}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
          <div className={classes.spacer} />
          <Typography variant='h2'>Preoperative</Typography>
          {preoperative.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {pdfs.preoperative && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={pdfs.preoperative}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
          <div className={classes.spacer} />
          <Typography variant='h2'>Intraoperative</Typography>
          {intraoperative.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {pdfs.intraoperative && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={pdfs.intraoperative}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
          <div className={classes.spacer} />
          <Typography variant='h2'>Follow up</Typography>
          {followUp.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {pdfs.followUp && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={pdfs.followUp}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
        </div>
      </div>
      <div
        className={classes.root}
        style={{ background: '#6172FF', color: '#FFFFFF', paddingBlock: 136 }}
      >
        <div className={classes.pageInner} style={{ minHeight: 'unset' }}>
          <Typography variant='h2'>
            Special Steps - When Combined with Cataract Proceedure
          </Typography>
          {specialSteps.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {pdfs.specialSteps && (
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              size='large'
              href={pdfs.specialSteps}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
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
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const preparation = await reactor.getCollection('z5MZlzvVUNv6PqQ4ZA96');
  const preoperative = await reactor.getCollection('yUexjMFvv3ko9yazPy3w');
  const intraoperative = await reactor.getCollection('4b7el2zeci4DpmdUM64Y');
  const followUp = await reactor.getCollection('U0vYkL6TvswEbskrFOsn');
  const specialSteps = await reactor.getCollection('M7vsJPCWxBWhbWXtJuyM');
  const pdfs = await reactor.getDoc('TQKqTWI7WnCHLjTmDeP7');
  return {
    props: {
      homeData,
      footerData,
      preparation,
      preoperative,
      intraoperative,
      followUp,
      specialSteps,
      pdfs
    }
  };
}
