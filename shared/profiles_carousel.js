import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@material-ui/core/styles';
import ImageParallax from './image_parallax';

function ProfileCarousel({ isPortrait, profiles }) {
  // State
  const [index, setIndex] = useState(0);
  const [autoAnimate, setAutoAnimate] = useState(false);

  // Hooks
  const timeoutRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 1
  });
  const theme = useTheme();

  // Methods
  function incrementIndex() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setIndex(index < profiles.length - 1 ? index + 1 : 0);
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
    if (inView) {
      setAutoAnimate(true);
    } else {
      setAutoAnimate(false);
    }
  }, [inView]);

  const spring = {
    type: 'spring',
    mass: 1,
    damping: 12
  };

  // Render
  return (
    <Box w={1} ref={ref}>
      <Box
        className='carousel'
        style={{
          overflow: 'hidden'
        }}
      >
        <motion.div
          animate={{
            x: `${25 - index * 50}vw`
          }}
          transition={{
            type: 'spring',
            mass: 1,
            damping: 12
          }}
          style={{
            display: 'flex'
            // transform: translateX
          }}
        >
          {profiles.map((profile, i) => (
            <motion.div
              className='porfile'
              key={profile.id}
              transition={spring}
              animate={{
                scale: i === index ? 1 : 0.8
              }}
              style={{
                transformOrigin: '25vw 40vw'
              }}
            >
              <Box display='flex' flexDirection='column' alignItems='center'>
                <ImageParallax
                  src={profile.pic}
                  isPortrait={isPortrait}
                  height='50vw'
                  width='50vw'
                  borderRadius='50vw'
                  windowRange={[0, 2]}
                />
                <motion.div
                  transition={{
                    type: 'spring',
                    delay: 0.2,
                    mass: 1,
                    damping: 20
                  }}
                  animate={{
                    opacity: i === index ? 1 : 0,
                    y: i === index ? 0 : 10
                  }}
                >
                  <Typography
                    style={{
                      marginTop: theme.spacing(2)
                    }}
                  >
                    {profile.name}
                  </Typography>
                </motion.div>
                <motion.div
                  transition={{
                    type: 'spring',
                    delay: 0.3,
                    mass: 1,
                    damping: 20
                  }}
                  animate={{
                    opacity: i === index ? 1 : 0,
                    y: i === index ? 0 : 15
                  }}
                >
                  <Typography>{profile.title}</Typography>
                </motion.div>
              </Box>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

export default ProfileCarousel;
