import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import { Page } from '../components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { Email } from '@styled-icons/material-rounded/Email';
import { MarkEmailRead as EmailSent } from '@styled-icons/material-rounded/MarkEmailRead';
import { Warning } from '@styled-icons/material-rounded/Warning';
import { validateEmail } from '../utils';
import styles from './styles.scss';

export default function Home() {
  const pageRef = useRef();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [scrollPosition, setscrollPosition] = useState(0);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleScroll() {
    setscrollPosition(pageRef.current.scrollTop);
  }

  useEffect(() => {
    setTimeout(() => {
      handleScroll();
    }, 1000);
    pageRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (pageRef.current) {
        pageRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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

  function attachTypingClass() {
    document.getElementById('__next').classList.add('typing');
  }

  function removeTypingClass() {
    document.getElementById('__next').classList.remove('typing');
  }

  return (
    <Page
      getRef={pageRef}
      className={cx(styles.stage, { [styles.mobile]: mobile })}
    >
      <img
        src='images/logo.svg'
        className={cx(styles.logo, { [styles.mobile]: mobile })}
        style={{
          opacity: 3 - scrollPosition * (1 / 100)
        }}
      />
      <img
        src='images/ce.svg'
        className={cx(styles.ceLogo, { [styles.mobile]: mobile })}
        style={{
          opacity: 3 - scrollPosition * (1 / 100)
        }}
      />
      <img
        src={
          mobile ? 'images/mims_device_mobile.png' : 'images/mims_device.png'
        }
        className={cx(styles.art, { [styles.mobile]: mobile })}
        style={{
          transform: `translateX(-${scrollPosition * 0.15}%)`,
          opacity: 1 - scrollPosition * (1 / 250)
        }}
      />
      <div className={cx(styles.contentBox, { [styles.mobile]: mobile })}>
        <img src='images/text-content.svg' />
        <Grid
          container
          className={cx(styles.textBox, { [styles.mobile]: mobile })}
        >
          <Grid item xs={10}>
            <TextField
              id='filled-basic'
              placeholder='Get updates on clinical progress'
              variant='outlined'
              fullWidth
              className={cx(styles.email, { [styles.mobile]: mobile })}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              onFocus={attachTypingClass}
              onBlur={removeTypingClass}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              className={cx(styles.submit, {
                [styles.mobile]: mobile,
                [styles.sent]: emailSent
              })}
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
        flexDirection={mobile ? 'column' : 'row'}
        className={cx(styles.footer, { [styles.mobile]: mobile })}
        justifyContent='center'
        alignItems='center'
      >
        <Box display='flex'>
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
        </Box>
        {!mobile && <div className={styles.pipe}>|</div>}
        <div>10 Landau, Kiryat Ono, Israel</div>
        {!mobile && <div className={styles.pipe}>|</div>}
        <Box display='flex'>
          <div>+972 03-550-6432</div>
          <div className={styles.pipe}>|</div>
          <div>Sanoculis LTD. 2020</div>
        </Box>
      </Box>
    </Page>
  );
}
