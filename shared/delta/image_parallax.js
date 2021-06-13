import React, { useState, useRef, useEffect } from 'react';
import { useViewportScroll, motion, useTransform } from 'framer-motion';
import { debounce } from 'lodash';
import { useTheme } from '@material-ui/core/styles';

function ImageParallax({
  src,
  height,
  width,
  borderRadius = 0,
  windowRange = [0, 0.7],
  imgStyle = {},
  itemStyle = () => {},
  blendColor = 'white'
}) {
  // State
  const [scrollRange, setScrollRange] = useState([0, 0]);
  const [imgOverflow, setImgOverflow] = useState(100);

  // Hooks
  const theme = useTheme();
  const containerRef = useRef();
  const imgRef = useRef();
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, scrollRange, [0, imgOverflow]);

  // Methods
  function init() {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imgRef.current.getBoundingClientRect();
    const docRelativeYlocation =
      containerRect.top + window.pageYOffset - window.innerHeight;
    setImgOverflow(0 - (imageRect.height - containerRect.height));
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

  // Render
  return (
    <motion.div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        overflow: 'hidden',
        borderRadius: borderRadius,
        transform: 'translateZ(0)',
        flexShrink: 0,
        ...itemStyle
      }}
    >
      <motion.div
        style={{
          width: '100%',
          y: y,
          transition: theme.fastTransition,
          background: blendColor
        }}
      >
        <img
          ref={imgRef}
          src={src}
          style={{
            width: '100%',
            transition: theme.fastTransition,
            ...imgStyle
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default ImageParallax;
