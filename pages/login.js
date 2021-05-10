import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SectionLayout } from '../components/delta';
import { Typography, Button } from '@material-ui/core';
import Link from 'next/link';
import reactor from '../reactor';
import Head from '../head';

const useStyles = makeStyles((theme) => ({
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
    maxWidth: 400
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
      marginRight: theme.spacing(10),
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600,
      marginRight: theme.spacing(10)
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
  input: {
    height: 40,
    wodth: 260,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& input': {
      width: '100%',
      height: '100%',
      border: 'none',
      backgroundColor: 'transparent',
      outline: 'none',
      color: '#07003C',
      fontFamily: 'small-caption',
      fontSize: 26,
      letterSpacing: 3
      // '&:focus-visible': {
      //   border: 'none'
      // }
    }
  },
  errorMsg: {
    color: '#C60000',
    textAlign: 'center',
    fontSize: 12,
    marginTop: theme.spacing(2)
  }
}));

function Login({ honmePageData, footerData, loginPageData }) {
  const classes = useStyles();

  return (
    <Fragment>
      <Head title='MIMS - Distributors Login' />
      <div className={classes.root}>
        <SectionLayout
          className={classes.sectionLayout}
          paddingTop={5}
          art={<img src={loginPageData.loginPic} className={classes.art} />}
          content={[
            <Typography key={0} variant='h1' className={classes.title}>
              DISTRIBUTORS LOGIN
            </Typography>,
            <div key={1} className={classes.contentWrapper}>
              <Typography className={classes.instruction}>
                PLEASE ENTER YOUR PASSWORD TO ACCESS
              </Typography>
              <div className={classes.input}>
                <input type='password' maxLength='5' />
              </div>
              <Link href='/docs'>
                <a>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    disableElevation
                    disabled={false}
                  >
                    Enter
                  </Button>
                </a>
              </Link>
              <Typography className={classes.errorMsg}>
                PLEASE RE-ENTER THE PASSWORD
              </Typography>
            </div>
          ]}
        />
      </div>
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
  const honmePageData = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const loginPageData = await reactor.getDoc('wAklSicOZj68wmBfuI8i');
  return {
    props: {
      honmePageData,
      footerData,
      loginPageData
    }
  };
}

export default Login;
