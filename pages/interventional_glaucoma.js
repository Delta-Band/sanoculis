import React, { Fragment } from 'react';
import Head from '../head';
import reactor from '../reactor';
import { Hero, TextBlocks, LearnMore } from '../components/shared';

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const pageData = await reactor.getDoc('tr6L3TlA067DRHaczE2i');
  return {
    props: {
      pageData
    }
  };
}

export default function InterventionalGlaucoma({ pageData }) {
  return (
    <Fragment>
      <Head title='MIMS - Interventional Glaucoma' />
      <Hero
        imageSrc={pageData.heroImg}
        imageSrcMobile={pageData.heroImgMobile}
        title={pageData.heroTitle}
        description={pageData.heroDescription}
        mobileHeight={400}
      />
      <TextBlocks
        titleVariant='h1'
        blocks={[
          {
            title: pageData.textBlock1Title,
            txt: pageData.textBlock1Description
          },
          {
            title: pageData.textBlock2Title,
            txt: pageData.textBlock2Description
          },
          {
            title: pageData.textBlock3Title,
            txt: pageData.textBlock3Description
          },
          {
            title: pageData.textBlock4Title,
            txt: pageData.textBlock4Description
          },
          {
            title: pageData.textBlock5Title,
            txt: pageData.textBlock5Description
          }
        ]}
      />
      <LearnMore
        imageSrc={pageData.learnMorePic}
        btnTxt={pageData.learnMoreBtnTxt}
      />
    </Fragment>
  );
}
