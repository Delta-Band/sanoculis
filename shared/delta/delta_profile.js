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
  size = 40,
  border,
  applyFilter = false,
  filter = 'grayscale(1)',
  mixBlendMode,
  scale = 1,
  onClick
}) {
  const theme = useTheme();
  return (
    <Grid
      container
      display='flex'
      direction='row'
      justify={row ? 'flex-start' : 'center'}
      alignItems='center'
      spacing={name || title ? 1 : 0}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <Grid item>
        <motion.div
          transition={{ scale: { type: 'spring', bounce: 0.5 } }}
          animate={{
            filter: !applyFilter ? 'none' : filter,
            scale: scale
          }}
        >
          <ImageParallax
            src={pic}
            itemStyle={{
              height: size,
              width: size,
              borderRadius: size,
              border: border
            }}
            windowRange={[0, 2]}
            imgStyle={{
              mixBlendMode: mixBlendMode,
              filter: !applyFilter ? 'none' : filter
            }}
            blendColor={applyFilter ? theme.palette.primary.main : '#FFF'}
          />
        </motion.div>
      </Grid>
      {name ||
        (title && (
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
                  opacity: !applyFilter ? 1 : 0,
                  y: !applyFilter ? 0 : 10
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
                  opacity: !applyFilter ? 1 : 0,
                  y: !applyFilter ? 0 : 15
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
        ))}
    </Grid>
  );
}
