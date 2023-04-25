import reactor from '../reactor';
import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Head from '../head';
import { Typography, Button } from '@material-ui/core';
import { Footer, Accordion } from '../components/shared';
import { SectionLayout, Login as DeltaLogin } from '../components/delta';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
    paddingInline: 25,
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
  },
  passwordWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    pointerEvents: 'none',
    '& input': {
      pointerEvents: 'all'
    }
  },
  sectionLayout: {
    width: '80vw'
  },
  title: {
    color: theme.palette.primary.main,
    hyphens: 'auto',
    fontSize: 29,
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  contentWrapper: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(-2),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      marginTop: theme.spacing(-2)
    }
  },
  art: {
    width: '80vw',
    height: '80vw',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      height: '50vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      height: '40vw',
      // marginRight: theme.spacing(10),
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
    }
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
  sbsPage
}) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));

  return password === sbsPage.password ? (
    <>
      <Head title='MIMS - Step by Step' />
      <div className={classes.root}>
        <div className={classes.pageInner}>
          <Typography variant='h1' style={{ marginBlockEnd: 16 }}>
            MIMS STEP BY STEP
          </Typography>
          <Typography>
            Please see below a summary of the required surgical steps for the
            MIMS proceedure
          </Typography>
          <div className={classes.spacer} />
          <Typography variant='h2'>Preparation</Typography>
          {preparation.map(itm => (
            <Accordion key={itm.id} label={itm.title} content={itm.content} />
          ))}
          {sbsPage.preparation && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={sbsPage.preparation}
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
          {sbsPage.preoperative && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={sbsPage.preoperative}
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
          {sbsPage.intraoperative && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={sbsPage.intraoperative}
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
          {sbsPage.followUp && (
            <Button
              variant='contained'
              disableElevation
              color='primary'
              size='large'
              href={sbsPage.followUp}
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
          {sbsPage.specialSteps && (
            <Button
              variant='contained'
              disableElevation
              color='secondary'
              size='large'
              href={sbsPage.specialSteps}
              target='_blank'
            >
              VIEW AS PDF
            </Button>
          )}
        </div>
      </div>
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
    </>
  ) : (
    <div className={classes.passwordWrapper}>
      <Head title='MIMS - SBS Login' />
      <SectionLayout
        className={classes.sectionLayout}
        paddingTop={upMD ? 13 : 7}
        paddingBottom={upMD ? 5 : -3}
        art={<img src={sbsPage.passwordArt} className={classes.art} />}
        content={[
          <Typography key={0} variant='h1' className={classes.title}>
            STEP BY STEP GUIDE
          </Typography>,
          <div key={1} className={classes.contentWrapper}>
            <DeltaLogin
              validPasswords={[sbsPage.password]}
              onChange={val => {
                if (val === sbsPage.password) {
                  setTimeout(() => {
                    setPassword(val);
                  }, 1000);
                }
              }}
              className={classes.login}
              placeHolder='ENTER PASSWORD TO ACCESS'
              id='sbs_page'
            />
          </div>
        ]}
      />
    </div>
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
  const sbsPage = await reactor.getDoc('TQKqTWI7WnCHLjTmDeP7');
  return {
    props: {
      homeData,
      footerData,
      preparation,
      preoperative,
      intraoperative,
      followUp,
      specialSteps,
      sbsPage
    }
  };
}
