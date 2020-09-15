import React, { Fragment, useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PLAY_SET from './play-set';
import styles from './styles.scss';
import { GA } from '../../services';
import { footer, device, video } from '../../store';

const Index = () => {
  const dispatch = useDispatch();
  const orientation = useSelector(device.selectors.orientation, shallowEqual);

  const router = useRouter();
  const [loop, _setLoop] = useState();
  const [canPlay, setCanPlay] = useState(false);
  const [status, setStatus] = useState('');

  const vid = useRef();
  const loopRef = React.useRef(loop);

  const setLoop = (data) => {
    loopRef.current = data;
    _setLoop(data);
  };

  const ontimeupdate = (event) => {
    const t = event.currentTarget.currentTime;
    if (t >= loopRef.current.showNextBtn) {
      dispatch(video.actions.storeFinishedChapter(true));
    }
    if (t >= loopRef.current.end) {
      vid.current.currentTime = loopRef.current.start;
    }
  };

  function playStep() {
    const step = PLAY_SET.find((step) => step.name === router.query.step);
    if (step) {
      vid.current.currentTime = step.start;
      setLoop({
        start: step.loopBackTo,
        end: step.end,
        showNextBtn: step.nextChapterAvailableAt
      });
    } else {
      vid.current.currentTime = 0;
      setLoop({
        start: 0,
        end: 3.16,
        showNextBtn: 1.5,
      });
    }
    vid.current.play();
  }

  useEffect(() => {
    dispatch(video.actions.storeCanPlayThrough(false));
    setStatus('Loading');
  }, [orientation]);

  function onCanPlayHandler() {
    setCanPlay(true);
    setStatus('Done');
  }

  function onCanplaythrough() {
    dispatch(video.actions.storeCanPlayThrough(true));
  }

  useEffect(() => {
    if (orientation) {
      vid.current.addEventListener('timeupdate', ontimeupdate, false);
      vid.current.addEventListener('canplay', onCanPlayHandler, false);
      vid.current.addEventListener('canplaythrough', onCanplaythrough, false);
      // TODO: check this event if usefull.
      // vid.current.addEventListener('progress', (e) => {
      //   console.log(`${e.type}: ${vid.current.buffered} bytes transferred\n`);
      // });
      playStep();
    }
  }, [vid.current, orientation]);

  useEffect(() => {
    if (vid.current) playStep();
    dispatch(video.actions.storeFinishedChapter(false));
    GA.logPageView(router.query.step || 'home');
  }, [router.query.step]);

  useEffect(() => {
    if (router.route === '/') {
      dispatch(footer.actions.show(false));
    }
  }, [router.route]);

  return orientation ? (
    <Fragment>
      <video
        muted
        ref={vid}
        className={cx(styles.video, { [styles.hide]: router.route !== '/' })}
        playsInline
        autoPlay
        preload='auto'
        src={
          orientation === 'portrait'
            ? '/videos/portrait.mp4'
            : '/videos/landscape.mp4'
        }
        type='video/mp4'
      >
        Your browser does not support the video tag.
      </video>
      <div
        className={cx(styles.status, {
          [styles.hide]: canPlay
        })}
      >
        <div>{status}</div>
        <div
          className={styles.bar}
          style={{
            transform: 'scaleX(1)',
            animation: 'none'
          }}
        />
      </div>
    </Fragment>
  ) : null;
};

export default Index;
