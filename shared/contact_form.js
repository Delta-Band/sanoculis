import React, { useState, useEffect, Fragment } from 'react';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import { useTheme } from '@material-ui/core/styles';

let to;

function Contact({ isMobile }) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [ok, setOK] = useState(false);
  const [message, setMessage] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [validateName, setValaidateName] = useState(false);
  const [validateEmail, setValaidateEmail] = useState(false);
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
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
  return (
    <Fragment>
      <Typography variant='h2'>Contact Us</Typography>
      <Box mb={5} />
      <TextField
        style={{
          width: '100%',
          marginBottom: theme.spacing(2)
        }}
        error={validateName && !nameIsValid}
        id='outlined-error'
        label={validateName && !nameIsValid ? 'Your name is required' : 'Name'}
        variant='outlined'
        value={name}
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
        error={validateEmail && !emailIsValid}
        id='outlined-error-helper-text'
        label={validateEmail && !emailIsValid ? 'Not a valid email' : 'Email'}
        variant='outlined'
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
        variant='outlined'
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        variant='contained'
        color='primary'
        size='large'
        disabled={!nameIsValid || !emailIsValid}
        style={{
          borderRadius: isMobile ? 4 : 40,
          width: isMobile ? '100%' : 200,
          height: 44
        }}
        onClick={() => {
          if (ok) {
            setOK(false);
            setValaidateName(false);
            setValaidateEmail(false);
            setName('');
            setEmail('');
            setMessage('');
            return;
          }
          if (sending) return;
          setSending(true);
          if (to) {
            clearTimeout(to);
          }
          to = setTimeout(() => {
            setSending(false);
            setOK(true);
          }, 2000);
        }}
      >
        {ok ? 'Got it!' : sending ? <Bounce size={16} color='white' /> : 'Send'}
      </Button>
    </Fragment>
  );
}

export default Contact;
