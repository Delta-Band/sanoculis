import React, { useState, useRef, useEffect } from 'react';
import { useViewportScroll, motion, useTransform } from 'framer-motion';

function ImageParallax({
  src,
  height,
  width,
  borderRadius = 0,
  windowRange = [0, 0.7]
}) {
  const [scrollRange, setScrollRange] = useState([0, 0]);
  const [imgOverflow, setImgOverflow] = useState(100);
  const containerRef = useRef();
  const imgRef = useRef();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);
  }, []);
  const y = useTransform(scrollY, scrollRange, [0, imgOverflow]);

  return (
    <div
      ref={containerRef}
      style={{
        width: width,
        height: height,
        overflow: 'hidden',
        borderRadius: borderRadius
      }}
    >
      <motion.div style={{ width: '100%', y: y }}>
        <img ref={imgRef} src={src} style={{ width: '100%' }} />
      </motion.div>
    </div>
  );
}

export default ImageParallax;
