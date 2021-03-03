import React from 'react';
import NextHead from 'next/head';

function Head({ title }) {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      <link
        rel='preload'
        href='/fonts/Domaine-Bold.ttf'
        as='font'
        crossOrigin=''
      />
    </NextHead>
  );
}

export default Head;
