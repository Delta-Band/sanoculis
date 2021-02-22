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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
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
    fontFamily: ['Rubik'].join(','),
    fontSize: 20,
    allVariants: {
      color: '#06003B'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Rubik']
      }
    }
  },
  transition: '1s cubic-bezier(.21,.47,.49,.92)',
  mobileGutter: '2vw',
  fastTransition: '0.2s cubic-bezier(.21,.47,.49,.92)'
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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
