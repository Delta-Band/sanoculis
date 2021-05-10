import React from 'react';
import { Grid, Box } from '@material-ui/core';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  layoutWrapper: {
    marginTop: '-1px',
    position: 'relative',
    flexShrink: 0,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerWrapper: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: 1600
  },
  contentWrapper: {
    width: '80vw',
    margin: '0 auto',
    flexShrink: 0,
    [theme.breakpoints.up('md')]: {
      width: '85%',
      maxWidth: 600,
      // maxWidth: '500px',
      margin: 0
    }
  },
  artWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function SectionLayout({
  content,
  art,
  extendTopWith,
  extendBottomWith,
  background,
  paddingTop = 0,
  paddingBottom = 0,
  className
}) {
  // const headerTxt = 'A Simple & Stent-less Treatment Innovation';
  // const bodyTxt =
  //   'MIMS is a rapid & minimal procedure at the forefront of Interventional Glaucoma treatments. Fewer complications and less reliance on medications allows for effective IOP management.';
  const theme = useTheme();
  const upSM = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();
  return (
    <Box
      className={classes.layoutWrapper}
      style={{ background: background || 'transparent' }}
      pt={10 + paddingTop}
      pb={10 + paddingBottom}
    >
      {extendTopWith}
      <Grid
        container
        alignItems='center'
        direction={upSM ? 'row' : 'column'}
        className={cx(classes.innerWrapper, className)}
      >
        <Grid item xs={12} md={6} className={classes.artWrapper}>
          {art}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.contentWrapper}>
            {content.map((itm) => (
              <Box mt={5} key={`item-${itm.key}`}>
                {itm}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      {extendBottomWith}
    </Box>
  );
}

SectionLayout.proptypes = {
  art: PropTypes.element,
  content: PropTypes.arrayOf(PropTypes.element),
  extendTopWith: PropTypes.element,
  extendBottomWith: PropTypes.element,
  background: PropTypes.string,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  className: PropTypes.string
};

export default SectionLayout;
