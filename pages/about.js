import React, { Fragment } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { ProfileCarousel } from '../shared';
import Head from 'next/head';

export async function getServerSideProps(context) {
  console.log(context.req.headers['user-agent']);
  const isMobile = Boolean(
    context.req.headers['user-agent'].match(
      /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
    )
  );
  return {
    props: {
      isMobile,
      leadership: [
        {
          id: 1,
          name: 'Samuel The Giant',
          title: 'Keeper of the Garden',
          pic:
            'https://s2.best-wallpaper.net/wallpaper/iphone/1609/The-Big-Friendly-Giant-2016_iphone_320x480.jpg'
        },
        {
          id: 2,
          name: 'Henry Hizenberg',
          title: 'Inovation Specialist',
          pic:
            'https://previews.123rf.com/images/remains/remains1411/remains141100322/33838138-surprised-crazy-scientist-with-test-tube.jpg'
        },
        {
          id: 3,
          name: 'Pikatch',
          title: 'Test Anminal',
          pic:
            'https://ae01.alicdn.com/kf/H0796eedf43804726819970bb8de51be5Q/4PCS-LOT-Pokemon-Pikachu-Classic-Toys-Sticker-Fashion-Personality-Cartoon-Laptop-Body-Background-Decoration-Sticker.jpg'
        },
        {
          id: 4,
          name: 'Grandma',
          title: 'Snacks Manager',
          pic:
            'https://previews.123rf.com/images/stockakia/stockakia1708/stockakia170800015/84749048-grandma-cooking.jpg'
        }
      ]
    } // will be passed to the page component as props
  };
}

function GridItem({ children }) {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      style={{
        marginBottom: theme.mobileGutter,
        paddingLeft: theme.mobileGutter,
        paddingRight: theme.mobileGutter
      }}
    >
      {children}
    </Grid>
  );
}

export default function About({ isMobile, leadership }) {
  console.log(`isMobile: ${isMobile}`);
  console.log(`leadership: ${leadership}`);
  // Hooks
  const theme = useTheme();

  return (
    <Fragment>
      <Head>
        <title>About MIMS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        container
        spacing={0}
        style={{
          paddingTop: theme.spacing(17)
        }}
      >
        <GridItem>
          <Typography variant='h2'>Our Vision</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            Sanoculis LTD. develops innovative medical devices and solutions in
            Glaucoma treatment. We provide a safe, effective and simple way to
            perform procedures which may become the standard for treating
            Glaucoma and combined Glaucoma Cataract surgeries. Sanoculis was
            established in 2012 and is backed by private and institutional
            investors.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Sanoculis Leadership Team</Typography>
        </GridItem>
        <Grid item xs={12}>
          <ProfileCarousel isMobile={isMobile} profiles={leadership} />
          <Box mb={40} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
