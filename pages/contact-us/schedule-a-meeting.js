import React, { useEffect } from 'react';
import { InlineWidget } from 'react-calendly';
import { useDispatch } from 'react-redux';
import { useOverflow } from 'use-overflow';
import cx from 'classnames';
import styles from './styles.scss';
import { GA } from '../../services';
import { footer } from '../../store';
import { AnimatePageVerical, Bleed } from '../../components';

const Scheduler = () => {
  const dispatch = useDispatch();
  const verticalRef = React.useRef(null);
  const { refYOverflowing, refYScrollEnd } = useOverflow(verticalRef);

  useEffect(() => {
    GA.logPageView('schedule-a-meeting');
  }, []);

  useEffect(() => {
    dispatch(footer.actions.show(refYScrollEnd));
  }, [refYScrollEnd]);

  useEffect(() => {
    dispatch(footer.actions.show(!refYOverflowing));
  }, [refYOverflowing]);

  return (
    <AnimatePageVerical key='contact-us-schedule' className={styles.page}>
      <Bleed className={cx(styles.scheduler)}>
        <InlineWidget
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '000000',
            textColor: '4d5055'
          }}
          prefill={{
            email: '',
            firstName: '',
            lastName: '',
            name: ''
          }}
          styles={{
            height: '1000px'
          }}
          url='https://calendly.com/nucleai/meeting-request'
          utm={{
            utmSource: 'Website Contact Form'
          }}
          className={styles.caledlyWidget}
        />
      </Bleed>
    </AnimatePageVerical>
  );
};

export default Scheduler;
