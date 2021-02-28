import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  useViewportScroll,
  motion,
  useTransform,
  useMotionValue
} from 'framer-motion';

function Left({ children, sectionAlignment }) {
  return (
    <Box
      width='45%'
      display='flex'
      justifyContent='flex-end'
      alignItems={sectionAlignment || 'center'}
      pr='5vw'
      position='relative'
    >
      {children}
    </Box>
  );
}

function Right({ children, sectionAlignment }) {
  return (
    <Box
      width='55%'
      display='flex'
      alignItems={sectionAlignment || 'flex-start'}
      flexDirection='column'
      justifyContent={sectionAlignment || 'center'}
    >
      {children}
    </Box>
  );
}

function Center({ children, style }) {
  return (
    <Box
      width={1}
      pt={6}
      pb={6}
      display='flex'
      flexDirection='column'
      style={style}
      // borderBottom='1px solid red'
    >
      {children}
    </Box>
  );
}

function SectionLayout({
  headerTxt,
  bodyTxt,
  left,
  topMobile,
  backgroundColor,
  headerColor,
  lessPaddingTop,
  isMobile,
  sectionAlignment,
  scrollRange
}) {
  const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  const { scrollY } = useViewportScroll();
  console.log(scrollY);
  const y1 = useTransform(scrollY, scrollRange, [100, 0]);
  const y2 = useTransform(scrollY, scrollRange, [200, 0]);
  const opacity = useTransform(scrollY, scrollRange, [0, 1]);
  // const [ref, inView, entry] = useInView({
  //   /* Optional options */
  //   threshold: 0.5,
  //   triggerOnce: false
  // });
  return !isPortrait ? (
    <Box
      width={1}
      pt={lessPaddingTop ? 9 : 18}
      pb={18}
      display='flex'
      flexDirection='row'
      style={{
        backgroundColor: backgroundColor
      }}
    >
      <Left sectionAlignment={sectionAlignment}>{left}</Left>
      <Right sectionAlignment={sectionAlignment}>
        <motion.div style={{ y: y1, opacity: opacity }}>
          <Typography
            variant='h2'
            style={{
              maxWidth: 600,
              color: headerColor
            }}
          >
            {headerTxt}
          </Typography>
        </motion.div>
        <Box mb={5} />
        <motion.div style={{ y: y2, opacity: opacity }}>
          <Box maxWidth='40vw'>{bodyTxt}</Box>
        </motion.div>
      </Right>
    </Box>
  ) : (
    <Center
      lessPaddingTop={lessPaddingTop}
      style={{
        backgroundColor: backgroundColor
      }}
    >
      {topMobile}
      <Box mb={4} />
      <Typography
        variant='h2'
        style={{
          padding: `0 ${theme.mobileGutter}`,
          color: headerColor
        }}
      >
        {headerTxt}
      </Typography>
      <Box mb={3} />
      <div
        style={{
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        {bodyTxt}
      </div>
    </Center>
  );
}

export default SectionLayout;
