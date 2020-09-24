import React, { useRef } from 'react';
import { Page } from '../components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles.scss';

export default function Home() {
  const pageRef = useRef();
  // const [hueRotation, sethueRotation] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     sethueRotation((hueRotation) =>
  //       hueRotation > 360 ? 0 : hueRotation + 1
  //     );
  //   }, 100);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Page getRef={pageRef} className={styles.stage}>
      <img
        src='images/mims_device.png'
        // src='https://drugsafetynews.com/wp-content/uploads/2018/11/Overseas-Medical-Devices.jpg'
        className={styles.art}
        // style={{
        //   filter: `hue-rotate(${hueRotation}deg)`
        // }}
      />
      <img src='images/logo.svg' className={styles.logo} />
      <img src='images/ce.svg' className={styles.ceLogo} />
      <div className={styles.contentBox}>
        <img src='images/text-content.svg' />
        <Grid container>
          <Grid item xs={8}>
            <TextField
              id='filled-basic'
              placeholder='stay updated'
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
              disableElevation
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </div>
      <Box
        // display='flex'
        className={styles.footer}
        justifyContent='center'
        // alignItems='center'
      >
        <div>
          <a
            href='mailto:info@sanoculis.com?subject=Mail from Our Website&body=Please contact me'
            target='_blank'
            rel='noopener noreferrer'
          >
            info@sanoculis.com
          </a>
          &nbsp; | +972 03-550-6432
        </div>
        <div>10 Landau, Kiryat Ono, Israel | Sanoculis LTD. 2020</div>
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
