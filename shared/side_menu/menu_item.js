import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@material-ui/core';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const MenuItem = ({ text, closeMenu }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        listStyle: 'none',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <Button onClick={closeMenu}>{text}</Button>
    </motion.li>
  );
};
