import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from '../shared';
import { wrapper } from '../store/store';
import reactor from '../reactor-utils';
import { cms, helmet } from '../store';
// import { GA } from '../services';

reactor.init();

const getCMSData = async (dispatch) => {
  try {
    const navigationCMS = await reactor.getPage('BYnmRg3UKC2LKLyLPfB5');
    const contactCMS = await reactor.getPage('pVIXGZJstHCcy5y9lShf');
    const footerCMS = await reactor.getPage('iBnQ41ARhlS6B8AKdhq0');
    dispatch(cms.actions.storeNavigationData(navigationCMS));
    dispatch(cms.actions.storeContactnData(contactCMS));
    dispatch(cms.actions.storeFooterData(footerCMS));
  } catch (err) {
    console.error('failed to connect to reactor!: ', err);
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5668FF'
    },
    secondary: {
      main: '#ffffff'
    }
  },
  pageGutter: 10,
  navHeight: 70,
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  cursorPointer:
    'url("/images/cursor/cursor-pointer.svg") 12 0, auto !important'
});

class MyApp extends App {
  // constructor(props) {
  //   super(props);
  //   GA.init('UA-171800556-1');
  // }

  render() {
    const { Component, pageProps, helmet, router } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Helmet
          title={helmet.tabTitle}
          description={helmet.metaDescription}
          imageForSocial='/images/logo-social-square.png'
        />
        <AnimatePresence>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ThemeProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  console.log('get initial props');
  await getCMSData(ctx.store.dispatch);
  if (ctx.req) {
    // mimic device on server
    // ctx.store.dispatch(device.actions.ssr(ctx.req.headers['user-agent']));
  }
  return {};
};

const mapStateToProps = (state) => ({
  helmet: helmet.selectors.data(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
