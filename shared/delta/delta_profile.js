import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Grid } from '@material-ui/core';
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
    <Grid
      container
      display='flex'
      direction='row'
      justify={row ? 'flex-start' : 'center'}
      alignItems='center'
      spacing={1}
    >
      <Grid item>
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
      </Grid>
      <Grid
        item
        xs={row ? 8 : 12}
        container
        direction={row ? 'row' : 'column'}
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12}>
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
            style={{
              display: row ? 'block' : 'inline-block'
            }}
          >
            <Typography
              variant='subtitle2'
              style={{
                marginTop: theme.spacing(row ? 0 : 2),
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {name}
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12}>
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
            <Typography
              variant='subtitle2'
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {title}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
}
