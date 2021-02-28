import * as React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './menu_item';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const items = ['about', 'clinical', 'distributors', 'contact'];

function Navigation({ closeMenu, isOpen }) {
  return (
    <motion.ul
      variants={variants}
      style={{
        margin: 0,
        padding: '25px',
        paddingTop: '140px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '230px',
        pointerEvents: isOpen ? 'all' : 'none'
      }}
    >
      {items.map((i) => (
        <MenuItem closeMenu={closeMenu} key={i} text={i} />
      ))}
    </motion.ul>
  );
}

export default Navigation;
