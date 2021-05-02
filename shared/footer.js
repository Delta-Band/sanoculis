import React from 'react';
import { Grid, Typography, Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';
import cx from 'classnames';
import { LinkedinWithCircle as LinkedInIcon } from '@styled-icons/entypo-social/LinkedinWithCircle';
import { makeStyles } from '@material-ui/core/styles';
import MadeByDelta from './delta/delta_made_by';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: theme.palette.primary.dark,
    padding: theme.spacing(5)
  },
  whiteTxt: {
    color: '#FFF',
    padding: '5px 0',
    [theme.breakpoints.up('xs')]: {
      padding: '10px 0'
    }
  },
  blueTxt: {
    color: theme.palette.primary.main,
    padding: '5px 0',
    [theme.breakpoints.up('xs')]: {
      padding: '10px 0'
    }
  },
  logo: {
    height: 28,
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(1.5)
  },
  verticalSpacing: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('xs')]: {
      marginBottom: theme.spacing(1)
    }
  },
  sectionSpacing: {
    marginBottom: theme.spacing(5)
  },
  link: {
    textDecoration: 'none',
    '&:focus': {
      textDecoration: 'none'
    }
  },
  linkedIn: {
    marginTop: theme.spacing(2),
    display: 'inline-block'
  },
  tradeMark: {
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center'
    }
  }
}));

// Sub-Components
function Learn() {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} className={classes.sectionSpacing}>
      <Typography
        variant='h3'
        className={cx(classes.whiteTxt, classes.verticalSpacing)}
      >
        Learn
      </Typography>
      <Link href='/vision'>
        <a>
          <Typography className={classes.blueTxt}>OUR VISION</Typography>
        </a>
      </Link>
      <Link href='/about'>
        <a>
          <Typography className={classes.blueTxt}>
            INTERVENTIONAL GLAUCOMA
          </Typography>
        </a>
      </Link>
      <Link href='/clinical'>
        <a>
          <Typography className={classes.blueTxt}>
            CLINICAL TRIAL DATA
          </Typography>
        </a>
      </Link>
    </Grid>
  );
}

function Resources({ specPDF, privacyPolicy }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} className={classes.sectionSpacing}>
      <Typography
        variant='h3'
        className={cx(classes.whiteTxt, classes.verticalSpacing)}
      >
        Resources
      </Typography>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={specPDF}
        className={classes.link}
      >
        <Typography className={classes.whiteTxt}>
          TECHNICAL SPECIFICATIONS
        </Typography>
      </MuiLink>
      <Link href='/login'>
        <a>
          <Typography className={classes.whiteTxt}>
            DISTRIBUTORS LOGIN
          </Typography>
        </a>
      </Link>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={privacyPolicy}
        className={classes.link}
      >
        <Typography className={classes.whiteTxt}>
          PRIVACY POLICY & TERMS
        </Typography>
      </MuiLink>
    </Grid>
  );
}

function ContactInfo({ footerData }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4} className={classes.sectionSpacing}>
      {/* <img src='/sanoculis_logo.svg' className={cx(classes.logo)} /> */}
      <Typography
        variant='h3'
        className={cx(classes.whiteTxt, classes.verticalSpacing)}
      >
        Company
      </Typography>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={`mailto:${footerData.email}`}
        className={classes.link}
      >
        <Typography className={classes.whiteTxt}>{footerData.email}</Typography>
      </MuiLink>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={`tel:${footerData.phone}`}
        className={classes.link}
      >
        <Typography className={classes.whiteTxt}>{footerData.phone}</Typography>
      </MuiLink>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={footerData.gmap}
        className={classes.link}
      >
        <Typography className={classes.whiteTxt}>
          {footerData.address}
        </Typography>
      </MuiLink>
      <MuiLink
        target='_blank'
        rel='noreferrer'
        href={footerData.linkedin}
        className={cx(classes.link, classes.linkedIn)}
      >
        <LinkedInIcon size={42} />
      </MuiLink>
    </Grid>
  );
}

function Footer({ specPDF, footerData }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Learn />
      <Resources specPDF={specPDF} privacyPolicy={footerData.privacyPolicy} />
      <ContactInfo footerData={footerData} />
      <Grid item xs={12}>
        <Typography
          className={cx(classes.whiteTxt, classes.tradeMark)}
          style={{ opacity: 0.35 }}
        >
          {footerData.tradeMark}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <MadeByDelta />
      </Grid>
    </Grid>
  );
}

export default Footer;
