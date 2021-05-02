import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';

function DeltaCarousel({
  items,
  itemBuilder,
  autoPlay = false,
  disableClickOnItem = false,
  focus = 0,
  paddingLeft = 0,
  noFade = false,
  onChange = function () {},
  itemStyle = {}
}) {
  // State
  const [index, setIndex] = useState(focus);
  const [autoAnimate, setAutoAnimate] = useState(false);

  // Hooks
  const timeoutRef = useRef(null);
  const myRef = React.useRef();
  const { ref, inView } = useInView({
    threshold: 1
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const newIndex = Math.min(items.length - 1, index + 1);
      setIndex(newIndex);
      onChange(newIndex);
    },
    onSwipedRight: () => {
      const newIndex = Math.max(0, index - 1);
      setIndex(newIndex);
      onChange(newIndex);
    }
  });

  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    setIndex(focus);
  }, [focus]);

  // Methods
  function incrementIndex() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setIndex(index < items.length - 1 ? index + 1 : 0);
    }, 5000);
  }

  // Effects
  useEffect(() => {
    if (!autoAnimate) return;
    incrementIndex();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [index, autoAnimate]);

  useEffect(() => {
    if (inView && autoPlay) {
      setAutoAnimate(true);
    } else {
      setAutoAnimate(false);
    }
  }, [inView]);

  const spring = {
    type: 'spring',
    stiffness: 30
  };

  const refPassthrough = (el) => {
    handlers.ref(el);
    myRef.current = el;
  };

  // Render
  return (
    <Box width={1} height={1} ref={ref}>
      <Box
        className='carousel'
        height={1}
        style={{
          overflow: 'hidden'
        }}
      >
        <motion.div
          {...handlers}
          ref={refPassthrough}
          animate={{
            x: `-${index * 100}%`
          }}
          transition={{
            type: 'spring',
            // stiffness: 100,
            bounce: 0
          }}
          style={{
            display: 'flex',
            height: '100%',
            paddingLeft: paddingLeft
            // transform: translateX
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id || item.key || item}
              transition={spring}
              onClick={
                disableClickOnItem
                  ? undefined
                  : () => {
                      setIndex(i);
                    }
              }
              animate={{
                // scale: i === index ? 1 : 0.8,
                opacity: i === index ? 1 : noFade ? 1 : 0
              }}
              style={{
                width: '100%',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              {itemBuilder(item, i, index)}
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

export default DeltaCarousel;
