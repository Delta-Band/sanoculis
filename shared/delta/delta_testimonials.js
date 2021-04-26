import React, { useState, useRef } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cx from 'classnames';
import Delta2ColLayout from './delta_2_col_layout';
import DeltaProfile from './delta_profile';
import DeltaCarousel from './delta_carousel';

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: '#FFF'
  },
  profileGrid: {
    margin: '0 auto 65px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '93px'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      marginRight: '5vw'
    }
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}));

export default function DeltaTestimonials({ testimonials, title }) {
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  const upLG = useMediaQuery(theme.breakpoints.up('lg'));
  const [index, setIndex] = useState(0);
  const containerRef = useRef();
  const classes = useStyles();
  const PROFILE_SIZE = upLG ? 240 : upMD ? 200 : upSM ? 140 : 80;

  // useScrollPosition(({ prevPos, currPos }) => {
  //   console.log(Math.abs(currPos.y));
  // });

  return (
    <Delta2ColLayout
      background={theme.palette.primary.dark}
      titleColor='#FFF'
      paddingTop={0}
      paddingBottom={5}
      art={
        <Box
          width={PROFILE_SIZE * (upMD ? 2 : 4)}
          display='inline-block'
          ref={containerRef}
          className={classes.profileGrid}
        >
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
                  size={PROFILE_SIZE}
                  border={`2px solid ${i === index ? '#FFF' : 'transparent'}`}
                  applyFilter={index !== i}
                  scale={index === i ? (upMD ? 1.2 : 1.4) : upMD ? 1 : 1.2}
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
        <Box width='100%' key={1}>
          <DeltaCarousel
            items={testimonials}
            itemWidth={444}
            focus={index}
            onChange={function (_i) {
              if (_i !== index) {
                setIndex(_i);
              }
            }}
            itemBuilder={(item, i) => (
              <Box>
                <Typography
                  variant='h3'
                  classes={{ root: cx(classes.whiteText, classes.lineClamp) }}
                  style={{ fontWeight: 400 }}
                >
                  &#34;{item.testimony}&#34;
                </Typography>
                <Box mt={4}>
                  <Typography classes={{ root: classes.whiteText }}>
                    {item.name}
                  </Typography>
                  <Typography classes={{ root: classes.whiteText }}>
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </Box>
      ]}
    />
  );
}
