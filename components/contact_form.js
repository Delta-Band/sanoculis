import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    maxWidth: 400
  }
}));

function Contact({ clear = false }) {
  const theme = useTheme();
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [ok, setOK] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [validateName, setValaidateName] = useState(false);
  const [validateEmail, setValaidateEmail] = useState(false);
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

  useEffect(() => {
    setNameIsValid(name.trim().length > 0);
  }, [name]);

  useEffect(() => {
    if (email.match(regexEmail)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (clear) {
      clearForm();
    }
  }, [clear]);

  function clearForm() {
    setOK(false);
    setValaidateName(false);
    setValaidateEmail(false);
    setName('');
    setEmail('');
    setMessage('');
  }
  return (
    <div className={classes.root}>
      <TextField
        style={{
          width: '100%',
          marginBottom: theme.spacing(2)
        }}
        error={validateName && !nameIsValid}
        id='outlined-error'
        required
        label={validateName && !nameIsValid ? 'Your name is required' : 'Name'}
        // variant='filled'
        value={name}
        // InputLabelProps={{ shrink: false }}
        onChange={(event) => {
          setName(event.target.value);
        }}
        onBlur={() => {
          setValaidateName(true);
        }}
      />
      <TextField
        style={{
          width: '100%',
          marginBottom: theme.spacing(2)
        }}
        required
        error={validateEmail && !emailIsValid}
        id='outlined-error-helper-text'
        label={validateEmail && !emailIsValid ? 'Not a valid email' : 'Email'}
        // variant='filled'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        onBlur={() => {
          setValaidateEmail(true);
        }}
      />
      <TextField
        style={{
          width: '100%',
          marginBottom: theme.spacing(3)
        }}
        label='Message'
        multiline
        rows={3}
        // variant='filled'
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        variant='contained'
        color='primary'
        size='large'
        fullWidth
        disableElevation
        disabled={!nameIsValid || !emailIsValid}
        style={{
          borderRadius: 40,
          // width: isMobile ? '100%' : 200,
          height: 44
        }}
        onClick={() => {
          if (ok) {
            clearForm();
            return;
          }
          if (sending) return;
          setSending(true);
          const serviceID = 'mims_email_service';
          const templateID = 'mims_contact_form';
          const templateParams = {
            name,
            email,
            message
          };
          const userID = 'user_KLCuHsat1fff998ntT9jG';
          emailjs.send(serviceID, templateID, templateParams, userID).then(
            function (response) {
              console.log('SUCCESS!', response.status, response.text);
              setSending(false);
              setOK(true);
              setTimeout(function () {
                setTimeout(function () {
                  setOK(false);
                }, 1000);
              }, 5000);
            },
            function (error) {
              console.log('FAILED...', error);
              setSending(false);
            }
          );
        }}
      >
        {ok ? 'Got it!' : sending ? <Bounce size={16} color='white' /> : 'Send'}
      </Button>
    </div>
  );
}

export default Contact;
