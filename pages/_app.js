import React, { useEffect } from 'react';
import { ReadyProvider } from '../context/ready.context';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import { AppBar } from '../components';
import '../styles/globals.css';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('G-G6D797E340', {
      debug: true
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReadyProvider>
        <AppBar
          menuItems={[
            { label: 'Home', linkTo: '' },
            { label: 'Our Vision', linkTo: 'vision' },
            {
              label: 'Interventional Glaucoma',
              linkTo: 'interventional_glaucoma'
            },
            { label: 'Clinical Trial Data', linkTo: 'clinical' },
            // { label: 'Technical Specs', linkTo: 'specs' },
            { label: 'Distributors Login', linkTo: 'login' },
            { label: 'Step by Step', linkTo: 'step-by-step' }
          ]}
          logo='/sanoculis_logo.svg'
        />
        <Component {...pageProps} />
      </ReadyProvider>
    </ThemeProvider>
  );
}

export default MyApp;
