import React from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    width: '2vw',
    height: '1.5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  point: {
    background: theme.palette.primary.main,
    width: '0.5vw',
    height: '0.5vw',
    borderRadius: '0.1vw',
    // border: '0.5vw solid green',
    transition: `1s ${theme.easing}`,
    transformOrigin: 'center'
  },
  pointer: {
    cursor: theme.cursorPointer
  },
  envelope: {
    listStyle: 'none',
    position: 'fixed',
    left: `${theme.pageGutter / 2}vw`,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0
  },
  current: {
    transform: 'scale(2)'
  }
}));

const SectionIndicator = ({
  count = 1,
  current = 0,
  refs = [],
  scrollContainer
}) => {
  const classes = useStyles();

  function scrollToRef(i) {
    console.log('debug');
    if (refs[i]) {
      const rect = refs[i].current.getBoundingClientRect();
      scrollContainer.current.scrollTo(
        0,
        refs[i].current.offsetTop - (window.innerHeight - rect.height) / 2
      );
    }
  }

  function renderItems() {
    console.log('renderItems');
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(
        <li
          className={cx(classes.item, {
            [classes.pointer]: refs[i]
          })}
          key={`section-indicator-item-${i}`}
          onClick={() => scrollToRef(i)}
        >
          <div
            className={cx(classes.point, { [classes.current]: current === i })}
          />
        </li>
      );
    }
    return items;
  }
  return <ul className={classes.envelope}>{renderItems()}</ul>;
};

export default SectionIndicator;
