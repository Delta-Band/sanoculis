import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10)
  }
}));

export default function Docs() {
  const classes = useStyles();

  return <div className={classes.root}>Docs</div>;
}
