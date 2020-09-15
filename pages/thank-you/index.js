import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { GA, emailJS } from '../../services';
import { contact } from '../../store';
import styles from './styles.scss';

const ThankYou = () => {
  const router = useRouter();
  const contactInfo = useSelector(contact.selectors.info);
  const shareLink = useSelector(contact.selectors.shareLink);
  const [working, setWorking] = useState(true);
  const [error, setError] = useState(false);

  async function send() {
    try {
      await emailJS.send(Object.assign(contactInfo, { shareLink }));
      setWorking(false);
      GA.logEvent('contact-form', 'sent-successful');
    } catch (err) {
      setWorking(false);
      setError(true);
      GA.logEvent('contact-form', 'sent-failed');
    }
  }

  useEffect(() => {
    GA.logPageView('thank-you');
    if (router.query.scheduler === 'true') {
      setWorking(false);
    } else if (!contactInfo) {
      router.push({
        pathname: '/',
        options: {
          shallow: true,
        },
      });
    } else {
      send();
    }
  }, []);

  return (
    <motion.div
      className={styles.thankYouWrapper}
      initial='exit'
      animate='enter'
      exit='exit'
      variants={{
        exit: {
          opacity: 0,
          x: 100,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        },
        enter: {
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        }
      }}
    >
      <div className={styles.activityIndicator}>
        <div
          className={styles.txtAnimationContainer}
          style={{
            transform: `translateX(${working ? 0 : -50}%)`
          }}
        >
          <div className={styles.txt}>Sending...</div>
          <div className={styles.txt}>
            {error ? (
              'Oops, somthing went wrong.'
            ) : (
              <Button
                color='primary'
                className={styles.done}
                variant='outlined'
                onClick={() => {
                  router.push('/', undefined, { shallow: true });
                }}
              >
                <div className={styles.btnTxt}>Got it, Thanks!</div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThankYou;
