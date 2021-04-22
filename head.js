import React from 'react';
import NextHead from 'next/head';

function Head({ title }) {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
      {/* <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' /> */}
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap'
        rel='stylesheet'
      />
      <link
        rel='preload'
        href='/fonts/Domaine-Bold.otf'
        as='font'
        crossOrigin=''
      />
    </NextHead>
  );
}

export default Head;
