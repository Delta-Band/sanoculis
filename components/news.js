import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import cx from 'classnames';
import { motion } from 'framer-motion';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChevronBackCircle as GoLeftIcon } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { ChevronForwardCircle as GoRightIcon } from '@styled-icons/ionicons-solid/ChevronForwardCircle';
import { DeltaCarousel } from '../shared';
import { SectionLayout } from '../components/delta';
import { Box, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  blueInfo: {
    color: theme.palette.primary.main
  },
  whiteText: {
    color: '#FFF'
  },
  art: {
    width: '80vw',
    height: '80vw',
    position: 'relative',
    marginBottom: theme.spacing(5),
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      height: '50vw'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw',
      height: '40vw',
      marginBottom: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      width: '30vw',
      height: '30vw',
      maxWidth: 600,
      maxHeight: 600,
      marginRight: theme.spacing(10)
    }
  },
  gradientCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  image: {
    position: 'absolute',
    right: '0.5%',
    top: '0.5%',
    width: '99%',
    height: '99%'
  },
  newsLogo: {
    width: '100%',
    maxWidth: 300,
    objectFit: 'contain'
  },
  newsVerticalSpacing: {
    marginBottom: theme.spacing(4)
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  carouselNavBtn: {
    width: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    [theme.breakpoints.up('sm')]: {
      width: 125
    }
  },
  readMore: {
    width: 140
  }
}));

export default function News({ art, title, items }) {
  const theme = useTheme();
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <SectionLayout
      paddingBottom={7}
      titleColor='#FFF'
      background={theme.palette.primary.dark}
      art={
        <div className={classes.art}>
          <img
            src='images/gradient_bg.svg'
            className={classes.gradientCircle}
          />
          <img src='images/news.png' className={classes.image} />
          <lottie-interactive
            path='lottie/5.json'
            loop
            interaction='play-on-show'
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0
            }}
          />
        </div>
      }
      title={title}
      content={[
        <Typography key={0} variant='h2' className={classes.whiteText}>
          {title}
        </Typography>,
        <DeltaCarousel
          key={1}
          items={items}
          focus={index}
          itemBuilder={(item, i, index) => (
            <Box display='flex' flexDirection='column'>
              <Typography
                className={cx(classes.whiteText, classes.newsVerticalSpacing)}
              >
                <Moment format='MMM D, YYYY'>{item.date}</Moment>
              </Typography>
              <img
                src={item.logo}
                className={cx(classes.newsLogo, classes.newsVerticalSpacing)}
              />
              <Typography
                variant='h3'
                className={cx(
                  classes.whiteText,
                  classes.newsVerticalSpacing,
                  classes.lineClamp
                )}
              >
                &#34;{item.headline}&#34;
              </Typography>
              <Button
                href={item.link}
                target='_blank'
                rel='noreferrer'
                variant='outlined'
                color='secondary'
                className={classes.readMore}
              >
                Read More
              </Button>
            </Box>
          )}
        />,
        <Grid
          key={2}
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            <motion.div
              animate={{
                x: index === 0 ? '50%' : 0,
                opacity: index === 0 ? 0 : 1
              }}
            >
              <Button
                className={classes.carouselNavBtn}
                onClick={function () {
                  setIndex(Math.max(index - 1, 0));
                }}
              >
                <GoLeftIcon size={upSM ? 40 : 26} />
                Older
              </Button>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              animate={{
                x: index === items.length - 1 ? '-50%' : 0,
                opacity: index === items.length - 1 ? 0 : 1
              }}
            >
              <Button
                className={classes.carouselNavBtn}
                onClick={function () {
                  setIndex(Math.min(index + 1, items.length - 1));
                }}
              >
                NEWER
                <GoRightIcon size={upSM ? 40 : 26} />
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      ]}
    />
  );
}
