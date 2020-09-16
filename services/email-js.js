import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'sanoculis_website',
  USER_ID: 'user_8ymlAbJeHeX4mjCkAkI02',
  TEMPLATES: {
    CONTACT: 'contact_form',
    CONTACT_WITH_SHARED_LINK: 'contact_form_with_shared_link'
  }
};

const send = ({ name, organization, role, email, letter, shareLink }) => {
  return sendEmail(
    CONFIG.SERVICE_ID,
    CONFIG.TEMPLATES[shareLink.length ? 'CONTACT_WITH_SHARED_LINK' : 'CONTACT'],
    {
      name,
      organization,
      role,
      email,
      letter,
      shareLink
    },
    CONFIG.USER_ID
  );
};

export default {
  send
};
