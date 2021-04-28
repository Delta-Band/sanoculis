import React from 'react';
import { ReadyProvider } from '../context/ready.context';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar } from '../components';
import '../styles/globals.css';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ReadyProvider>
        <AppBar
          menuItems={[
            { label: 'Home', linkTo: '' },
            { label: 'Our Vision', linkTo: 'vision' },
            { label: 'Why It Helps', linkTo: 'about' },
            { label: 'Clinical Trial Data', linkTo: 'clinical' },
            { label: 'Technical Specs', linkTo: 'specs' },
            { label: 'Distributors Login', linkTo: 'login' }
          ]}
          logo='/sanoculis_logo.svg'
        />
        <Component {...pageProps} />
      </ReadyProvider>
    </ThemeProvider>
  );
}

export default MyApp;
