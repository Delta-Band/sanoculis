import React, { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useVisible } from 'react-hooks-visible';
import { ArrowLeft as ChevronLeft } from '@styled-icons/bootstrap/ArrowLeft';
import { ArrowRight as ChevronRight } from '@styled-icons/bootstrap/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden'
    }
  },
  slider: {
    width: '100%',
    display: 'inline-flex'
  },
  item: {
    flexShrink: 0
  },
  disableChildren: {
    '& > * > *': {
      pointerEvents: 'none'
    }
  },
  carouselControls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  btn: {
    cursor: 'pointer'
  }
}));

/** CONSTS */
const MOTION_VARIANTS = {
  btn: {
    enable: {
      opacity: 1
    },
    disable: {
      opacity: 0
    }
  }
};

function CarouselItem({ children, itemWidth, spacing }) {
  const [targetRef, visible] = useVisible();
  const classes = useStyles();

  return (
    <motion.div
      ref={targetRef}
      className={cx(classes.item, { [classes.disableChildren]: visible < 0.9 })}
      animate={{
        opacity: visible > 0.9 ? 1 : 0.4,
        filter: visible > 0.9 ? 'grayscale(0)' : 'grayscale(1)'
      }}
      style={{
        width: itemWidth - spacing,
        marginRight: spacing
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Carousel({
  children,
  className,
  leftControll = null,
  rightControll = null,
  visibleItems = 1.5,
  spacing = 16,
  debug = false
}) {
  const classes = useStyles();
  const myRef = useRef();
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const [index, setIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const clientXRef = useRef(0);
  const clientXMoveRef = useRef(0);
  const reachedTheEnd = useRef(false);
  const docBody = useRef();
  const visItems = useRef(visibleItems);
  reachedTheEnd.current = index >= children.length - visItems.current;

  const onSwipedLeft = () => {
    if (reachedTheEnd.current) return;
    setIndex((index) =>
      Math.min(children.length - 1, Math.floor(index + visItems.current))
    );
  };

  const onSwipedRight = () => {
    setIndex((index) => Math.max(0, Math.ceil(index - visItems.current)));
  };

  function init() {
    if (!myRef.current) return;
    const containerRect = myRef.current.getBoundingClientRect();
    setContainerWidth(containerRect.width);
    // if (debug) {
    //   console.log('containerRect.width: ', containerRect.width);
    //   console.log('visibleItems: ', visibleItems);
    //   console.log(
    //     'itemWidth: ',
    //     Math.floor(containerRect.width / visibleItems)
    //   );
    // }
    // setItemWidth(Math.floor(containerRect.width / visibleItems));
  }

  const initDebounced = debounce(init, 250);

  function preventScroll(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  function onTouchStart(e) {
    clientXRef.current = e.touches[0].clientX;
    clientXMoveRef.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    docBody.current.removeEventListener('touchmove', preventScroll, true);
    if (clientXMoveRef.current - clientXRef.current < -30) {
      onSwipedLeft();
    } else if (clientXMoveRef.current - clientXRef.current > 30) {
      onSwipedRight();
    }
    clientXRef.current = clientXMoveRef.current;
  }

  function onTouchMove(e) {
    clientXMoveRef.current = e.touches[0].clientX;
    if (Math.abs(clientXMoveRef.current - clientXRef.current) > 10) {
      docBody.current.addEventListener('touchmove', preventScroll, true);
    }
  }

  /** EFFECTS */

  useEffect(() => {
    setItemWidth(Math.floor(containerWidth / visItems.current));
  }, [containerWidth]);

  useEffect(() => {
    if (debug) {
      console.log('itemWidth: ', itemWidth);
    }
    setXPos(-index * itemWidth + (index === 0 ? 0 : spacing * 2));
  }, [index, itemWidth]);

  useEffect(() => {
    setTimeout(init, 1000);
    window.addEventListener('resize', initDebounced);
    docBody.current = document.getElementById('__next');
    myRef.current.addEventListener('touchstart', onTouchStart, true);
    myRef.current.addEventListener('touchmove', onTouchMove, true);
    myRef.current.addEventListener('touchend', onTouchEnd, true);
    return () => {
      window.removeEventListener('resize', initDebounced);
      if (myRef.current) {
        myRef.current.removeEventListener('touchstart', onTouchStart, true);
      }
      if (docBody.current) {
        docBody.current.removeEventListener('touchend', onTouchEnd, true);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(init, 1000);
    visItems.current = visibleItems;
  }, [visibleItems]);

  return (
    <div className={cx(classes.root, className)} ref={myRef}>
      <motion.div
        className={classes.slider}
        animate={{ x: xPos }}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.25 * visItems.current
        }}
      >
        {children.map((child, i) => (
          <CarouselItem key={i} spacing={spacing} itemWidth={itemWidth}>
            {child}
          </CarouselItem>
        ))}
      </motion.div>
      {upMd && (
        <div className={classes.carouselControls}>
          <div>
            <motion.div
              variants={MOTION_VARIANTS.btn}
              className={classes.btn}
              onClick={onSwipedRight}
              initial='disable'
              whileHover={{
                scale: 1.3
              }}
              animate={index === 0 ? 'disable' : 'enable'}
              style={{
                transformOrigin: 'center left',
                pointerEvents: index === 0 ? 'none' : 'all'
              }}
            >
              {leftControll || <ChevronLeft size={32} />}
            </motion.div>
          </div>
          <div>
            <motion.div
              variants={MOTION_VARIANTS.btn}
              className={classes.btn}
              onClick={onSwipedLeft}
              initial='disable'
              whileHover={{
                scale: 1.3
              }}
              animate={reachedTheEnd.current ? 'disable' : 'enable'}
              style={{
                transformOrigin: 'center right',
                pointerEvents:
                  index >= children.length - visItems.current ? 'none' : 'all'
              }}
            >
              {rightControll || <ChevronRight size={32} />}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
