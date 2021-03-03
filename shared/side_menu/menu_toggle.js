import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Menu } from '@styled-icons/feather/Menu';

function MenuToggle({ toggle }) {
  return (
    <IconButton
      onClick={toggle}
      style={{
        transform: 'translateX(25%)'
      }}
    >
      <Menu size={28} />
    </IconButton>
  );
}

export default MenuToggle;
