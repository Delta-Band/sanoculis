import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
  useTheme
} from '@material-ui/core/styles';
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
  transition: '1s cubic-bezier(.21,.47,.49,.92)'
});

function NavBar() {
  const [fadeInItems, setFadeInItems] = useState(false);

  const theme = useTheme();
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
      p={6}
      pb={0}
      pt={4}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
    >
      <img src='/sanoculis_logo.svg' />
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
