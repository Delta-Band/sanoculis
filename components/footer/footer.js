import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styles from './styles.scss';
import { footer, cms } from '../../store';

const Footer = () => {
  const show = useSelector(footer.selectors.show);
  const footerCMS = useSelector(cms.selectors.footer);
  return (
    <motion.div
      className={styles.footer}
      initial='hidden'
      animate={show ? 'show' : 'hidden'}
      variants={{
        hidden: {
          y: 100,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        },
        show: {
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 40
          }
        }
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} lg={8}>
          <Box
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            p={0}
            className={styles.boxLeft}
          >
            <span>{footerCMS.address}</span>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            display='flex'
            flexWrap='nowrap'
            justifyContent='flex-start'
            alignItems='center'
            p={0}
            className={styles.boxRight}
          >
            <a
              href={`mailto:${footerCMS.email}`}
              target='_blank'
              rel='noreferrer'
            >
              {footerCMS.email}
            </a>
            <span className={styles.divider}>|</span>
            <a
              href={footerCMS.linkedInURL}
              target='_blank'
              rel='noreferrer'
            >
              LinkedIn
            </a>
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Footer;
