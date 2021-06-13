import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '88vw',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: '47vw'
    },
    [theme.breakpoints.up('md')]: {
      height: '37vw'
    },
    [theme.breakpoints.up('lg')]: {
      height: '37vw'
    },
    [theme.breakpoints.up('xl')]: {
      height: '40vw'
    }
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  btn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.palette.primary.dark
  }
}));

export default function LearnMore({ imageSrc, btnTxt }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={imageSrc} className={classes.img} />
      <Link href='/vision'>
        <a>
          <Button
            variant='contained'
            className={classes.btn}
            size='large'
            color='primary'
            disableElevation
          >
            {btnTxt}
          </Button>
        </a>
      </Link>
    </div>
  );
}
