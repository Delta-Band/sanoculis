import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useViewportScroll, motion, useTransform } from 'framer-motion';

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

function Center({ children, style, forwardRef }) {
  return (
    <Box
      ref={forwardRef}
      width={1}
      pt={7}
      pb={7}
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
  sectionAlignment
}) {
  const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  const { scrollY } = useViewportScroll();
  const [scrollRange, setScrollRange] = useState([0, 0]);
  const ref = useRef();
  useEffect(() => {
    // const rectHeight = ref.current.getBoundingClientRect().height;
    setScrollRange([
      ref.current.offsetTop - (isPortrait ? 300 : 600),
      ref.current.offsetTop - (isPortrait ? 0 : 200)
    ]);
  }, []);
  const y1 = useTransform(scrollY, scrollRange, [100, 0]);
  const y2 = useTransform(scrollY, scrollRange, [200, 0]);
  const opacity = useTransform(scrollY, scrollRange, [0, 1]);
  return !isPortrait ? (
    <Box
      width={1}
      pt={9}
      pb={9}
      display='flex'
      flexDirection='row'
      ref={ref}
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
      forwardRef={ref}
      lessPaddingTop={lessPaddingTop}
      style={{
        backgroundColor: backgroundColor
      }}
    >
      {topMobile}
      <motion.div style={{ y: y1, opacity: opacity }}>
        <Typography
          variant='h2'
          style={{
            padding: `0 ${theme.mobileGutter}`,
            color: headerColor
          }}
        >
          {headerTxt}
        </Typography>
      </motion.div>
      <Box mb={3} />
      <motion.div
        style={{ y: y2, opacity: opacity, padding: `0 ${theme.mobileGutter}` }}
      >
        {bodyTxt}
      </motion.div>
    </Center>
  );
}

export default SectionLayout;
