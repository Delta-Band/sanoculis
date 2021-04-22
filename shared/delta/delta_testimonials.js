import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Delta2ColLayout from './delta_2_col_layout';
import DeltaProfile from './delta_profile';
import DeltaCarousel from './delta_carousel';

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: '#FFF'
  }
}));

export default function DeltaTestimonials({ testimonials, title }) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const containerRef = useRef();
  const classes = useStyles();

  useScrollPosition(({ prevPos, currPos }) => {
    console.log(Math.abs(currPos.y));
  });

  return (
    <Delta2ColLayout
      background={theme.palette.primary.dark}
      titleColor='#FFF'
      paddingTop={5}
      paddingBottom={5}
      art={
        <Box width={460} display='inline-block' mr={18} ref={containerRef}>
          <Grid
            container
            spacing={0}
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            {testimonials.map((item, i) => (
              <Grid
                key={item.name}
                item
                style={{
                  zIndex: index === i ? 1 : 0
                }}
              >
                <DeltaProfile
                  pic={item.pic}
                  size={229}
                  border={`2px solid ${i === index ? '#FFF' : 'transparent'}`}
                  applyFilter={index !== i}
                  scale={index === i ? 1.2 : 1}
                  onClick={() => {
                    setIndex(i);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      }
      title={title}
      content={[
        <Box width='444px' key={1}>
          <DeltaCarousel
            items={testimonials}
            itemWidth={444}
            focus={index}
            itemBuilder={(item, i) => (
              <motion.div animate={{ opacity: i === index ? 1 : 0 }}>
                <Typography
                  variant='h3'
                  classes={{ root: classes.whiteText }}
                  style={{ fontWeight: 400 }}
                >
                  &#34;{item.testimony}&#34;
                </Typography>
              </motion.div>
            )}
          />
        </Box>
      ]}
    />
  );
}
