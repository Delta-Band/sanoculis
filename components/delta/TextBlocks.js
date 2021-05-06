import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10)
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: '10vw',
      paddingBottom: '10vw',
      width: 1300,
      maxWidth: '80vw',
      margin: '0 auto'
    }
  },
  txtBlock: {
    // marginBottom: theme.spacing(13),
    '&:last-child': {
      marginBottom: 0
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(5)
    },
    [theme.breakpoints.up('xl')]: {
      marginBottom: theme.spacing(10)
    }
  },
  title: {
    marginBottom: theme.spacing(5)
  }
}));

export default function TextBlocks({ titleVariant, blocks = [] }) {
  const classes = useStyles({});
  const theme = useTheme();
  const upXL = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={10}
        direction='row'
        justify='space-between'
        alignItems='flex-start'
      >
        {blocks.map((block, i) => (
          <Grid
            key={block.title}
            item
            xs={12}
            sm={12}
            md={
              i === blocks.length - 1 && blocks.length % 2 === 1
                ? 12
                : upXL
                ? 5
                : 6
            }
            className={classes.txtBlock}
          >
            <Typography variant={titleVariant} className={classes.title}>
              {block.title}
            </Typography>
            <Typography>{block.txt}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
