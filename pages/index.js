import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Typography, Link, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Moment from 'react-moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LeftArrow } from '@styled-icons/boxicons-solid/LeftArrow';
import { RightArrow } from '@styled-icons/boxicons-solid/RightArrow';
import Head from 'next/head';
import mockData from '../mock_data';

function Left({ children }) {
  return (
    <Box
      width='45%'
      display='flex'
      justifyContent='flex-end'
      alignItems='center'
      pr='5vw'
      position='relative'
    >
      {children}
    </Box>
  );
}

function Right({ children }) {
  return (
    <Box
      width='55%'
      display='flex'
      alignItems='flex-start'
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

function HeroLeft() {
  const theme = useTheme();
  return (
    <Left>
      <Box
        height='28vw'
        width='28vw'
        borderRadius='28vw'
        style={{
          backgroundColor: theme.palette.primary.dark
        }}
      ></Box>
    </Left>
  );
}

function SectionLayout({
  headerTxt,
  bodyTxt,
  art,
  artMobile,
  backgroundColor,
  headerColor,
  lessPaddingTop,
  isMobile
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
      <Left>{art}</Left>
      <Right>
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
      {artMobile}
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

function HeroRight() {
  return (
    <Right>
      <img
        src='/mims_for_hero.svg'
        style={{
          width: '32vw',
          minWidth: 393
        }}
      />
      <Box mb={5} />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 42
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb={4} />
      <Typography
        style={{
          lineHeight: '2em'
        }}
      >
        Minimally Invasive Micro Sclerostomy is a Stentless,
        <br />
        Simple & Fast Glaucoma treatment to effectively lower
        <br />
        IOP without invasive surgery or medication.
      </Typography>
    </Right>
  );
}

function HeroMobile() {
  const theme = useTheme();
  return (
    <Box width={1} pt={18} pb={4} display='flex' flexDirection='column'>
      <Box
        height='80vw'
        width='80vw'
        borderRadius='70vw'
        flexShrink={0}
        style={{
          margin: '0 auto 50px',
          backgroundColor: theme.palette.primary.dark
        }}
      ></Box>
      <img
        src='/mims_for_hero.svg'
        style={{
          width: `calc(100vw - ${theme.mobileGutter} - ${theme.mobileGutter})`,
          margin: '0 auto'
        }}
      />
      <Box mb={2} />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 24,
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb={4} />
      <Typography
        style={{
          padding: `0 ${theme.mobileGutter}`
        }}
      >
        Minimally Invasive Micro Sclerostomy is a Stentless, Simple & Fast
        Glaucoma treatment to effectively lower IOP without invasive surgery or
        medication.
      </Typography>
      <Box mb={4} />
    </Box>
  );
}

function Hero({ isMobile }) {
  const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
  return (
    <Box
      width={1}
      height={isPortrait ? 'auto' : '54vw'}
      display='flex'
      style={{
        backgroundImage: 'url(/hero_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      {!isPortrait && <HeroLeft />}
      {!isPortrait && <HeroRight />}
      {isPortrait && <HeroMobile />}
    </Box>
  );
}

function Inovation({ isMobile }) {
  const theme = useTheme();
  const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  const bodyTxt =
    'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';
  return (
    <SectionLayout
      isMobile={isMobile}
      headerTxt={headerTxt}
      bodyTxt={<Typography>{bodyTxt}</Typography>}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function MinimalIntervention({ isMobile }) {
  const theme = useTheme();
  const headerTxt = 'Minimal interventional Glaucoma helps earlier';
  const bodyTxt =
    'As the leading cause of blindness, Glaucoma is not yet curable. However, progression can be slowed with a proactive approach. Intervening early & quickly can reduce risky complications.';
  return (
    <SectionLayout
      isMobile={isMobile}
      lessPaddingTop
      headerTxt={headerTxt}
      bodyTxt={<Typography>{bodyTxt}</Typography>}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function BlueText({ children }) {
  const theme = useTheme();
  return (
    <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
      {children}
    </span>
  );
}

function ClinicalPerformance({ isMobile }) {
  const theme = useTheme();
  const headerTxt = 'Outstanding Clinical Performance';
  const bodyTxt = (
    <ul>
      <li>
        <Typography>
          <BlueText>1:50 &plusmn; 0:33</BlueText> Min. Procedure duration
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>57%</BlueText> IOP Reduction after 12 Months
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>99%</BlueText> Medication reduction at 12 months
        </Typography>
      </li>
      <li>
        <Typography>
          <BlueText>ZERO </BlueText>Major intra/post-op complications
        </Typography>
      </li>
    </ul>
  );
  return (
    <SectionLayout
      isMobile={isMobile}
      lessPaddingTop
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: theme.palette.primary.dark
          }}
        ></Box>
      }
    />
  );
}

function HowItWorksVideo({ width, height }) {
  return (
    <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
      <source src='/how_mims_works.mp4' type='video/mp4' />
    </video>
  );
}

function HowItWorks({ isMobile }) {
  const headerTxt = 'How MIMS® Works';
  const bodyTxt = `Minimally Invasive Micro Sclerostomy is fast, accessible &
  effective. It works by inserting a specially designed needle into
  the sclera & removing a small channel of tissue. This channel will
  remain open & contentiously drain, effectively reducing IOP buildup.`;
  return (
    <SectionLayout
      isMobile={isMobile}
      lessPaddingTop
      headerTxt={headerTxt}
      bodyTxt={<Typography>{bodyTxt}</Typography>}
      art={
        <Box width='28vw' height={`${0.56 * 28}vw`}>
          <HowItWorksVideo />
        </Box>
      }
      artMobile={<HowItWorksVideo />}
    />
  );
}

function Testimonials({ isMobile }) {
  const isPortrait = isMobile || useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  const [item, setItem] = useState(0);
  const timeoutRef = useRef(null);
  const myRef = React.useRef();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setItem(Math.min(mockData.testimonials.length, item + 1));
    },
    onSwipedRight: () => {
      setItem(Math.max(0, item - 1));
    }
  });
  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  };

  function incrementItemIndex() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setItem(item < mockData.testimonials.length - 1 ? item + 1 : 0);
    }, 5000);
  }

  useEffect(() => {
    incrementItemIndex();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [item]);

  const itemsInRow = Math.ceil(Math.sqrt(mockData.testimonials.length));
  const itemSize = `calc(${28 / itemsInRow}vw)`;

  return !isPortrait ? (
    <Box
      width={1}
      pt={18}
      pb={18}
      display='flex'
      flexDirection='row'
      style={{
        background: theme.palette.primary.main
      }}
    >
      <Left>
        <Box
          display='flex'
          width='28vw'
          height='28vw'
          flexWrap='wrap'
          alignItems='center'
          alignContent='center'
          justifyContent='stretch'
        >
          {mockData.testimonials.map((itm, i) => (
            <Box
              width={itemSize}
              height={itemSize}
              key={itm.id}
              border={`4px solid ${
                item === i ? 'white' : theme.palette.primary.main
              }`}
              boxShadow={`0 0 ${item === i ? 5 : 0}px rgba(0, 0, 0, 0.2)`}
              borderRadius='13vw'
              flexGrow={0}
              flexShrink={0}
              zIndex={item === i ? 1 : 0}
              overflow='hidden'
              style={{
                background:
                  item === i ? 'transparent' : theme.palette.primary.main,
                cursor: 'pointer',
                opacity: item === i ? 1 : 0.75,
                transition: theme.fastTransition,
                transform:
                  item === i
                    ? `scale(${mockData.testimonials.length / 10 + 1})`
                    : 'scale(1)'
              }}
              onClick={() => {
                setItem(i);
              }}
            >
              <img
                src={itm.pic}
                alt='profile image'
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  mixBlendMode: 'multiply',
                  filter: item === i ? 'none' : 'grayscale(1)'
                }}
              />
            </Box>
          ))}
        </Box>
      </Left>
      <Right>
        <Typography
          variant='h2'
          style={{
            maxWidth: 500,
            color: 'white'
          }}
        >
          MIMS® Testimonials
        </Typography>
        <Box mb={5} />
        <Box maxWidth='40vw'>
          <Box height={theme.spacing(22)}>
            <Typography style={{ fontSize: '28px', color: 'white' }}>
              &#34;{mockData.testimonials[item].testimonial}&#34;
            </Typography>
          </Box>
          <Typography
            style={{
              color: 'white'
            }}
          >
            {mockData.testimonials[item].name}
          </Typography>
          <Typography
            style={{
              color: 'white'
            }}
          >
            {mockData.testimonials[item].title}
          </Typography>
        </Box>
      </Right>
    </Box>
  ) : (
    <Center
      style={{
        background: theme.palette.primary.main
      }}
    >
      <Typography
        variant='h2'
        style={{
          padding: `0 ${theme.mobileGutter}`,
          color: 'white'
        }}
      >
        MIMS® Testimonials
      </Typography>
      <Box mb={4} />
      <Box
        {...handlers}
        ref={refPassthrough}
        display='flex'
        alignItems='center'
        width={1}
        pt={7}
        pb={7}
        style={{
          overflow: 'hidden'
        }}
      >
        {mockData.testimonials.map((itm, i) => (
          <Box
            key={itm.id}
            height='200px'
            width='200px'
            borderRadius='180px'
            border={`4px solid rgba(255, 255, 255, ${item === i ? 1 : 0.5})`}
            boxShadow={`0 0 ${item === i ? 5 : 0}px rgba(0, 0, 0, 0.2)`}
            flexShrink={0}
            zIndex={item === i ? 1 : 0}
            p={0}
            style={{
              overflow: 'hidden',
              background:
                item === i ? 'transparent' : theme.palette.primary.main,
              opacity: item === i ? 1 : 0.75,
              transition: theme.fastTransition,
              transform: `translateX(calc(${item * -100 + 50}%)) ${
                item === i ? 'scale(1.5)' : 'scale(1)'
              }`
            }}
            onClick={() => setItem(i)}
          >
            <img
              src={itm.pic}
              alt='profile image'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                mixBlendMode: 'multiply',
                filter: item === i ? 'none' : 'grayscale(1)'
              }}
            />
          </Box>
        ))}
      </Box>
      <Box mb={3} />
      <Box pl={theme.mobileGutter} pr={theme.mobileGutter}>
        <Box height={theme.spacing(26)}>
          <Typography style={{ fontSize: '24px', color: 'white' }}>
            &#34;{mockData.testimonials[item].testimonial}&#34;
          </Typography>
        </Box>
        <Typography
          style={{
            color: 'white'
          }}
        >
          {mockData.testimonials[item].name}
        </Typography>
        <Typography
          style={{
            color: 'white'
          }}
        >
          {mockData.testimonials[item].title}
        </Typography>
      </Box>
    </Center>
  );
}

