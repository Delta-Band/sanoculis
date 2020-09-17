import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import styles from './styles.scss';

export default function Page({ children, className, getRef }) {
  return (
    <motion.div
      ref={getRef}
      className={cx(className, styles.page)}
      initial='exit'
      animate='enter'
      exit='exit'
      id='page'
      variants={{
        exit: {
          y: 100,
          opacity: 0,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        },
        enter: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
