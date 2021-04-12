import React, { Fragment } from 'react';
import { Box, Button, ButtonGroup } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { MenuAlt4 as Menu } from '@styled-icons/heroicons-outline/MenuAlt4';
// import { CloseOutline as MenuClose } from '@styled-icons/evaicons-outline/CloseOutline';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import { SideMenu } from '../shared';
import '../styles/globals.css';
import theme from '../theme';

function NavBar() {
  // Hooks
  const theme = useTheme();
  const router = useRouter();
  const isPortrait = useMediaQuery('(max-width:1355px)');

  function NavBarLink({ children, href }) {
    return (
      <Link href={href}>
        <a
          style={{
            width: '100%',
            padding: '6px 1.5vw'
          }}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Box
      position='fixed'
      width='100vw'
      p={isPortrait ? 5 : 6}
      pb={0}
      pt={isPortrait ? 3 : 4}
      display='flex'
      justifyContent='space-between'
      flexDirection='row'
      alignItems='center'
      zIndex={10}
    >
      <Link href='/'>
        <a>
          <img src='/sanoculis_logo.svg' />
        </a>
      </Link>
      {isPortrait ? (
        <Fragment>
          <Box ml={4} />
          <SideMenu />
        </Fragment>
      ) : (
        <ButtonGroup
          disableElevation
          orientation='vertical'
          color='primary'
          aria-label='text primary button group'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(2px)',
            position: 'fixed',
            top: theme.spacing(3),
            right: theme.spacing(4)
          }}
        >
          <Button
            variant={router.pathname === '/about' ? 'contained' : 'outlined'}
            style={{
              padding: 0
            }}
          >
            <NavBarLink href='/about'>About</NavBarLink>
          </Button>
          <Button
            variant={router.pathname === '/clinical' ? 'contained' : 'outlined'}
            style={{
              padding: 0
            }}
          >
            <NavBarLink href='/clinical'>Clinical</NavBarLink>
          </Button>
          <Button
            variant={
              router.pathname === '/distributors' ? 'contained' : 'outlined'
            }
            style={{
              padding: 0
            }}
          >
            <NavBarLink href='/distributors'>Distributors</NavBarLink>
          </Button>
          <Button
            variant={router.pathname === '/contact' ? 'contained' : 'outlined'}
            style={{
              padding: 0
            }}
          >
            <NavBarLink href='/contact'>CONTACT</NavBarLink>
          </Button>
        </ButtonGroup>
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