function News({ isMobile }) {
  const theme = useTheme();
  const headerTxt = 'News, Publications & Events';
  const [index, setIndex] = useState(0);
  const bodyTxt = (
    <Box>
      <ul
        style={{
          marginBottom: theme.spacing(4),
          display: 'flex',
          flexWrap: 'nowrap',
          overflow: 'hidden'
        }}
      >
        {mockData.newsCollection.map((item, i) => (
          <li
            key={item.id}
            style={{
              width: '100%',
              flexShrink: 0,
              transition: theme.fastTransition,
              transform: `translateX(-${index * 100}%)`,
              opacity: index === i ? 1 : 0
            }}
          >
            <Typography
              style={{
                color: 'white',
                marginBottom: theme.spacing(4)
              }}
            >
              <Moment interval={0} format='MMM D, YYYY'>
                {item.date}
              </Moment>
            </Typography>
            <Typography
              style={{
                color: 'white',
                marginBottom: theme.spacing(4)
              }}
            >
              <BlueText>
                <Link href={item.link}>{item.headline}</Link>
              </BlueText>
            </Typography>
            <Typography
              style={{
                color: 'white'
              }}
            >
              {item.article}
            </Typography>
          </li>
        ))}
      </ul>
      <Box width={1} display='flex' justifyContent='space-between'>
        <Button
          onClick={() => {
            setIndex(Math.max(0, index - 1));
          }}
          disabled={index === 0}
          style={{
            color: index === 0 ? 'rgba(255, 255, 255, 0.3)' : 'white'
          }}
        >
          <LeftArrow
            size={16}
            style={{
              transform: 'translateY(-1px)',
              marginRight: theme.spacing(1)
            }}
          />
          Newer
        </Button>
        <Button
          onClick={() => {
            setIndex(Math.min(mockData.newsCollection.length - 1, index + 1));
          }}
          style={{
            color:
              index === mockData.newsCollection.length - 1
                ? 'rgba(255, 255, 255, 0.3)'
                : 'white'
          }}
        >
          Older
          <RightArrow
            size={16}
            style={{
              transform: 'translateY(-1px)',
              marginLeft: theme.spacing(1)
            }}
          />
        </Button>
      </Box>
    </Box>
  );
  return (
    <SectionLayout
      isMobile={isMobile}
      headerTxt={headerTxt}
      bodyTxt={bodyTxt}
      headerColor='white'
      backgroundColor={theme.palette.primary.dark}
      art={
        <Box
          height='28vw'
          width='28vw'
          borderRadius='28vw'
          style={{
            backgroundColor: 'white'
          }}
        ></Box>
      }
      artMobile={
        <Box
          height='80vw'
          width='80vw'
          borderRadius='70vw'
          flexShrink={0}
          style={{
            margin: '0 auto 50px',
            backgroundColor: 'white'
          }}
        ></Box>
      }
    />
  );
}

export async function getServerSideProps(context) {
  console.log(context.req.headers['user-agent']);
  const isMobile = Boolean(
    context.req.headers['user-agent'].match(
      /iPhone|Android|webOS|iPad|iPod|BlackBerry|Windows Phone/i
    )
  );
  return {
    props: {
      isMobile,
      data: 'my data'
    } // will be passed to the page component as props
  };
}

export default function Home({ data, isMobile }) {
  return (
    <Fragment>
      <Head>
        <title>Sanoculis</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      </Head>
      <Hero isMobile={isMobile} />
      <Inovation isMobile={isMobile} />
      <HowItWorks isMobile={isMobile} />
      <MinimalIntervention isMobile={isMobile} />
      <ClinicalPerformance isMobile={isMobile} />
      <Testimonials isMobile={isMobile} />
      <News isMobile={isMobile} />
    </Fragment>
  );
}
