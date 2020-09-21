import React, { useRef } from 'react';
import { Page } from '../components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles.scss';

export default function Home() {
  const pageRef = useRef();

  return (
    <Page getRef={pageRef} className={styles.page}>
      <img src='images/mims_device.png' className={styles.art} />
      <img src='images/logo.svg' className={styles.logo} />
      <div className={styles.contentBox}>
        <img src='images/text-content.svg' />
        <Grid container>
          <Grid item xs={8}>
            <TextField
              id='filled-basic'
              placeholder='Enter yuour email address'
              variant='outlined'
              fullWidth
              className={styles.email}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              className={styles.submit}
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </div>
      <Box
        display='flex'
        className={styles.footer}
        justifyContent='center'
        alignItems='center'
      >
        info@sanoculis.com | +972 54 555 4678 | Begin st.154, Tel Aviv |
        Sanoculis LTD. 2020
      </Box>
      {/* <Section
        type='art-content'
        art={
          <img src='images/mims_device.png' />
          // <div>Art</div>
        }
        header={
          // <div>
          //   <div className={styles.headerTop}>
          //     Minimaliy Invasive Micro Sclerostomy
          //   </div>
          //   MIMS
          //   <Registered className={styles.registered} />
          // </div>
          <Grid container direction='column'>
            <Grid item className={styles.headerTop}>
              Minimaliy Invasive Micro Sclerostomy
            </Grid>
            <Grid item>
              <div className={styles.mims}>
                MIMS
                <Registered className={styles.registered} />
                <Registered className={styles.ce} />
              </div>
            </Grid>
            <Grid item className={styles.headerBotom}>
              Treating Glaucoma as soon &amp; safe as possible
            </Grid>
          </Grid>
        }
        superSizedHeader
        body={
          <div className={styles.body}>
            Stay updated on continuing clinical trial progress, availability in
            the eu &amp; CE amendment status
          </div>
        }
        footer={<div>Section 1 footer</div>}
        pageRef={pageRef}
      /> */}
    </Page>
  );
}
