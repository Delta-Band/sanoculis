import React, { useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import styles from './styles.scss';
import { useSectionIndicator } from '../../hooks';

export default function Section({
  type,
  art,
  header,
  body,
  footer,
  superSizedHeader,
  pageRef,
  onTarget,
  sectionRef
}) {
  const _onTarget = useSectionIndicator(sectionRef, pageRef);
  // const [onTarget, setOnTarget] = useState(false);

  // function handleScroll() {
  //   const rect = sectionRef.current.getBoundingClientRect();
  //   const location = rect.top + rect.height / 2;
  //   console.log(location);
  //   console.log(window.innerHeight / 2);
  //   setOnTarget(location <= window.innerHeight / 2);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleScroll();
  //   }, 1000);
  //   pageRef.current.addEventListener('scroll', handleScroll);
  //   return () => {
  //     pageRef.current.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log(`onTarget: ${onTarget}`);
  // }, [onTarget]);

  useEffect(() => {
    onTarget(_onTarget);
  }, [_onTarget]);

  function ArtNContent() {
    return (
      <section ref={sectionRef}>
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
                <Grid
                  className={cx(styles.header, {
                    [styles.superSize]: superSizedHeader
                  })}
                  item
                >
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
      </section>
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
