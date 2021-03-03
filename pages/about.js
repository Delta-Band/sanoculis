import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <Head>
        <title>Sanoculis About</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
    </div>
  );
}
