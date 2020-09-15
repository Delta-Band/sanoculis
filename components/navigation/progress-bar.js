import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import styles from './styles.scss';
import PLAY_SET from '../video/play-set';

const FRAGMENTS = PLAY_SET.length + 2;

const ProgressBar = () => {
  const [width, setWidth] = useState(100);
  const router = useRouter();

  useEffect(() => {
    const route = router.route;
    const step = router.query.step;
    if (route === '/') {
      if (step) {
        const currentSequenceIndex = PLAY_SET.findIndex(
          (item) => item.name === step
        );
        setWidth(100 - (100 / FRAGMENTS) * (currentSequenceIndex + 1));
      } else {
        setWidth(100);
      }
    } else if (route.match(/^\/contact-us/)) {
      setWidth(100 - (100 / FRAGMENTS) * (FRAGMENTS - 1));
    } else if (route === '/thank-you') {
      setWidth(0);
    }
  }, [router.route, router.query.step]);

  return (
    <div className={styles.progressBar}>
      <div
        className={cx(styles.progress)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default ProgressBar;
