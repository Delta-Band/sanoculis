import React, { useEffect, useState, Fragment } from 'react';
import { Box, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { MenuAlt4 as Menu } from '@styled-icons/heroicons-outline/MenuAlt4';
// import { CloseOutline as MenuClose } from '@styled-icons/evaicons-outline/CloseOutline';
import {
  createMuiTheme,
  ThemeProvider,
  useTheme
} from '@material-ui/core/styles';
import { SideMenu } from '../shared';
import '../styles/globals.css';

const defaultTheme = createMuiTheme();
const {
  breakpoints,
  typography: { pxToRem }
} = defaultTheme;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#5668FF',
      dark: '#07003C',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: ['Rubik', 'Domaine'].join(','),
    lineHeight: '1.8em',
    allVariants: {
      color: '#06003B'
    },
    body1: {
      fontSize: 20,
      [breakpoints.down('xs')]: {
        fontSize: pxToRem(16)
      }
    },
    p: {
      padding: 0
    },
    h2: {
      fontSize: '42px',
      fontFamily: 'Domaine',
      fontWeight: 'bold',
      [breakpoints.down('xs')]: {
        fontSize: '28px'
      }
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Rubik']
      }
    },
    MuiLink: {
      underlineHover: {
        textDecoration: 'underline'
      }
    },
    MuiButton: {
      label: {
        fontSize: 16,
        transform: 'translateY(1px)'
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    MuiRadio: {
      root: {
        color: 'white'
      },
      colorPrimary: {
        color: 'white !important'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: 'white'
      }
    }
  },
  transition: '1s cubic-bezier(.21,.47,.49,.92)',
  mobileGutter: '6vw',
  fastTransition: '0.4s cubic-bezier(.21,.47,.49,.92)'
});

function NavBar() {
  // State
  const [fadeInItems, setFadeInItems] = useState(false);

  // Hooks
  const theme = useTheme();
  const isPortrait = useMediaQuery('(max-width:1355px)');

  // Effects
  useEffect(() => {
    setTimeout(() => {
      setFadeInItems(true);
    }, 1000);
  }, []);

  const transitionDef = {
    transition: theme.transition,
    opacity: fadeInItems ? 1 : 0,
    transform: `translateY(${fadeInItems ? 0 : '50%'})`
  };

  return (
    <Box
      position='fixed'
      width='100vw'
      p={isPortrait ? 3 : 6}
      pb={0}
      pt={isPortrait ? 3 : 4}
      display='flex'
      justifyContent='space-between'
      flexDirection='row'
      alignItems='center'
      zIndex={10}
    >
      <img src='/sanoculis_logo.svg' />
      {isPortrait ? (
        <Fragment>
          <Box ml={4} />
          <SideMenu />
        </Fragment>
      ) : (
        <Box display='flex'>
          <Button
            style={{
              ...transitionDef
            }}
          >
            About
          </Button>
          <Box ml='2vw' />
          <Button
            style={{
              ...transitionDef,
              transitionDuration: '1.5s'
            }}
          >
            Clinical
          </Button>
          <Box ml='2vw' />
          <Button
            style={{
              ...transitionDef,
              transitionDuration: '2s'
            }}
          >
            Distributors
          </Button>
          <Box ml='2vw' />
          <Button
            style={{
              ...transitionDef,
              transitionDuration: '2.5s'
            }}
          >
            CONTACT
          </Button>
        </Box>
      )}
    </Box>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div
        style={{
          background: 'rgba(241,245,248,1)'
        }}
      >
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
