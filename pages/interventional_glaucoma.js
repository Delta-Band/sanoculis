import React, { Fragment } from 'react';
import Head from '../head';
import reactor from '../reactor';
import { Hero, LearnMore, Footer } from '../components/shared';
import { TextBlocks, Cookies } from '../components/delta';

export async function getServerSideProps(context) {
  // console.log(context.req.headers['user-agent']);
  // const isMobile = Boolean(
  //   context.req.headers['user-agent'].match(
  //     /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
  //   )
  // );
  reactor.init();
  const cookies = await reactor.getDoc('jD2rPC57vkYGWT7rvcdO');
  const pageData = await reactor.getDoc('tr6L3TlA067DRHaczE2i');
  const footerData = await reactor.getDoc('0q0P18TgtXrfMIStLToh');
  const homeData = await reactor.getDoc('unwyUBZmIqLoM5SDnwxo');
  return {
    props: {
      pageData,
      footerData,
      homeData,
      cookies
    }
  };
}

export default function InterventionalGlaucoma({
  pageData,
  footerData,
  homeData,
  cookies
}) {
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
      <Footer specPDF={homeData.specPdf} footerData={footerData} />
      <Cookies text={cookies.statement} privacyPolicyUrl={cookies.pdf} />
    </Fragment>
  );
}
