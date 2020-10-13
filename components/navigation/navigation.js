import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import styles from './styles.scss';
import Footer from '../footer/footer';

const useStyles = makeStyles((theme) => ({
  navBar: {
    height: theme.navHeight,
    boxSizing: 'border-box',
    color: 'white',
    position: 'fixed',
    top: '0',
    left: '0',
    padding: '0 2.5vw',
    zIndex: '1'
  },
  logo: {
    width: '12vw'
    // padding: '1vw'
  },
  navBtn: {
    pdding: '0 1.25vw'
  }
}));

const Navigation = () => {
  const router = useRouter();
  const styles = useStyles();

  return (
    <Fragment>
      <Grid
        className={styles.navBar}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item xs={3}>
          <Button
            color='primary'
            disableRipple
            // className={styles.logo}
            onClick={() => {
              router.push('/', undefined, { shallow: true });
            }}
          >
            <img src='/images/logo.svg' className={styles.logo} />
          </Button>
        </Grid>
        <Grid item xs='auto'>
          <Grid
            direction='row'
            justify='flex-end'
            alignItems='center'
            container
          >
            {['about', 'clinical', 'partners'].map((item) => (
              <Grid item xs='auto' key={item}>
                <Button onClick={console.log} className={styles.navBtn}>
                  {item}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Fragment>
  );
};

export default Navigation;
