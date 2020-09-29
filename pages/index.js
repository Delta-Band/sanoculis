import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { Page } from '../components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Email } from '@styled-icons/material-rounded/Email';
import { MarkEmailRead as EmailSent } from '@styled-icons/material-rounded/MarkEmailRead';
import { Warning } from '@styled-icons/material-rounded/Warning';
import { validateEmail } from '../utils';
import styles from './styles.scss';

export default function Home() {
  const pageRef = useRef();
  // const [hueRotation, sethueRotation] = useState(0);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setEmailIsValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (showError && emailIsValid) {
      setShowError(false);
    }
  }, [emailIsValid]);

  function sendEmail() {
    if (!emailIsValid) {
      setShowError(true);
    } else {
      setEmailSent(true);
    }
  }

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
          <Grid item xs={10}>
            <TextField
              id='filled-basic'
              placeholder='stay updated'
              variant='outlined'
              fullWidth
              className={styles.email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </Grid>
          <Grid item xs='auto'>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              className={styles.submit}
              disableElevation
              onClick={sendEmail}
            >
              {emailSent ? <EmailSent key='sent' /> : <Email key='not_sent' />}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              className={cx(styles.errorMsg, { [styles.show]: showError })}
            >
              <div className={styles.errTxt}>Please enter a valid email</div>
              <Warning />
            </Box>
          </Grid>
        </Grid>
      </div>
      <Box
        display='flex'
        className={styles.footer}
        justifyContent='center'
        alignItems='center'
      >
        <a
          href='mailto:info@sanoculis.com?subject=Mail from Our Website&body=Please contact me'
          target='_blank'
          rel='noopener noreferrer'
        >
          Linkedin
        </a>
        <div className={styles.pipe}>|</div>
        <a
          href='mailto:info@sanoculis.com?subject=Mail from Our Website&body=Please contact me'
          target='_blank'
          rel='noopener noreferrer'
        >
          info@sanoculis.com
        </a>
        <div className={styles.pipe}>|</div>
        <div>10 Landau, Kiryat Ono, Israel</div>
        <div className={styles.pipe}>|</div>
        <div>+972 03-550-6432</div>
        <div className={styles.pipe}>|</div>
        <div>Sanoculis LTD. 2020</div>
      </Box>
    </Page>
  );
}
