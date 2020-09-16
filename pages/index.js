import React from 'react';
import Box from '@material-ui/core/Box';
import { AnimatePageVerical, Bleed } from '../components';

export default function Home() {
  return (
    <AnimatePageVerical>
      <Bleed>
        <Box display='flex' p={1} bgcolor='background.paper'>
          Home Page
        </Box>
      </Bleed>
    </AnimatePageVerical>
  );
}
