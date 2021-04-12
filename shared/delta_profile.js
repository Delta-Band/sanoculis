import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ImageParallax from './image_parallax';

export default function DeltaProfile({
  pic,
  name,
  title,
  blur = false,
  row = false,
  size = 40
}) {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      flexDirection={row ? 'row' : 'column'}
      alignItems='center'
      justifyContent='center'
    >
      <ImageParallax
        src={pic}
        height={size}
        width={size}
        borderRadius='50vw'
        windowRange={[0, 2]}
        imgStyle={{
          mixBlendMode: 'multiply',
          filter: !blur ? 'none' : 'grayscale(1)'
        }}
        blendColor={blur ? theme.palette.primary.main : '#FFF'}
      />
      <motion.div
        transition={{
          type: 'spring',
          delay: 0.2,
          mass: 1,
          damping: 20
        }}
        animate={{
          opacity: !blur ? 1 : 0,
          y: !blur ? 0 : 10
        }}
      >
        <Typography
          variant='subtitle2'
          style={{
            marginTop: theme.spacing(row ? 0 : 2)
          }}
        >
          {name}
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
          opacity: !blur ? 1 : 0,
          y: !blur ? 0 : 15
        }}
      >
        <Typography variant='subtitle2'>{title}</Typography>
      </motion.div>
    </Box>
  );
}
