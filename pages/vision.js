import React, { Fragment } from 'react';
import Head from '../head';
import reactor from '../reactor';
import { Hero } from '../components/vision';

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const vision = await reactor.getDoc('7l4t8f1VUXEKmgtyeI3x');
  return {
    props: {
      vision
    }
  };
}

export default function Vision({ vision }) {
  return (
    <Fragment>
      <Head title='MIMS Vision' />
      <Hero
        imageSrc={vision.heroImg}
        imageSrcMobile={vision.heroImgMobile}
        title={vision.heroTitle}
        description={vision.heroDescription}
      />
    </Fragment>
  );
}
