import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, Link as MuiLink } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Download as DownloadIcon } from '@styled-icons/octicons/Download';
import { Delta2ColLayout } from '../shared';

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
      width: '100%',
      left: -40,
      top: -100
    },
    [theme.breakpoints.up('md')]: {
      width: '110%',
      left: -40,
      top: -80
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      left: -40,
      top: -80
    },
    [theme.breakpoints.up('xl')]: {
      width: '110%',
      left: -40,
      top: -105
    }
  }
}));

export default function SpecSection({ artClass, homePage }) {
  const theme = useTheme();
  const classes = useStyles();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  const upXL = useMediaQuery(theme.breakpoints.up('xl'));

  return (
    <Delta2ColLayout
      paddingTop={theme.spacing(upXL ? 1 : 0)}
      paddingBottom={theme.spacing(upXL ? 0 : upMD ? -0.2 : 0)}
      extendTopWith={
        <img
          src='images/white_wave.png'
          style={{
            width: '100%',
            transform: 'translateY(50%) scaleY(-1)',
            position: 'relative',
            zIndex: 1
          }}
        />
      }
      background={theme.palette.primary.main}
      art={
        <Box className={artClass}>
          <img src='images/blob.png' className={classes.blob} />
          <img src='images/device.png' className={classes.device} />
        </Box>
      }
      title={homePage.specTitle}
      titleColor='#FFF'
      content={[
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
