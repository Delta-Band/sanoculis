import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    padding: `${theme.navHeight * 1.5}px ${theme.pageGutter}vw`,
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    scrollBehavior: 'smooth'
  }
}));

export default function Page({ children, className, getRef }) {
  const styles = useStyles();

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
