import React, { useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks';
import MenuToggle from './menu_toggle';
import Navigation from './navigation';

function SideMenu() {
  // State
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Hooks
  const theme = useTheme();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: `circle(29px at ${29 + theme.spacing(6)}px ${
        29 + theme.spacing(4)
      }px)`,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40
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
      <Navigation closeMenu={() => toggleOpen(!isOpen)} />
      <MenuToggle toggle={() => toggleOpen(!isOpen)} />
    </motion.nav>
  );
}

export default SideMenu;
