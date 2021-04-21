import React, { useRef, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import _throttle from 'lodash/throttle';

const MouseTip = ({ children, tip }) => {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const theme = useTheme();

  function onMouseMove(e) {
    const x = e.x - ref.current.getBoundingClientRect().x;
    const y = e.y - ref.current.getBoundingClientRect().y;
    setMouse({ x, y });
  }

  function showTip() {
    setShow(true);
  }

  function hideTip() {
    setShow(false);
  }

  const throttle = _throttle(onMouseMove, 100);

  useEffect(() => {
    ref.current.addEventListener('mousemove', throttle);
    ref.current.addEventListener('mouseleave', hideTip);
    ref.current.addEventListener('mouseenter', showTip);
    // return function cleanUp() {
    //   ref.current.removeEventListener('mousemove', throttle);
    // };
  }, []);

  useEffect(() => {
    console.log(mouse.x);
  }, [mouse.x]);

  return (
    // You must provide the ref to the element you're tracking the
    // mouse position of
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          background: theme.palette.primary.main,
          color: '#FFF',
          borderRadius: '50%',
          width: '100px',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '-50px',
          marginTop: '-50px',
          boxShadow: theme.shadows[5]
        }}
        animate={{
          x: mouse.x,
          y: mouse.y,
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0
        }}
      >
        <Typography style={{ color: '#FFF' }}>{tip}</Typography>
      </motion.div>
    </div>
  );
};

export default MouseTip;
