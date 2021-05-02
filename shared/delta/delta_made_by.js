import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cx from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Link as MuiLink, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 0',
    color: '#FFF',
    marginTop: theme.spacing(5),
    maxWidth: 490,
    margin: '0 auto',
    [theme.breakpoints.up('xs')]: {
      padding: 0
    }
  },
  textStyle: {
    fontFamily: 'Rubik',
    fontStyle: 'italic',
    fontWeight: 900
  },
  outlinedBtn: {
    borderRadius: 40,
    borderWidth: 2
  },
  spacer: {
    marginBottom: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
    '&:visited': {
      textDecoration: 'none'
    },
    '&:focus': {
      textDecoration: 'none'
    }
  },
  opacity: {
    opacity: 0.5
  }
}));

function GridElement({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const upXS = useMediaQuery(theme.breakpoints.up('xs'));
  return (
    <Grid
      item
      xs={12}
      sm={6}
      className={cx(classes.textStyle)}
      container
      justify={upXS ? 'flex-start' : 'space-between'}
      alignItems='center'
    >
      {children}
    </Grid>
  );
}

export default function MadeByDelta() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <GridElement>
        <Grid item className={classes.opacity}>
          Made By{' '}
        </Grid>
        <Grid item>
          <MuiLink
            target='_blank'
            rel='noreferrer'
            href='https://delta.band'
            className={classes.link}
          >
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              disableElevation
              className={classes.outlinedBtn}
            >
              <span className={classes.textStyle}>DELTA</span>
            </Button>
          </MuiLink>
        </Grid>
      </GridElement>
      <GridElement>
        <Grid item className={classes.opacity}>
          Guided by{' '}
        </Grid>
        <Grid item>
          <MuiLink
            target='_blank'
            rel='noreferrer'
            href='https://rechter.io'
            className={classes.link}
          >
            <Button
              variant='outlined'
              color='secondary'
              size='large'
              disableElevation
              className={classes.outlinedBtn}
            >
              <span className={classes.textStyle}>Rechter.</span>
            </Button>
          </MuiLink>
        </Grid>
      </GridElement>
    </Grid>
  );
}
