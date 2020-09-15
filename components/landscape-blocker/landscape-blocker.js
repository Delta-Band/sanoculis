import React from 'react';
import { ReactSVG } from 'react-svg';
import { createPortal } from 'react-dom';
import styles from './styles.scss';

const Index = () => {
  return createPortal(
    <div className={styles.landscapeBlocker}>
      <div className={styles.fakeNav}>
        <ReactSVG src="/images/logo.svg" className={styles.logoSVG} />
      </div>
      Please rotate your device back to portrait mode
    </div>,
    document.body
  );
};

export default Index;
