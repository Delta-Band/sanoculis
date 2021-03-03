import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Head from 'next/head';

export default function About() {
  // Hooks
  const theme = useTheme();

  return (
    <Fragment>
      <Head>
        <title>About MIMS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        container
        spacing={0}
        style={{
          paddingTop: theme.spacing(17),
          paddingLeft: theme.mobileGutter,
          paddingRight: theme.mobileGutter
        }}
      >
        <Grid item xs={12} style={{ marginBottom: theme.mobileGutter }}>
          <Typography variant='h2'>Our Vision</Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: theme.spacing(10) }}>
          <Typography>
            Sanoculis LTD. develops innovative medical devices and solutions in
            Glaucoma treatment. We provide a safe, effective and simple way to
            perform procedures which may become the standard for treating
            Glaucoma and combined Glaucoma Cataract surgeries. Sanoculis was
            established in 2012 and is backed by private and institutional
            investors.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: theme.mobileGutter }}>
          <Typography variant='h2'>Sanoculis Leadership Team</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}
