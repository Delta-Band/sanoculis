import React, { useEffect, useState, useRef, Fragment } from 'react';
import { debounce } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { useViewportScroll, motion, useTransform } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  root: {
    // overflow: 'hidden',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  rail: { display: 'inline-flex', transition: '0.5s ease-out' }
}));

function ParallaxCarousel({ children, windowRange = [0.2, 0.6], className }) {
  // Hooks
  const classes = useStyles();
  const containerRef = useRef();
  const contentRef = useRef();
  const { scrollY } = useViewportScroll();
  const [scrollRange, setScrollRange] = useState([0, 0]);
  const [overflow, setOverflow] = useState(0);
  const x = useTransform(scrollY, scrollRange, [0, -overflow]);

  // Methods
  function init() {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const docRelativeYlocation =
      containerRect.top + window.pageYOffset - window.innerHeight;
    setOverflow(Math.max(contentRect.width - containerRect.width, 0));
    setScrollRange([
      docRelativeYlocation +
        containerRect.height +
        window.innerHeight * windowRange[0],
      docRelativeYlocation +
        containerRect.height +
        window.innerHeight * windowRange[1]
    ]);
  }

  const initDB = debounce(init, 250);

  // Effects
  useEffect(() => {
    setTimeout(init, 1000);
    window.addEventListener('resize', initDB);
    return () => {
      window.removeEventListener('resize', initDB);
    };
  }, []);

  // Render
  return (
    <div ref={containerRef} className={cx(classes.root, className)}>
      <motion.div
        ref={contentRef}
        className={classes.rail}
        style={{
          x: x
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function BuildGroup({ items, windowRange, className, itemBuilder }) {
  return (
    <ParallaxCarousel windowRange={windowRange} className={className}>
      {items.map(itemBuilder)}
    </ParallaxCarousel>
  );
}

export function ParallaxCarouselMultiRow({
  list,
  itemsInRow,
  itemBuilder,
  windowRange,
  className
}) {
  const groups = [];
  const groupCount = Math.ceil(list.length / itemsInRow);
  for (let i = 0; i < groupCount; i++) {
    groups.push([i * itemsInRow, i * itemsInRow + itemsInRow]);
  }

  return (
    <Fragment>
      {groups.map((group, i) => (
        <BuildGroup
          key={i}
          items={list.slice(group[0], group[1])}
          itemBuilder={itemBuilder}
          windowRange={windowRange}
          className={className}
        />
      ))}
    </Fragment>
  );
}

export default ParallaxCarouselMultiRow;
