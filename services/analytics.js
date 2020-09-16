import ReactGA from 'react-ga';

const isProd = () => {
  return Boolean(window.location.host.match(/^sanoculis.com/));
};

const init = (trackingId) => {
  console.log('GA init');
  // const urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get('id');
  ReactGA.initialize(trackingId, {
    debug: false,
    titleCase: false
    // gaOptions: {
    //   userId: id,
    // },
  });
};

const logPageView = (page) => {
  console.log(`Logging pageview for ${page}`);
  // ReactGA.set({ page: window.location.pathname });
  if (isProd()) {
    ReactGA.pageview(page);
  }
};

//
// const logEvent = (category = '', action = '', ) => {
//   if (category && action) {
//     ReactGA.event({
//       category,
//       action
//     });
//   }
// };

const logEvent = (category, action) => {
  console.log(`Logging event: ${category}: ${action}`);
  if (isProd()) {
    ReactGA.event({
      category,
      action
    });
  }
};

// const contactUs = () => {
//   console.log('Logging clicked on Send');
//   ReactGA.event({
//     category: isDev() ? 'test' : 'user',
//     action: 'clicked contact us',
//   });
// };

// const send = (viewer) => {
//   if (viewer) {
//     console.log(`Logging send by: ${viewer}`);
//     ReactGA.event({
//       category: isDev() ? 'test' : 'user',
//       action: 'clicked on send',
//     });
//   }
// };

// const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({
//       description,
//       fatal
//     });
//   }
// };

export default {
  init,
  logEvent,
  logPageView
};
