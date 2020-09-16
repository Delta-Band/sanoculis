import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';

export default function Section({ type, art, header, body, footer }) {
  function ArtNContent() {
    return (
      <Grid
        className={styles.section}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item xs={6} className={styles.art}>
          {art}
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='flex-start'
            className={styles.content}
          >
            <Grid item className={styles.top}>
              <Grid className={styles.header} item>
                {header}
              </Grid>
              <Grid className={styles.body} item>
                {body}
              </Grid>
            </Grid>
            <Grid item className={styles.bottom}>
              <Grid className={styles.footer} item>
                {footer}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function getTemplateByType() {
    switch (type) {
      case 'art-content':
        return <ArtNContent />;
      default:
        return null;
    }
  }

  return getTemplateByType();
}
