import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography, Button } from '@material-ui/core';
import { ExternalLink as LinkIcon } from '@styled-icons/evil/ExternalLink';
import { Carousel } from '../delta';

const useStyles = makeStyles((theme) => ({
  profilesCarouselRoot: {
    width: '100%',
    overflow: 'hidden',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5)
    }
  },
  btn: {
    width: '100%'
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    width: '100%'
  },
  pic: {
    borderRadius: '100%',
    width: 120,
    height: 120,
    overflow: 'hidden',
    objectFit: 'cover',
    marginBottom: theme.spacing(1)
  },
  name: {
    textAlign: 'center'
  },
  title: {
    fontSize: 11,
    lineHeight: 1.7,
    textAlign: 'center',
    marginTop: theme.spacing(1)
  },
  linkIcon: {
    position: 'absolute',
    top: 124,
    right: 6,
    transform: 'translate(0, -100%)'
  }
}));

function ProfilesCarousel({ profiles }) {
  const classes = useStyles();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const visibleItems = upLg ? 5 : upMd ? 4.5 : upSm ? 3.5 : 2.4;

  return (
    <Carousel
      className={classes.profilesCarouselRoot}
      visibleItems={visibleItems}
      spacing={0}
    >
      {profiles.map((item) => (
        <Button
          key={item.id}
          href={item.linkedIn}
          target='_blank'
          rel='noreferrer'
          className={classes.btn}
        >
          <div className={classes.profileCard}>
            <img src={item.pic} className={classes.pic} />
            <Typography className={classes.name}>{item.name}</Typography>
            <Typography className={classes.title}>{item.title}</Typography>
            <LinkIcon size={24} className={classes.linkIcon} />
          </div>
        </Button>
      ))}
    </Carousel>
  );
}

export default ProfilesCarousel;
