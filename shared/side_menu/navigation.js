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

const itemIds = [0, 1, 2, 3, 4];

function Navigation() {
  return (
    <motion.ul
      variants={variants}
      style={{
        margin: 0,
        padding: '25px',
        paddingTop: '100px',
        position: 'absolute',
        top: 0,
        width: '230px'
      }}
    >
      {itemIds.map((i) => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.ul>
  );
}

export default Navigation;
