import React, { Fragment } from 'react';
import { Box, Typography, Link } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import SectionLayoutNew from './section_layout_new';
import ContactForm from './contact_form';

function Footer({ isMobile }) {
  const theme = useTheme();
  return (
    <SectionLayoutNew
      isMobile={isMobile}
      left={<ContactForm isMobile={isMobile} />}
      right={
        <Fragment>
          <Link style={{ color: 'inherit' }}>
            <Typography style={{ marginBottom: theme.spacing(1) }}>
              Office@sanoculis.com
            </Typography>
          </Link>
          <Link style={{ color: 'inherit' }}>
            <Typography style={{ marginBottom: theme.spacing(1) }}>
              +972 3 555 4666
            </Typography>
          </Link>
          <Link
            style={{ color: 'inherit' }}
            href='https://www.google.com/maps/place/Menachem+Begin+154,+Bnei+Brak/@32.0930882,34.8300778,17z/data=!3m1!4b1!4m5!3m4!1s0x151d4a2708204011:0xa2a04d27c43b7804!8m2!3d32.0930882!4d34.8322718'
          >
            <Typography style={{ marginBottom: theme.spacing(1) }}>
              Begin st.154, Tel Aviv, Israel
            </Typography>
          </Link>
          <Box mb={6} />
          <Typography>
            MIMS® is a registered Trademark All rights reserved Sanoculis LTD.
            2020
          </Typography>
        </Fragment>
      }
      top={<Typography variant='h2'>Contact Us</Typography>}
    />
  );
}

export default Footer;
