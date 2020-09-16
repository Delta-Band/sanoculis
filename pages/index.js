import React from 'react';
import { Page, Section } from '../components';

export default function Home() {
  return (
    <Page>
      <Section
        type='art-content'
        art={
          <img src='https://vignette.wikia.nocookie.net/muppet/images/0/02/ElectricMayhemWithClifford.jpg/revision/latest?cb=20150725153832' />
          // <div>Art</div>
        }
        header='Section 1 Header'
        body={<div>Section 1 Body</div>}
        footer={<div>Section 1 footer</div>}
      />
      <Section
        type='art-content'
        art={
          <img src='https://i.pinimg.com/originals/6a/ee/85/6aee85a249cc58978a98bb8876181b30.png' />
          // <div>Art</div>
        }
        header='Section 2 Header'
        body={<div>Section 2 Body</div>}
        footer={<div>Section 2 footer</div>}
      />
      <Section
        type='art-content'
        art={
          <img src='https://i.pinimg.com/originals/a2/f2/0c/a2f20c4171c87f9fe3aa8bbd43443ba6.jpg' />
          // <div>Art</div>
        }
        header='Section 3 Header'
        body={<div>Section 3 Body</div>}
        footer={<div>Section 3 footer</div>}
      />
    </Page>
  );
}
