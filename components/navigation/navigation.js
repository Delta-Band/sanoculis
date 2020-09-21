import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import { ReactSVG } from 'react-svg';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';
import Footer from '../footer/footer';

const Navigation = () => {
  const router = useRouter();

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
            className={styles.logo}
            onClick={() => {
              router.push('/', undefined, { shallow: true });
            }}
          >
            <ReactSVG src='/images/logo.svg' className={styles.logoSVG} />
          </Button>
        </Grid>
        {/* <Grid item xs='auto'>
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
        </Grid> */}
      </Grid>
      <Footer />
    </Fragment>
  );
};

export default Navigation;
