import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    position: 'relative',
    '& input': {
      width: '100%',
      height: '100%',
      border: 'none',
      backgroundColor: 'transparent',
      outline: 'none',
      color: '#07003C',
      fontFamily: 'small-caption',
      fontSize: 17,
      letterSpacing: 3
    }
  },
  placeHolder: {
    position: 'absolute',
    top: '50%',
    left: theme.spacing(3),
    pointerEvents: 'none'
  },
  instruction: {
    fontSize: 12
  },
  errorMsg: {
    color: '#C60000',
    fontSize: 12,
    marginTop: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  errorMsg: {
    show: {
      opacity: 1
    },
    hide: {
      opacity: 0
    }
  },
  placeHolder: {
    show: {
      opacity: 1,
      x: 0,
      y: '-50%',
      transition: {
        duration: 0.25
      }
    },
    hide: {
      opacity: 0,
      x: '25%',
      y: '-50%',
      transition: {
        duration: 0.25
      }
    }
  }
};

function Login({ validPasswords, redirectPath, className, placeHolder }) {
  const classes = useStyles();
  const [errMsg, setErrMsg] = useState('hide');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    setPassword(window.localStorage.getItem('password') || '');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('password', password);
    if (validPasswords.includes(password)) {
      router.push(redirectPath);
    } else if (password.length === 5) {
      setErrMsg('show');
    } else {
      setErrMsg('hide');
    }
  }, [password]);

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <Fragment>
      <div className={cx(classes.root, className)}>
        <input
          type='password'
          maxLength='5'
          value={password}
          onChange={updatePassword}
        />
        <motion.div
          variants={MOTION_VARIANTS.placeHolder}
          iniitial='show'
          animate={password.length > 0 ? 'hide' : 'show'}
          className={classes.placeHolder}
        >
          <Typography className={classes.instruction}>{placeHolder}</Typography>
        </motion.div>
      </div>
      <motion.div variants={MOTION_VARIANTS.errorMsg} animate={errMsg}>
        <Typography className={classes.errorMsg}>
          PASSWORD IS INCORRECT
        </Typography>
      </motion.div>
    </Fragment>
  );
}

Login.proptypes = {
  validPasswords: PropTypes.arrayOf(PropTypes.string).isRequired,
  redirectPath: PropTypes.string.isRequired,
  className: PropTypes.object
};

export default Login;
