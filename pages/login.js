import React, { Fragment } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@material-ui/core';
import { SectionLayout, Login as DeltaLogin } from '../components/delta';
import { Footer } from '../components/shared';
// import Link from 'next/link';
import reactor from '../reactor';
import Head from '../head';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
  },
  instruction: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  login: {
    [theme.breakpoints.up('md')]: {
      borderRadius: theme.spacing(0.5)
    }
  }
}));

function Login({ homeData, footerData, loginPageData, disributorsData }) {
  const classes = useStyles();
  const validPasswords = disributorsData.map(item => item.password);
  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Fragment>
      <Head title='MIMS - Distributors Login' />
      <SectionLayout
        className={classes.sectionLayout}
        paddingTop={upMD ? 13 : 7}
        paddingBottom={upMD ? 5 : -3}
        art={<img src={loginPageData.loginPic} className={classes.art} />}
        content={[
          <Typography key={0} variant='h1' className={classes.title}>
            DISTRIBUTORS LOGIN
          </Typography>,
          <div key={1} className={classes.contentWrapper}>
            <DeltaLogin
              validPasswords={validPasswords}
              redirectPath='/docs'
              className={classes.login}
              placeHolder='ENTER YOUR PASSWORD TO ACCESS'
              id='dist_page'
            />
          </div>
        ]}
      />
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
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const loginPageData = await reactor.getDoc('wAklSicOZj68wmBfuI8i');
  const disributorsData = await reactor.getCollection('mQbnHW9wcV79q9SWOfXN');
  return {
    props: {
      homeData,
      footerData,
      loginPageData,
      disributorsData
    }
  };
}

export default Login;
// trigger build
