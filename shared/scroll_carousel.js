import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@material-ui/core';
import { debounce } from 'lodash';
import { useViewportScroll, motion, useTransform } from 'framer-motion';

function ScrollCarousel({ itemBuilder, items, windowRange = [0, 1] }) {
  // State
  const [scrollRange, setScrollRange] = useState([0, 0]);
  const [overflow, setOverflow] = useState([0, 0]);

  // Methods
  function init() {
    const containerRect = containerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const docRelativeYlocation =
      containerRect.top + window.pageYOffset - window.innerHeight;
    setOverflow(0 - (contentRect.width - containerRect.width));
    setScrollRange([
      docRelativeYlocation +
        containerRect.height +
        window.innerHeight * windowRange[0],
      docRelativeYlocation +
        containerRect.height +
        window.innerHeight * windowRange[1]
    ]);
  }

  const initDB = debounce(init, 250);

  // Effects
  useEffect(() => {
    setTimeout(init, 1000);
    window.addEventListener('resize', initDB);
    return () => {
      window.removeEventListener('resize', initDB);
    };
  }, []);

  // Hooks
  const containerRef = useRef();
  const contentRef = useRef();
  const { scrollY } = useViewportScroll();
  const x = useTransform(scrollY, scrollRange, [0, overflow]);

  // Render
  return (
    <Box
      w={1}
      ref={containerRef}
      display='flex'
      alignItems='center'
      style={{
        overflow: 'hidden'
      }}
    >
      <motion.div
        ref={contentRef}
        style={{
          display: 'inline-flex',
          x: x
        }}
      >
        {items.map((item, i) => (
          <Box key={item.id} flexShrink={0}>
            {itemBuilder(item)}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

export default ScrollCarousel;
