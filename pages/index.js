import React, { useRef, useState } from 'react';
import { Page, Section } from '../components';
import { SectionIndicator } from '../shared';
import { Registered } from '@styled-icons/remix-line/Registered';
import styles from './styles.scss';

export default function Home() {
  const pageRef = useRef();
  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <Page getRef={pageRef}>
      <SectionIndicator
        count={3}
        current={currentSection}
        scrollContainer={pageRef}
        refs={[section1, section2, section3]}
      />
      <Section
        sectionRef={section1}
        type='art-content'
        art={
          <img src='https://vignette.wikia.nocookie.net/muppet/images/0/02/ElectricMayhemWithClifford.jpg/revision/latest?cb=20150725153832' />
          // <div>Art</div>
        }
        header={
          <div>
            MIMS
            <Registered className={styles.registered} />
          </div>
        }
        superSizedHeader
        body={<div>Section 1 Body</div>}
        footer={<div>Section 1 footer</div>}
        pageRef={pageRef}
        onTarget={(onTarget) => {
          if (onTarget) {
            setCurrentSection(0);
          }
        }}
      />
      <Section
        sectionRef={section2}
        type='art-content'
        art={
          <img src='https://i.pinimg.com/originals/6a/ee/85/6aee85a249cc58978a98bb8876181b30.png' />
          // <div>Art</div>
        }
        header='Section 2 Header'
        body={<div>Section 2 Body</div>}
        footer={<div>Section 2 footer</div>}
        pageRef={pageRef}
        onTarget={(onTarget) => {
          setCurrentSection(onTarget ? 1 : 0);
        }}
      />
      <Section
        sectionRef={section3}
        type='art-content'
        art={
          <img src='https://i.pinimg.com/originals/a2/f2/0c/a2f20c4171c87f9fe3aa8bbd43443ba6.jpg' />
          // <div>Art</div>
        }
        header='Section 3 Header'
        body={<div>Section 3 Body</div>}
        footer={<div>Section 3 footer</div>}
        pageRef={pageRef}
        onTarget={(onTarget) => {
          setCurrentSection(onTarget ? 2 : 1);
        }}
      />
    </Page>
  );
}
