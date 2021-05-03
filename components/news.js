import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import cx from 'classnames';
import { motion } from 'framer-motion';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ChevronBackCircle as GoLeftIcon } from '@styled-icons/ionicons-solid/ChevronBackCircle';
import { ChevronForwardCircle as GoRightIcon } from '@styled-icons/ionicons-solid/ChevronForwardCircle';
import { Delta2ColLayout, DeltaCarousel } from '../shared';
import { Box, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  blueInfo: {
    color: theme.palette.primary.main
  },
  whiteText: {
    color: '#FFF'
  },
  art: {
    height: '80vw',
    width: '80vw',
    [theme.breakpoints.up('md')]: {
      height: '40vw',
      width: '40vw'
    },
    [theme.breakpoints.up('md')]: {
      height: '25vw',
      width: '25vw'
    }
  },
  newsLogo: {
    width: '100%',
    maxWidth: 300,
    objectFit: 'contain'
  },
  newsVerticalSpacing: {
    marginBottom: theme.spacing(4)
  },
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
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
  }
}));

export default function News({ art, title, items, artClass }) {
  const theme = useTheme();
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Delta2ColLayout
      paddingBottom={5}
      titleColor='#FFF'
      background={theme.palette.primary.dark}
      art={
        <Box className={cx(artClass, classes.art)}>
          <img
            src='images/gradient_bg.svg'
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
              height: '100%'
            }}
          />
          <img
            src='images/news.png'
            style={{
              position: 'absolute',
              right: '1%',
              top: '1.5%',
              width: '98%',
              height: '98%'
            }}
          />
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
        </Box>
      }
      title={title}
      content={[
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
                className={cx(
                  classes.whiteText,
                  classes.newsVerticalSpacing,
                  classes.ellipsis
                )}
              >
                {item.source}
              </Typography>
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
