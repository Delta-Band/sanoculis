import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useOverflow } from 'use-overflow';
import styles from './styles.scss';
import { footer, cms, landscapeBlocker } from '../../store';
import { GA } from '../../services';
import {
  ContactrForm,
  AnimatePageVerical,
  Bleed
} from '../../components';

const WriteToUsPage = () => {
  const dispatch = useDispatch();
  const contactCMS = useSelector(cms.selectors.contact);
  const verticalRef = React.useRef(null);
  const { refYOverflowing, refYScrollEnd } = useOverflow(verticalRef);

  dispatch(landscapeBlocker.actions.enable(false));

  useEffect(() => {
    GA.logPageView('write-to-us');
    return () => {
      dispatch(landscapeBlocker.actions.enable(true));
    };
  }, []);

  useEffect(() => {
    dispatch(footer.actions.show(refYScrollEnd));
  }, [refYScrollEnd]);

  useEffect(() => {
    dispatch(footer.actions.show(!refYOverflowing));
  }, [refYOverflowing]);

  return (
    <AnimatePageVerical className={styles.page} setRef={verticalRef}>
      <Bleed>
        <div className={styles.spacer} />
        <h2>{contactCMS.writeToUsHeader}</h2>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ContactrForm actionLabel='Send' />
          </Grid>
        </Grid>
      </Bleed>
    </AnimatePageVerical>
  );
};

export default WriteToUsPage;
