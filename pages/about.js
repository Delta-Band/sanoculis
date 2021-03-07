import React, { Fragment } from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ProfileCarousel, ScrollCarousel, ImageParallax } from '../shared';
import Head from 'next/head';

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
      leadership: [
        {
          id: 1,
          name: 'Samuel The Giant',
          title: 'Keeper of the Garden',
          pic:
            'https://s2.best-wallpaper.net/wallpaper/iphone/1609/The-Big-Friendly-Giant-2016_iphone_320x480.jpg'
        },
        {
          id: 2,
          name: 'Henry Hizenberg',
          title: 'Inovation Specialist',
          pic:
            'https://previews.123rf.com/images/remains/remains1411/remains141100322/33838138-surprised-crazy-scientist-with-test-tube.jpg'
        },
        {
          id: 3,
          name: 'Pikatch',
          title: 'Test Anminal',
          pic:
            'https://ae01.alicdn.com/kf/H0796eedf43804726819970bb8de51be5Q/4PCS-LOT-Pokemon-Pikachu-Classic-Toys-Sticker-Fashion-Personality-Cartoon-Laptop-Body-Background-Decoration-Sticker.jpg'
        },
        {
          id: 4,
          name: 'Grandma',
          title: 'Snacks Manager',
          pic:
            'https://previews.123rf.com/images/stockakia/stockakia1708/stockakia170800015/84749048-grandma-cooking.jpg'
        }
      ],
      partners: (() => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
          arr.push({
            id: i,
            name: i
          });
        }
        return arr;
      })()
    } // will be passed to the page component as props
  };
}

export default function About({ isMobile, leadership, partners }) {
  // Hooks
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const _isMobile = isMobile || matches;

  // Sub-Components
  function GridItem({ children }) {
    return (
      <Grid
        item
        xs={12}
        style={{
          paddingBottom: theme.mobileGutter,
          paddingLeft: _isMobile ? theme.mobileGutter : 0,
          paddingRight: _isMobile ? theme.mobileGutter : 0
        }}
      >
        {children}
      </Grid>
    );
  }

  function Partners({ itemsInRow }) {
    function buildGroup(groupItems) {
      return (
        <ScrollCarousel
          windowRange={[0, 0.6]}
          items={groupItems}
          itemBuilder={(item) => (
            <Box
              width={_isMobile ? '50vw' : theme.spacing(31)}
              height={_isMobile ? '25vw' : theme.spacing(21)}
              style={{
                backgroundColor: theme.palette.primary.dark,
                color: 'white'
              }}
              mb={2}
              mr={2}
            >
              {item.name}
            </Box>
          )}
        />
      );
    }

    const groups = [];
    const groupCount = Math.ceil(partners.length / itemsInRow);
    for (let i = 0; i < groupCount; i++) {
      // groups.push(
      //   buildGroup(partners.slice(i * itemsInRow, i * itemsInRow + itemsInRow))
      // );
      groups.push([i * itemsInRow, i * itemsInRow + itemsInRow]);
    }

    return (
      <Fragment>
        {groups.map((group, i) => (
          <div key={i}>{buildGroup(partners.slice(group[0], group[1]))}</div>
        ))}
      </Fragment>
    );
  }

  function ProfilesGrid({ profiles }) {
    return (
      <Grid container spacing={1}>
        {profiles.map((itm) => (
          <Grid item lg={2} key={itm.id}>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <ImageParallax
                src={itm.pic}
                height={theme.spacing(16)}
                width={theme.spacing(16)}
                borderRadius={theme.spacing(16)}
                windowRange={[0, 0.8]}
              />
              <Typography
                variant='subtitle2'
                style={{
                  marginTop: theme.spacing(2)
                }}
              >
                {itm.name}
              </Typography>
              <Typography variant='subtitle2'>{itm.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>About MIMS</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        container
        spacing={0}
        style={{
          paddingTop: theme.spacing(17),
          maxWidth: theme.spacing(137),
          margin: '0 auto'
        }}
      >
        <GridItem>
          <Typography variant='h2'>Our Vision</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            Sanoculis LTD. develops innovative medical devices and solutions in
            Glaucoma treatment. We provide a safe, effective and simple way to
            perform procedures which may become the standard for treating
            Glaucoma and combined Glaucoma Cataract surgeries. Sanoculis was
            established in 2012 and is backed by private and institutional
            investors.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Sanoculis Leadership Team</Typography>
        </GridItem>
        <Grid item xs={12}>
          {_isMobile ? (
            <ProfileCarousel isMobile={_isMobile} profiles={leadership} />
          ) : (
            <ProfilesGrid profiles={leadership} />
          )}

          <Box mb={10} />
        </Grid>
        <GridItem>
          <Typography variant='h2'>Medical Advisory Board</Typography>
        </GridItem>
        <Grid item xs={12}>
          {_isMobile ? (
            <ProfileCarousel isMobile={_isMobile} profiles={leadership} />
          ) : (
            <ProfilesGrid profiles={leadership} />
          )}
          <Box mb={10} />
        </Grid>
        <GridItem>
          <Typography variant='h2'>Medical Institutional Partners</Typography>
        </GridItem>
        <Grid item xs={12}>
          <Partners itemsInRow={_isMobile ? 8 : 12} />
          <Box mb={10} />
        </Grid>
        <GridItem>
          <Typography variant='h2'>Glaucoma</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            Glaucoma is the leading cause of blindness in the world. It affects
            78M people every year - expected to grow to 111M by 2040. More than
            11 million people will be blinded due to glaucoma this year (13% of
            all glaucoma patients). There is no cure yet - there are only
            treatments to relieve symptoms. Advance of the disease can be
            substantially slowed through proper treatment. It&apos;s very
            important to act early because lost vision cannot be regained.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Treatment</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            Most patients are initially treated with topical medication, but
            often this option is insufficient to reach the appropriate IOP, or
            is not tolerated due to side effects. Furthermore, in many third
            world countries medications are too costly and a one-time
            intervention is necessary. Also, low patient compliance with
            medications is a serious problem in Glaucoma. Thus frequently,
            surgery becomes necessary.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Methods</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            The most common surgical procedure used in open-angle glaucoma is a
            trabeculectomy (also known as filtration surgery). This procedure is
            invasive, requires years of surgical experience and is associated
            with relatively high complication and failure rates as well as
            prolonged visual instability.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Challenges</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            Healing and scarring are the main obstacles for long term IOP
            control after filtration surgery. Antimetabolites such as
            5-Fluorouracil (5-FU) and Mitomycin C (MMC) are frequently used to
            reduce scarring and improve drainage. The use of these substances is
            potentially hazardous and requires high expertise to prevent
            overfiltration and hypotony. Therefore there is a need to widen the
            existing surgical options for Glaucoma.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography>
            The most common surgical procedure used in open-angle glaucoma is a
            trabeculectomy (also known as filtration surgery). This procedure is
            invasive, requires years of surgical experience and is associated
            with relatively high complication and failure rates as well as
            prolonged visual instability.
          </Typography>
          <Box mb={5} />
        </GridItem>
        <GridItem>
          <Typography variant='h2'>Mims® Regulatory statement</Typography>
        </GridItem>
        <GridItem>
          <Typography>
            MIMS® is a registered Trademark with CE Certification. All rights
            reserved Sanoculis LTD. 2020
          </Typography>
          <Box mb={5} />
          <img src='/ce_logo.svg' />
          {/* <Box mb={5} /> */}
        </GridItem>
      </Grid>
    </Fragment>
  );
}
