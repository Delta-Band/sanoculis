import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
      justifyContent='center'
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
  sectionAlignment
}) {
  const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
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
        <Typography
          variant='h2'
          style={{
            maxWidth: 600,
            color: headerColor
          }}
        >
          {headerTxt}
        </Typography>
        <Box mb={5} />
        <Box maxWidth='40vw'>{bodyTxt}</Box>
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
