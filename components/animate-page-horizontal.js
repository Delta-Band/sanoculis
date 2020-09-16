import React from 'react';
import { motion } from 'framer-motion';

const AnimatePageHorizontal = ({ children, className, setRef }) => {
  return (
    <motion.div
      ref={setRef}
      className={className}
      initial='exit'
      animate='enter'
      exit='exit'
      variants={{
        exit: {
          opacity: 0,
          x: 100,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        },
        enter: {
          x: 0,
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
};

export default AnimatePageHorizontal;
