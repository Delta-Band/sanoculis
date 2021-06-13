import React, { useState, Fragment, useRef, useEffect } from 'react';
import parser from 'ua-parser-js';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import reactor from '../reactor';
import { Footer } from '../components/shared';
import { Cookies, Carousel } from '../components/delta';
import Head from '../head';

const useStyles = makeStyles((theme) => ({
  clinicalPageRoot: {
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    minHeight: 'calc(100vh - 60px)',
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(20),
      justifyContent: 'center'
      // position: 'fixed'
    }
    // paddingTop: theme.spacing(5)
  },
  innerWrapper: {
    paddingTop: theme.spacing(12),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(17),
      paddingTop: theme.spacing(4)
    }
  },
  pageHeader: {
    fontSize: 32,
    color: '#FFF',
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: 42,
      paddingLeft: theme.spacing(5)
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(17)
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 62
    }
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(5),
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(17)
    }
  },
  tabDivider: {
    width: 2,
    height: 30,
    background: '#FFF',
    opacity: 0.5,
    borderRadius: 4,
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4)
  },
  carousel: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(17),
      paddingRight: theme.spacing(17)
    }
  },
  paper: {
    width: '100%',
    flexShrink: 0,
    borderRadius: '28px',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  title: {
    fontSize: 16,
    opacity: 0.5
  },
  data: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  finals: {
    fontSize: 22,
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: 28
    }
  },
  smallVerticalSpace: {
    marginTop: theme.spacing(1)
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 40,
      height: 40,
      borderRadius: 40,
      [theme.breakpoints.up('lg')]: {
        width: 70,
        height: 70,
        borderRadius: 70
      }
    }
  },
  secondProfileContainer: {
    justifyContent: 'flex-end'
  },
  profileInfo: {
    marginLeft: theme.spacing(1),
    width: 'calc(100% - 40px)'
  },
  profileTxt: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  justMe: {
    width: 'auto'
  }
}));

export async function getServerSideProps(context) {
  const deviceType =
    parser(context.req.headers['user-agent']).device.type || 'desktop';
  reactor.init();
  const europe = await reactor.getCollection('PZQcOJtjfdrWfGJ7DsbR');
  const india = await reactor.getCollection('T0QN1PiIk1GXQPXWNcia');
  const cookies = await reactor.getDoc('jD2rPC57vkYGWT7rvcdO');
  const homeData = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  return {
    props: {
      deviceType,
      europe,
      india,
      cookies,
      homeData,
      footerData
    }
  };
}

export default function ClinicalData({
  europe,
  india,
  cookies,
  homeData,
  footerData
}) {
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  const visibleItems = upXl ? 4.5 : upLg ? 2.4 : upMd ? 2.4 : upSm ? 1.8 : 1.1;
  const myRef = useRef();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const newIndex = Math.min(getCollectionByTab().length - 1, index + 1);
      setIndex(newIndex);
    },
    onSwipedRight: () => {
      const newIndex = Math.max(0, index - 1);
      setIndex(newIndex);
    }
  });
  const refPassthrough = (el) => {
    handlers.ref(el);
    myRef.current = el;
  };

  /** SUB-COMPONENETS */
  function Tab({ index, text }) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          color: tab === index ? '#000' : '#FFF',
          opacity: tab === index ? 1 : 0.3,
          textTransform: 'uppercase',
          cursor: 'pointer'
        }}
      >
        <Typography
          onClick={() => setTab(index)}
          style={{
            color: 'inherit'
          }}
        >
          {text}
        </Typography>
      </motion.div>
    );
  }

  function Tabs() {
    return (
      <div className={classes.tabContainer}>
        <Tab text='Europe' index={0} />
        <div className={classes.tabDivider} />
        <Tab text='INDIA' index={1} />
      </div>
    );
  }

  function PageHeader() {
    return (
      <Typography variant='h1' className={classes.pageHeader}>
        CLINICAL TRIAL DATA
      </Typography>
    );
  }

  function Profile({ pic, name, patients, justMe = false }) {
    return (
      <Fragment>
        <img src={pic} />
        <div className={classes.profileInfo}>
          <Typography
            variant='body2'
            className={cx(classes.profileTxt, { [classes.justMe]: justMe })}
          >
            {name}
          </Typography>
          <Typography variant='body2' className={classes.profileTxt}>
            {patients} Patients
          </Typography>
        </div>
      </Fragment>
    );
  }

  /** METHODS */
  function getCollectionByTab() {
    return tab === 0 ? europe : india;
  }

  /** EFFECTS */
  useEffect(() => {
    setIndex(0);
  }, [tab]);

  return (
    <Fragment>
      <Head title='MIMS Clinical Data' />
      <div className={classes.clinicalPageRoot}>
        <PageHeader />
        <Tabs />
        <div ref={refPassthrough}>
          <Carousel className={classes.carousel} visibleItems={visibleItems}>
            {getCollectionByTab().map((itm, i) => (
              <Paper
                key={itm.id}
                className={classes.paper}
                elevation={5}
                onClick={() => setIndex(i)}
              >
                <Box pl={4.5} pr={4.5} pt={3} pb={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={7}>
                      <Typography className={classes.title}>
                        Follow Up
                      </Typography>
                      <Typography className={classes.data}>
                        {itm.followUp} MONTHS
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography className={classes.title}>Size</Typography>
                      <Typography className={classes.data}>
                        N = {itm.size}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.title}>
                        Duration
                      </Typography>
                      <Typography className={classes.data}>
                        {itm.durationBase}±{itm.durationVar} MINS
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.title}>
                        Standalone / Combined
                      </Typography>
                      <Typography className={classes.data}>
                        100 ALONE / 20 CATARACT
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      spacing={1}
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                    >
                      <Grid item xs={12}>
                        <Typography className={classes.title}>
                          Performing Surgeons
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={itm.surgeon2Pic ? 6 : 12}
                        className={classes.profileContainer}
                      >
                        <Profile
                          pic={itm.surgeon1Pic}
                          name={itm.surgeon1Name}
                          patients={itm.surgeon1Patients}
                          justMe={!itm.surgeon2Pic}
                        />
                      </Grid>
                      {itm.surgeon2Pic && (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={cx(
                            classes.profileContainer,
                            classes.secondProfileContainer
                          )}
                        >
                          <Profile
                            pic={itm.surgeon2Pic}
                            name={itm.surgeon2Name}
                            patients={itm.surgeon2Patients}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={12} container justify='space-between'>
                      <Grid item xs={12}>
                        <Typography className={classes.title}>
                          Final Results
                        </Typography>
                      </Grid>
                      <Grid item xs={9} className={classes.smallVerticalSpace}>
                        <Typography className={classes.finals}>
                          IOP REDUCTION
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.smallVerticalSpace}>
                        <Typography className={classes.finals}>
                          {itm.iop}%
                        </Typography>
                      </Grid>
                      <Grid item xs={9} className={classes.smallVerticalSpace}>
                        <Typography className={classes.finals}>
                          MEDS REDUCTION
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.smallVerticalSpace}>
                        <Typography className={classes.finals}>
                          {itm.meds}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            ))}
          </Carousel>
        </div>
      </div>
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
      <Cookies
        text={cookies.statement}
        privacyPolicyUrl={cookies.pdf}
        immediate
      />
    </Fragment>
  );
}
