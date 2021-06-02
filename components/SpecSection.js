import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Link as MuiLink } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Download as DownloadIcon } from '@styled-icons/octicons/Download';
import { SectionLayout } from '../components/delta';

const useStyles = makeStyles((theme) => ({
  blob: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '100%'
    }
  },
  device: {
    width: '110%',
    position: 'absolute',
    top: -88,
    left: -25,
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      left: '15%',
      top: -90
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      left: '2.5%',
      top: -80
    },
    [theme.breakpoints.up('lg')]: {
      width: '35%',
      left: '2%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '42%',
      left: '-1.5%',
      top: -120
    }
  },
  art: {
    width: '80vw',
    height: '80vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      height: '50vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      height: '40vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600
      // marginRight: theme.spacing(10)
    }
  }
}));

export default function SpecSection({ homePage }) {
  const theme = useTheme();
  const classes = useStyles();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  const upXL = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <SectionLayout
      paddingTop={theme.spacing(upXL ? 1 : 0)}
      paddingBottom={theme.spacing(upXL ? 0 : upMD ? -0.2 : 0)}
      extendTopWith={
        <img
          src='images/white_wave.png'
          style={{
            width: '100%',
            transform: 'translateY(-50%) scaleY(-1)',
            position: 'absolute',
            zIndex: 1,
            top: 0
          }}
        />
      }
      background={theme.palette.primary.main}
      art={
        <div className={classes.art}>
          <img src='images/blob.png' className={classes.blob} />
          <img src='images/device.png' className={classes.device} />
        </div>
      }
      content={[
        <Typography key={0} variant='h2' style={{ color: '#FFF' }}>
          {homePage.specTitle}
        </Typography>,
        <Typography key={1} style={{ color: '#FFF' }}>
          {homePage.specDescription}
        </Typography>,
        <img key={2} src='images/israel_ce_stamp.png' />,
        <MuiLink
          key={3}
          target='_blank'
          rel='noreferrer'
          href={homePage.specPdf}
          style={{
            textDecoration: 'none'
          }}
        >
          <Button
            variant='contained'
            disableElevation
            color='secondary'
            size='large'
          >
            {homePage.specBtnTxt}
            <Box ml={2}>
              <DownloadIcon size={22} />
            </Box>
          </Button>
        </MuiLink>
      ]}
    />
  );
}
