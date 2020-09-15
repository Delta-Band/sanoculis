import React from 'react';
import { motion } from 'framer-motion';

const AnimatePageVerical = ({ children, className, setRef }) => {
  return (
    <motion.div
      ref={setRef}
      className={className}
      initial='exit'
      animate='enter'
      exit='exit'
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
};

export default AnimatePageVerical;
