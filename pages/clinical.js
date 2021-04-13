import React, { useState, Fragment } from 'react';
import parser from 'ua-parser-js';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import reactor from '../reactor';
import { DeltaCarousel, DeltaProfile } from '../shared';
import Head from '../head';

const useStyles = makeStyles((theme) => {
  const {
    // breakpoints,
    typography: { pxToRem }
  } = theme;

  return createStyles({
    title: {
      fontSize: pxToRem(16),
      opacity: 0.5
    },
    data: {
      fontSize: pxToRem(20),
      fontWeight: 'bold'
    },
    finals: {
      fontSize: pxToRem(28),
      color: theme.palette.primary.main
    }
  });
});

export async function getServerSideProps(context) {
  const deviceType =
    parser(context.req.headers['user-agent']).device.type || 'desktop';
  reactor.init();
  const europe = await reactor.getCollection('PZQcOJtjfdrWfGJ7DsbR');
  const india = await reactor.getCollection('T0QN1PiIk1GXQPXWNcia');
  return {
    props: {
      deviceType,
      europe,
      india
    }
  };
}

export default function ClinicalData({ europe, india }) {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const classes = useStyles();

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
      <Box display='flex' mt={2}>
        <Tab text='Europe interm results' index={0} />
        <Box mr={4} />
        <Tab text='INDIA interm results' index={1} />
      </Box>
    );
  }

  function PageHeader() {
    return (
      <Typography variant='h1' style={{ color: '#FFF' }}>
        CLINICAL TRIAL DATA
      </Typography>
    );
  }

  return (
    <Fragment>
      <Head title='MIMS Story' />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        width={1}
        height={1}
        position='fixed'
        style={{
          background: theme.palette.primary.main
        }}
      >
        <Box display='flex' flexDirection='column' pl={17} pt={4}>
          <PageHeader />
          <Tabs />
        </Box>
        <Box mt={4} />
        <DeltaCarousel
          items={tab === 0 ? europe : india}
          itemWidth={400}
          paddingLeft={theme.spacing(17)}
          itemBuilder={(item) => (
            <Paper
              style={{
                width: '100%',
                borderRadius: '28px',
                marginBottom: theme.spacing(2)
              }}
              elevation={5}
            >
              <Box pl={4.5} pr={4.5} pt={3} pb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Typography className={classes.title}>Follow Up</Typography>
                    <Typography className={classes.data}>
                      {item.followUp} MONTHS
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.title}>Size</Typography>
                    <Typography className={classes.data}>
                      N = {item.size}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.title}>Duration</Typography>
                    <Typography className={classes.data}>
                      {item.durationBase}±{item.durationVar} MINS
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
                    <Grid item xs={6}>
                      <DeltaProfile
                        row
                        size={40}
                        pic={item.surgeon1Pic}
                        name={item.surgeon1Name}
                        title={`${item.surgeon1Patients} Patients`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DeltaProfile
                        row
                        size={40}
                        pic={item.surgeon2Pic}
                        name={item.surgeon2Name}
                        title={`${item.surgeon2Patients} Patients`}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container justify='space-between'>
                    <Grid item xs={12}>
                      <Typography className={classes.title}>
                        Final Results
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography className={classes.finals}>
                        IOP REDUCTION
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className={classes.finals}>
                        {item.iop}%
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography className={classes.finals}>
                        MEDS REDUCTION
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography className={classes.finals}>
                        {item.meds}%
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          )}
        />
      </Box>
    </Fragment>
  );
}
