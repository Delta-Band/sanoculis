import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Head from 'next/head';

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
      mt={6}
      pt={6}
      pb={0}
      display='flex'
      flexDirection='column'
      style={style}
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

function SectionLayout({ headerTxt, bodyTxt, art, artMobile }) {
  const isPortrait = useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  return !isPortrait ? (
    <Box width={1} pt={18} pb={18} display='flex' flexDirection='row'>
      <Left>{art}</Left>
      <Right>
        <Typography
          variant='h2'
          style={{
            maxWidth: 500
          }}
        >
          {headerTxt}
        </Typography>
        <Box mb='5vh' />
        <Box maxWidth='40vw'>{bodyTxt}</Box>
      </Right>
    </Box>
  ) : (
    <Center>
      {artMobile}
      <Box mb={4} />
      <Typography
        variant='h2'
        style={{
          padding: `0 ${theme.mobileGutter}`
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
      <Box mb='5vh' />
      <Typography
        style={{
          lineHeight: '1em',
          fontSize: 42
        }}
      >
        LEAVE NO THING BEHIND
      </Typography>
      <Box mb='5vh' />
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

function Hero() {
  const isPortrait = useMediaQuery('(max-width:1355px)');
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

function Inovation() {
  const theme = useTheme();
  const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  const bodyTxt =
    'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';
  return (
    <SectionLayout
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

function MinimalIntervention() {
  const theme = useTheme();
  const headerTxt = 'Minimal interventional Glaucoma helps earlier';
  const bodyTxt =
    'As the leading cause of blindness, Glaucoma is not yet curable. However, progression can be slowed with a proactive approach. Intervening early & quickly can reduce risky complications.';
  return (
    <SectionLayout
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

function ClinicalPerformance() {
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

function HowItWorks() {
  const headerTxt = 'How MIMS® Works';
  const bodyTxt = `Minimally Invasive Micro Sclerostomy is fast, accessible &
  effective. It works by inserting a specially designed needle into
  the sclera & removing a small channel of tissue. This channel will
  remain open & contentiously drain, effectively reducing IOP buildup.`;
  return (
    <SectionLayout
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

function Testimonials() {
  const isPortrait = useMediaQuery('(max-width:1355px)');
  const theme = useTheme();
  const [item, setItem] = useState(0);
  const timeoutRef = useRef(null);
  const crew = [
    {
      pic:
        'https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/59847652_10156633652154862_293263699865501696_o.jpg?_nc_cat=107&ccb=3&_nc_sid=09cbfe&_nc_ohc=85OCmee3kMAAX95zRUR&_nc_ht=scontent.fsdv2-1.fna&oh=fc6de66bf18e4f3fe63b752e83de4d4c&oe=605A706D',
      testimonial:
        'The procedure is effective in reducing IOP without medication or complications, improving lives and simplifying treatments for glaucoma',
      name: 'DR. Ike Ahmend',
      title: 'Opthalmology MD, FRCS(C)'
    },
    {
      pic:
        'https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/152730701_10159094443472929_6544776907417348034_o.jpg?_nc_cat=103&ccb=3&_nc_sid=09cbfe&_nc_ohc=CqB80quLRQQAX_shd8R&_nc_ht=scontent.fsdv2-1.fna&oh=d63d21b6be4597e1b379937cc55238db&oe=60597653',
      testimonial: 'Lorem Ipsum',
      name: 'DR. Freddy Kruger',
      title: 'NightmareOlogy MD, FRCS(C)'
    },
    {
      pic:
        'https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/80517166_204613033875990_854933306356006912_o.jpg?_nc_cat=109&ccb=3&_nc_sid=09cbfe&_nc_ohc=4pdZ-q7ohDUAX-KJptC&_nc_ht=scontent.fsdv2-1.fna&oh=2e9c8e6ae073cab21a0a5ba03ac68d9f&oe=605A9370',
      testimonial: 'Dollar Sit Emmet',
      name: 'DR. Suzy Sunshine',
      title: 'GoodVibeOlogy MD, FRCS(C)'
    },
    {
      pic:
        'https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/89503574_10220243452869293_7949417576457568256_o.jpg?_nc_cat=102&ccb=3&_nc_sid=09cbfe&_nc_ohc=fZJHf_DWJJ8AX9s1K2A&_nc_ht=scontent.fsdv2-1.fna&oh=ecf173791e3c17ab57d822de09fc5aa7&oe=60594DA1',
      testimonial: 'Dollar Sit Emmet',
      name: 'DR. Grey Tombs',
      title: 'Enternalology MD, FRCS(C)'
    }
  ];
  const myRef = React.useRef();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setItem(Math.min(crew.length, item + 1));
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
      setItem(item < crew.length - 1 ? item + 1 : 0);
    }, 5000);
  }

  useEffect(() => {
    incrementItemIndex();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [item]);

  const itemsInRow = Math.ceil(Math.sqrt(crew.length));
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
          {crew.map((itm, i) => (
            <Box
              width={itemSize}
              height={itemSize}
              key={itm.pic}
              border={`4px solid ${theme.palette.primary.main}`}
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
                  item === i ? `scale(${crew.length / 10 + 1})` : 'scale(1)'
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
        <Box mb='5vh' />
        <Box maxWidth='40vw'>
          <Box height={theme.spacing(22)}>
            <Typography style={{ fontSize: '28px', color: 'white' }}>
              &#34;{crew[item].testimonial}&#34;
            </Typography>
          </Box>
          <Typography
            style={{
              color: 'white'
            }}
          >
            {crew[item].name}
          </Typography>
          <Typography
            style={{
              color: 'white'
            }}
          >
            {crew[item].title}
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
        {crew.map((itm, i) => (
          <Box
            key={itm.pic}
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
      <Box pl={theme.mobileGutter} pr={theme.mobileGutter} pb={9}>
        <Box height={theme.spacing(26)}>
          <Typography style={{ fontSize: '24px', color: 'white' }}>
            &#34;{crew[item].testimonial}&#34;
          </Typography>
        </Box>
        <Typography
          style={{
            color: 'white'
          }}
        >
          {crew[item].name}
        </Typography>
        <Typography
          style={{
            color: 'white'
          }}
        >
          {crew[item].title}
        </Typography>
      </Box>
    </Center>
  );
}

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Sanoculis</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preload' href='/fonts/Rubik.ttf' as='font' crossOrigin='' />
      </Head>
      <Hero />
      <Inovation />
      <HowItWorks />
      <MinimalIntervention />
      <ClinicalPerformance />
      <Testimonials />
    </Fragment>
  );
}
