import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ChevronLeft as Prev } from '@styled-icons/boxicons-regular/ChevronLeft';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { ReactSVG } from 'react-svg';
import { Menu as MenuIcon } from '@styled-icons/entypo/Menu';
import { useWindowSize } from '../../hooks';
import styles from './styles.scss';
import { device, landscapeBlocker } from '../../store';
import Footer from '../footer/footer';
import LandscapeBlocker from '../landscape-blocker/landscape-blocker';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  root: {
    color: 'white'
  }
});

const Navigation = () => {
  const router = useRouter();
  const agent = useSelector(device.selectors.agent);
  const [routeCount, setRouteCount] = useState(0);
  const size = useWindowSize();
  const landscapeBlockerEnabled = useSelector(
    landscapeBlocker.selectors.enabled
  );
  const showLandscapeBlocker =
    landscapeBlockerEnabled &&
    size.orientation === 'landscape' &&
    ['ios', 'android'].includes(agent);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setRouteCount(routeCount + 1);
    });
  }, []);

  function navigateToPrev() {
    router.back();
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Contact Us'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              router.push('/contact-us', undefined, { shallow: true });
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Some Page'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment>
      <div className={styles.navBar}>
        {showLandscapeBlocker ? <LandscapeBlocker /> : null}
        <Button
          disableRipple
          className={styles.prev}
          onClick={navigateToPrev}
          disabled={
            (router.route === '/' && !router.query.step) || routeCount === 0
          }
        >
          <Prev size={42} />
        </Button>
        <Button
          color='primary'
          disableRipple
          className={styles.logo}
          onClick={() => {
            router.push('/', undefined, { shallow: true });
          }}
        >
          <ReactSVG src='/images/logo.svg' className={styles.logoSVG} />
        </Button>
        <React.Fragment key={'right'}>
          <Button color='secondary' onClick={toggleDrawer('right', true)}>
            <MenuIcon size={32} />
          </Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Navigation;
