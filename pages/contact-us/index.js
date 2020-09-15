import React, { useEffect, Fragment } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import { useOverflow } from 'use-overflow';
import { Microscope as TryIt } from '@styled-icons/remix-line/Microscope';
import { CalendarEvent as Calendar } from '@styled-icons/boxicons-regular/CalendarEvent';
import { MailSend as WriteToUs } from '@styled-icons/boxicons-regular/MailSend';
import styles from './styles.scss';
import { GA } from '../../services';
import { footer, cms } from '../../store';

const ContactUs = () => {
  const dispatch = useDispatch();
  const contactCMS = useSelector(cms.selectors.contact);
  const navigationCMS = useSelector(cms.selectors.navigation);
  const theme = useTheme();
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const verticalRef = React.useRef(null);
  const { refYOverflowing, refYScrollEnd } = useOverflow(verticalRef);

  useEffect(() => {
    GA.logPageView('contact-us');
  }, []);

  useEffect(() => {
    dispatch(footer.actions.show(refYScrollEnd));
  }, [refYScrollEnd]);

  useEffect(() => {
    dispatch(footer.actions.show(!refYOverflowing));
  }, [refYOverflowing]);

  return (
    <motion.div
      className={styles.page}
      ref={verticalRef}
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
      <h1>{contactCMS.mainPageHeader}</h1>
      <Grid container spacing={5}>
        {isLG && (
          <Fragment>
            <Grid item lg={6}>
              <h2>{contactCMS.mainPageParagraph}</h2>
            </Grid>
            <Grid item lg={1} />
          </Fragment>
        )}
        <Grid item xs={12} lg={5}>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            flexGrow={1}
            className={styles.actionBox}
          >
            <ActionBtn
              pathname='/contact-us/try-it'
              icon={<TryIt size={32} className={styles.ctaIcon} />}
              label={navigationCMS.shareSlidesLabel}
            />
            <ActionBtn
              pathname='/contact-us/schedule-a-meeting'
              icon={<Calendar size={32} className={styles.ctaIcon} />}
              label={navigationCMS.scheduleAmeetingLabel}
            />
            <ActionBtn
              pathname='/contact-us/write-to-us'
              icon={<WriteToUs size={32} className={styles.ctaIcon} />}
              label={navigationCMS.writeToUsLabel}
            />
          </Box>
        </Grid>
        <div className={styles.spacer}></div>
      </Grid>
    </motion.div>
  );
};

const ActionBtn = ({ pathname, icon, label }) => {
  const router = useRouter();

  return (
    <Button
      className={styles.cta}
      disableElevation
      variant='contained'
      onClick={() => {
        router.push(pathname, undefined, { shallow: true });
      }}
    >
      <Box
        display='flex'
        flexGrow={1}
        flexWrap='nowrap'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box display='flex' alignItems='center'>
          {icon}
          <Box m={2}>{label}</Box>
        </Box>
        <ChevronRight size={36} />
      </Box>
    </Button>
  );
};

export default ContactUs;
