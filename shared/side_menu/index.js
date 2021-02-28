import React, { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks';
import MenuToggle from './menu_toggle';
import Navigation from './navigation';

function SideMenu() {
  // State
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Hooks
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: 'circle(75% at 0 10vh)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }),
    closed: {
      clipPath: 'circle(0% at 0 0vh)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        variants={sidebar}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100vw',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)'
        }}
      />
      <Navigation closeMenu={() => toggleOpen(!isOpen)} isOpen={isOpen} />
      <MenuToggle toggle={() => toggleOpen(!isOpen)} />
    </motion.nav>
  );
}

export default SideMenu;
