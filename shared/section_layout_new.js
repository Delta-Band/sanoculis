import React from 'react';
import { Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function SectionLayoutNew({ isMobile, left, right, top, style }) {
  const theme = useTheme();
  return (
    <Grid
      container
      direction='row'
      justify='space-between'
      spacing={0}
      style={{
        maxWidth: 1250,
        margin: '0 auto',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(5),
        ...style
      }}
    >
      {top ? (
        <Grid item xs={12} style={{ paddingBottom: theme.spacing(5) }}>
          {top}
        </Grid>
      ) : null}
      <Grid
        item
        lg={5}
        xs={12}
        style={{
          paddingRight: theme.spacing(isMobile ? 0 : 8),
          paddingBottom: theme.spacing(isMobile ? 8 : 0),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {left}
      </Grid>
      <Grid
        item
        lg={7}
        xs={12}
        style={{
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5)
        }}
      >
        {right}
      </Grid>
    </Grid>
  );
}

export default SectionLayoutNew;
