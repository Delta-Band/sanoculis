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
    margin: '0 0 20px 0',
    [theme.breakpoints.up('md')]: {
      margin: '0 2.5vw 0 0'
    },
    '& > img': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '100%'
      }
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

export default function News({ art, title, items }) {
  const theme = useTheme();
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Delta2ColLayout
      paddingBottom={5}
      titleColor='#FFF'
      background={theme.palette.primary.dark}
      art={art}
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
