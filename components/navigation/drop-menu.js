import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import { Play } from '@styled-icons/foundation/Play';
import { Menu as MenuIcon } from '@styled-icons/entypo/Menu';
import { Microscope as TryIt } from '@styled-icons/remix-line/Microscope';
import { CalendarEvent as Calendar } from '@styled-icons/boxicons-regular/CalendarEvent';
import { MailSend as WriteToUs } from '@styled-icons/boxicons-regular/MailSend';
import { useRouter } from 'next/router';
// import cx from 'classnames';
import PLAY_SET from '../video/play-set';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import styles from './styles.scss';
import { cms } from '../../store';

const DropMenu = () => {
  const router = useRouter();
  const navigationCMS = useSelector(cms.selectors.navigation);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button disableRipple className={styles.contactUs} onClick={toggleMenu}>
        <MenuIcon size={32} />
        {/* <div className={styles.btnTxt}>Back</div> */}
      </Button>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          selected={false}
          onClick={() => {
            handleClose();
            router.push('/', undefined, { shallow: true });
          }}
        >
          <Box className={styles.menuItem} alignItems='center' display='flex'>
            <Play size={22} />
            <div className={styles.menuSpacer} />
            Start
          </Box>
        </MenuItem>
        {PLAY_SET.map((chapter) => (
          <MenuItem
            key={chapter.name}
            selected={false}
            onClick={() => {
              handleClose();
              router.push(`/?step=${chapter.name}`, undefined, {
                shallow: true
              });
            }}
          >
            <Box className={styles.menuItem} alignItems='center' display='flex'>
              <Play size={22} />
              <div className={styles.menuSpacer} />
              {navigationCMS[chapter.labelReactorKey]}
            </Box>
          </MenuItem>
        ))}
        <div className={styles.menuItemDivider} />
        <MenuItem
          selected={false}
          onClick={() => {
            handleClose();
            router.push('/contact-us/try-it', undefined, {
              shallow: true
            });
          }}
        >
          <Box className={styles.menuItem} alignItems='center' display='flex'>
            <TryIt size={22} />
            <div className={styles.menuSpacer} />
            {navigationCMS.shareSlidesLabel}
          </Box>
        </MenuItem>
        <MenuItem
          selected={false}
          onClick={() => {
            handleClose();
            router.push('/contact-us/schedule-a-meeting', undefined, {
              shallow: true
            });
          }}
        >
          <Box className={styles.menuItem} alignItems='center' display='flex'>
            <Calendar size={22} />
            <div className={styles.menuSpacer} />
            {navigationCMS.scheduleAmeetingLabel}
          </Box>
        </MenuItem>
        <MenuItem
          selected={false}
          onClick={() => {
            handleClose();
            router.push('/contact-us/write-to-us', undefined, {
              shallow: true
            });
          }}
        >
          <Box className={styles.menuItem} alignItems='center' display='flex'>
            <WriteToUs size={22} />
            <div className={styles.menuSpacer} />
            {navigationCMS.writeToUsLabel}
          </Box>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default DropMenu;
