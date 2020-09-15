import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Link } from '@styled-icons/heroicons-outline/Link';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useSelector, useDispatch } from 'react-redux';
import { useOverflow } from 'use-overflow';
import Grid from '@material-ui/core/Grid';
import styles from './styles.scss';
import { GA } from '../../services';
import { validateLink } from '../../utils';
import { device, footer, contact, cms, landscapeBlocker } from '../../store';
import { ContactrForm, AnimatePageVerical, Bleed } from '../../components';

const TryItPage = () => {
  const isMobile = useSelector(device.selectors.type) === 'mobile';
  const shareLink = useSelector(contact.selectors.shareLink);
  const [shareLinkIsValid, setShareLinkIsValid] = useState(false);
  const contactCMS = useSelector(cms.selectors.contact);
  const dispatch = useDispatch();
  const verticalRef = React.useRef(null);
  const { refYOverflowing, refYScrollEnd } = useOverflow(verticalRef);

  dispatch(landscapeBlocker.actions.enable(false));

  useEffect(() => {
    setShareLinkIsValid(validateLink(shareLink));
  }, [shareLink]);

  useEffect(() => {
    dispatch(footer.actions.show(refYScrollEnd));
  }, [refYScrollEnd]);

  useEffect(() => {
    dispatch(footer.actions.show(!refYOverflowing));
  }, [refYOverflowing]);

  useEffect(() => {
    GA.logPageView('try-it');
    return () => {
      dispatch(landscapeBlocker.actions.enable(true));
    };
  }, []);

  return (
    <AnimatePageVerical className={styles.page} setRef={verticalRef}>
      <Bleed>
        <div className={styles.spacer}></div>
        <h2>{contactCMS.shareSlidesHeader}</h2>
        <Grid container spacing={isMobile ? 3 : 10}>
          <Grid item xs={12} lg={6}>
            <ShareLinkField />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ContactrForm disabled={!shareLinkIsValid} actionLabel='Share' />
          </Grid>
        </Grid>
      </Bleed>
    </AnimatePageVerical>
  );
};

const ShareLinkField = ({ className }) => {
  const isMobile = useSelector(device.selectors.type) === 'mobile';
  const dispatch = useDispatch();
  const contactCMS = useSelector(cms.selectors.contact);
  const value = useSelector(contact.selectors.shareLink);
  const [isValid, setisValid] = useState(false);
  const [bypaseValidation, setbypaseValidation] = useState(true);

  useEffect(() => {
    setisValid(validateLink(value));
  }, [value]);

  return (
    <TextField
      className={cx(styles.textField, styles.shareLink, className)}
      id='share-link'
      placeholder={contactCMS.shareSlidesTip}
      fullWidth
      variant='outlined'
      multiline
      rows={1}
      rowsMax={3}
      value={value}
      error={!isValid && !bypaseValidation}
      helperText={
        !bypaseValidation && !isValid ? 'Please enter a valid URL' : undefined
      }
      onBlur={() => {
        setbypaseValidation(false);
      }}
      onChange={(e) => {
        dispatch(contact.actions.storeSharedLink(e.target.value));
      }}
      InputProps={
        isMobile
          ? {
              startAdornment: (
                <InputAdornment position='start'>
                  <Link size={30} className={styles.folderIcon} />
                </InputAdornment>
              )
            }
          : null
      }
    />
  );
};

export default TryItPage;
