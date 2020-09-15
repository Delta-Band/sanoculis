import React, { Fragment } from 'react';
import cx from 'classnames';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './styles.scss';

const Bleed = ({ children, className }) => {
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Fragment>
      <div
        className={cx(styles.bleed, className, {
          [styles.lg]: isLG,
          [styles.xl]: isXL
        })}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default Bleed;
